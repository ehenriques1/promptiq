import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json()

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 })
    }

    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: `You are an expert prompt engineer. Analyze the given prompt and provide:

1. What works well (3-5 specific points)
2. What needs improvement (3-5 specific points)  
3. An improved version of the prompt using best practices

Format your response as JSON with this structure:
{
  "strengths": ["strength 1", "strength 2", ...],
  "improvements": ["improvement 1", "improvement 2", ...],
  "optimizedPrompt": "The improved prompt here..."
}`,
      prompt: `Please analyze this prompt: "${prompt}"`,
    })

    // Parse the AI response
    let analysis
    try {
      analysis = JSON.parse(text)
    } catch {
      // Fallback if AI doesn't return valid JSON
      analysis = {
        strengths: ["Clear intent and purpose", "Specific topic focus", "Appropriate length for the task"],
        improvements: [
          "Missing role definition for the AI",
          "No specific formatting requirements",
          "Lacks context and constraints",
          "No examples or desired output format",
        ],
        optimizedPrompt: `You are an expert assistant specializing in [specific domain]. Your task is to ${prompt.toLowerCase()} while considering the following context: [relevant context].

Please follow these guidelines:
1. [Specific instruction 1]
2. [Specific instruction 2]
3. [Specific instruction 3]

Format your response as:
- [Format requirement 1]
- [Format requirement 2]

Constraints:
- Keep responses under [word limit]
- Use [specific tone/style]
- Include [required elements]

Example of desired output: [brief example]`,
      }
    }

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Error evaluating prompt:", error)
    return NextResponse.json({ error: "Failed to evaluate prompt" }, { status: 500 })
  }
}
