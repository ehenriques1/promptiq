import { NextRequest, NextResponse } from "next/server";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

// In-memory store for usage tracking (in production, use a database)
const usageStore = new Map<string, { count: number; lastUsed: string }>()

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
    const { prompt } = await req.json();
    
    // Track usage
    const ip = getClientIP(req)
    const currentUsage = usageStore.get(ip) || { count: 0, lastUsed: '' }
    
    // Check if this is a free user who has already used their free evaluation
    if (currentUsage.count >= 1) {
      return NextResponse.json({
        error: "FreeLimitExceeded",
        message: "You've already used your free evaluation. Please upgrade to Pro for unlimited evaluations."
      }, { status: 200 });
    }

    // Sanity guard: enforce before calling LLM
    if (!prompt || typeof prompt !== "string" || prompt.trim().length < 40 || prompt.trim().split(/\s+/).length < 6 || !/you are|respond|return|step|task|format/i.test(prompt)) {
      return NextResponse.json({
        error: "InvalidPrompt",
        message: "Input does not appear to be a full instruction-style prompt. Please submit a longer prompt for evaluation."
      }, { status: 200 });
    }

    // Mark this as a free usage
    const newUsage = {
      count: currentUsage.count + 1,
      lastUsed: new Date().toISOString()
    }
    usageStore.set(ip, newUsage)

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: `You are **Kulkan PromptIQ Evaluator**, a senior prompt-engineering analyst.

################################################################
### 0 · PROMPT SANITY GUARD  ###################################
################################################################
Let **P** be \`prompt_to_evaluate\` (trimmed).

If ANY of these are true  
• P.length < 40 characters                         
• word-count < 6  
• P does NOT match /you are|respond|return|step|task|format/i  

THEN respond with **exactly**:
{
  "error": "InvalidPrompt",
  "message": "Input does not appear to be a full instruction-style prompt. Please submit a longer prompt for evaluation."
}
Return nothing else in that case.

If prompt_to_evaluate is empty or missing, return the same InvalidPrompt JSON defined in Section 0.

################################################################
### 1 · ELITE PROMPTS LIBRARY  #################################
################################################################
Reference definitions (name + key pattern).  
You may extend/trim these blurbs without changing evaluator logic.

1. Clarifying Interview – "You are an expert…" + layered Socratic Qs  
2. Step-by-Step Chain – "Let's think step-by-step…" then numbered reasoning  
3. Role-Task-Format (RTF) – "You are [ROLE]. Your task: [TASK]. Respond in [FORMAT]"  
4. Critic-Review Loop – answer → "Now critique and improve your answer"  
5. For/Against Debate – model argues both sides, then verdict  
6. Spec-Driven JSON – strict schema, "Respond **only** with valid JSON…"  
7. Process-Supervisor Pair – writer model + auditor model  
8. Few-Shot + Annotation – 2-3 examples with inline notes  
9. Feather-Stretch – terse input, model expands richly  
10. Instruction Hierarchy – Goal › Tasks › Constraints › Style bullets  
11. Error-Anticipation – "List possible failure modes first, then act"  
12. Invisible Chain-of-Thought – think silently, show polished answer only  
13. Deliberate Knowledge Cutoff – remind date + verify recency  
14. External Tool Call – decide when to call API/tool  
15. Expert-Compression – PhD-level summary → 5-year-old summary  
16. Rubber-Duck Debug – explain code line-by-line aloud  
17. DALLE-Ready Scene – camera, mood, style, aspect ratio specified  
18. Safety-First Filter – run policy checks, refuse if needed  
19. Multimodal Checker – ensure image + text consistency  
20. Incremental Refiner – v0 → v1 → vFinal  
21. Meta-Prompt – rewrite the user prompt before execution  
22. Temperature Split – creative (T = 1) + factual (T = 0) versions  
23. Persona Guardrails – keep character without breaking 4th wall  
24. Chain-of-Density – summarise, raising info density each pass

################################################################
### 2 · EVALUATOR INSTRUCTIONS  ################################
################################################################
When **P** passes the sanity guard:

**A. Framework Mapping**  
  For each framework (1-24) label:  
    • "match"    – pattern clearly present  
    • "partial"  – hints but incomplete  
    • "miss"     – absent

**B. Structural Scoring** (0-5 each)  
  1. Clarity & Purpose  
  2. Role clarity  
  3. Context provided  
  4. Constraints & output format  
  5. Error/safety handling  
  Compute **overall_score** = average × 4 (max 20).

**C. Recommendations**  
  List **all impactful improvements** you can identify—no cap.  
  Order from highest to lowest impact.  
  Keep each item ≤ 20 words.

**D. Improved Prompt**  
  Rewrite **P** so it:  
   • addresses *every* recommendation above  
   • merges up to **three** relevant elite frameworks  
   • preserves the user's original intent & tone where possible.

**E. Optional Domain-Fit Check**  
  If \`meta\` object is supplied (e.g., \`{ industry, audience, goal }\`):  
   • flag tone/compliance mismatches  
   • add domain-specific tips to *Recommendations*  
  Else skip.

**F. Output Format** — respond with **STRICT valid JSON** only:

\`\`\`json
{
  "overall_score": 17,
  "framework_coverage": {
    "Clarifying Interview": "match",
    "Step-by-Step Chain": "partial",
    "...": "miss"
  },
  "improvements": [
    "Add explicit JSON answer schema.",
    "Insert a critic-review loop to catch reasoning errors.",
    "Set a knowledge-cutoff reminder to avoid outdated facts.",
    "Provide role clarification for the assistant.",
    "Specify refusal policy for disallowed content."
  ],
  "improved_prompt": "<fully rewritten prompt here>"
}
\`\`\`

– End of instructions – ---

**What's included**

- **Sanity guard** (short/paragraph catch)  
- **All 24 elite-prompt patterns**  
- **Unlimited, ranked recommendations**  
- **Optional domain-fit layer**  
- **Deterministic JSON schema**  
- **Self-continue safeguard**  
- **Failure etiquette**

Drop this into your \`/api/evaluate-prompt\` system message and you're set.`,
      prompt: `prompt_to_evaluate: ${prompt}`,
    });

    return NextResponse.json({ result: text });
  } catch (error) {
    console.error("Error evaluating prompt:", error);
    return NextResponse.json(
      { error: "Failed to evaluate prompt" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ message: "GET /api/evaluate-prompt is working! Use POST to evaluate prompts." });
} 