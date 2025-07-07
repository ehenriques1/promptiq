import OpenAI from 'openai';
import { NextRequest } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    stream: true,
    messages,
  });

  // Return a simple response for now since the streaming imports aren't available
  return new Response(JSON.stringify({ message: "Chat functionality not implemented" }), {
    headers: { 'Content-Type': 'application/json' },
  });
}