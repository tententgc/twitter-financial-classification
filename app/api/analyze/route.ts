import { NextResponse } from 'next/server';
import { InferenceClient } from '@huggingface/inference';

// Initialize the Hugging Face client
const hf = new InferenceClient(process.env.HUGGINGFACE_API_KEY);

// We use FinBERT, a model optimized for financial sentiment
// You can swap this string for any other model on Hugging Face
const MODEL_NAME = 'ProsusAI/finbert'; 

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // Call the Hugging Face Inference API
    const result = await hf.textClassification({
      model: MODEL_NAME,
      inputs: text,
    });

    // The model returns an array of scores for labels: "positive", "negative", "neutral"
    // We send this data back to the frontend
    return NextResponse.json(result);
    
  } catch (error: any) {
    console.error('AI Error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze sentiment', details: error.message },
      { status: 500 }
    );
  }
}