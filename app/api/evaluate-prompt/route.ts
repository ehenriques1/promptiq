import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import crypto from "crypto"

// In-memory store for usage tracking (in production, use a database)
const usageStore = new Map<string, { count: number; lastUsed: string }>()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  const cfConnectingIP = request.headers.get('cf-connecting-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  if (realIP) {
    return realIP
  }
  if (cfConnectingIP) {
    return cfConnectingIP
  }
  
  return 'unknown'
}

export async function POST(req: NextRequest) {
  try {
    const { prompt: promptRaw, last_hash, last_ts, meta, timestamp } = await req.json();
    const prompt = (promptRaw || "").trim();
    const hash = crypto.createHash('sha1').update(prompt).digest('hex').slice(0, 10);
    const now = Date.now();
    let lastTsNum = last_ts ? Date.parse(last_ts) : null;

    // Shallow-quality check with specific feedback
    if (!prompt) {
      return NextResponse.json({
        error: "InvalidPrompt",
        message: "Prompt is empty. Please enter a prompt for evaluation."
      }, { status: 200 });
    }
    if (prompt.length < 40) {
      return NextResponse.json({
        error: "InvalidPrompt",
        message: "Prompt is too short. Please enter at least 40 characters."
      }, { status: 200 });
    }
    if (prompt.split(/\s+/).length < 6) {
      return NextResponse.json({
        error: "InvalidPrompt",
        message: "Prompt must contain at least 6 words."
      }, { status: 200 });
    }
    if (!/you are|respond|return|step|task|format|explain|analyze|summarize/i.test(prompt)) {
      return NextResponse.json({
        error: "InvalidPrompt",
        message: "Prompt must include an instruction phrase such as 'you are', 'respond', 'return', 'step', 'task', 'format', 'explain', 'analyze', or 'summarize'."
      }, { status: 200 });
    }

    // Duplicate guard
    if (last_hash && lastTsNum && last_hash === hash && (now - lastTsNum < 60 * 60 * 1000)) {
      return NextResponse.json({
        error: "DuplicatePrompt",
        message: "This prompt was already evaluated recently. Please refine it before requesting another evaluation."
      }, { status: 200 });
    }

    // Build system prompt
    const systemPrompt = `You are **Kulkan PromptIQ Evaluator**, a senior prompt-engineering analyst.

################################################################
### 0 · PROMPT & DUPLICATE GUARD  ##############################
################################################################
Definitions  
• **P**  = \`prompt_to_evaluate\` (trimmed)  
• **K**  = SHA-1 hash of P (first 10 chars)  
• **TS** = \`timestamp\` ISO string if supplied (optional)

1. Shallow-quality check – if ANY are true  
   · P.length < 40 chars  
   · word count < 6  
   · P !~ /you are|respond|return|step|task|format/i  
   ➜ Respond exactly:  
   \`\`\`json
   { "error": "InvalidPrompt",
     "message": "Input is not a full instruction-style prompt. Submit a longer prompt for evaluation." }
   \`\`\`
	2.	Duplicate guard – if caller sends last_hash + last_ts and
• last_hash == K AND last_ts < 60 min ago
➜ Respond exactly: { "error": "DuplicatePrompt",
  "message": "This prompt was already evaluated recently. Please refine it before requesting another evaluation." }
################################################################

1 · ELITE PROMPTS LIBRARY

################################################################
(24 concise framework definitions — never mention brand names)
	1.	Clarifying Interview – “You are an expert…” + layered Socratic Qs
	2.	Step-by-Step Chain – “Let’s think step-by-step…” numbered reasoning
	3.	Role-Task-Format (RTF) – “You are [ROLE]… Respond in [FORMAT]”
… (items 4-24 unchanged) …

################################################################

2 · EVALUATION WORKFLOW

################################################################
When P passes both guards:

A. Framework Mapping – label each framework 1-24 as "match", "partial", or "miss".

B. Structural Scoring – 0-5 each (Clarity, Role, Context, Constraints, Error-handling);
overall_score = average × 4 (max 20).

C. Detailed Feedback – 3 short paragraphs (≈ 70-90 words each) explaining strengths, weaknesses, and relevant frameworks (name only).

D. Improvements – list all impactful fixes (≤ 25 words each), ranked by impact.

E. Improved Prompt – output a clearly structured, multi-section prompt using the template below.
• Each header on its own line.
• Indent bullets two spaces.
• End with an explicit OUTPUT FORMAT block if appropriate.
• Escape newlines inside the JSON string with \n.

F. RESPONSE FORMAT – You MUST return a valid JSON object with these exact fields:
{
  "framework_mapping": {
    "clarifying_interview": "match|partial|miss",
    "step_by_step_chain": "match|partial|miss", 
    "role_task_format": "match|partial|miss"
  },
  "structural_scoring": {
    "clarity": 0-5,
    "role": 0-5,
    "context": 0-5,
    "constraints": 0-5,
    "error_handling": 0-5
  },
  "overall_score": 0-20,
  "detailed_feedback": "3 paragraphs explaining strengths, weaknesses, and frameworks",
  "improvements": ["list", "of", "improvements"],
  "improved_prompt": "### ROLE\nYou are...\n\n### TASK\n1. ...\n2. ...\n\n### CONTEXT\n- ...\n\n### CONSTRAINTS\n- ...",
  "hash": "abc123def4"
}
################################################################

3 · FAILURE ETIQUETTE
################################################################
If prompt_to_evaluate is empty or missing, return the InvalidPrompt JSON from Section 0.`;

    // Build user message
    let userContent = `prompt_to_evaluate: ${prompt}`;
    if (meta) {
      userContent += `\nmeta: ${JSON.stringify(meta)}`;
    }
    if (timestamp) {
      userContent += `\ntimestamp: ${timestamp}`;
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent }
      ],
    });

    const text = completion.choices[0]?.message?.content || "No response generated";
    console.log("OpenAI response:", text);

    // Try to parse as JSON, fallback to error if not valid
    let parsed = null;
    try {
      parsed = JSON.parse(text);
    } catch (err) {
      return NextResponse.json({
        error: "InvalidAIResponse",
        message: "OpenAI did not return valid JSON. See raw response.",
        raw: text
      }, { status: 200 });
    }

    // Attach hash to response if not present
    if (!parsed.hash) {
      parsed.hash = hash;
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Error evaluating prompt:", error);
    return NextResponse.json({
      error: "ServerError",
      message: "An error occurred while evaluating the prompt."
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "GET /api/evaluate-prompt is working! Use POST to evaluate prompts." });
} 