// Import necessary modules
import { NextResponse } from 'next/server';

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
const dotenv=require('dotenv');
dotenv.config();

const model = new ChatGoogleGenerativeAI({
  apiKey:process.env.GOOGLE_API_KEY,
  modelName: "gemini-pro",
  maxOutputTokens: 6000,
  temperature:0,
});

// Define the API route handle r
export async function POST(req, response) {
  try {
    // Access the data from the request body
    const{ textprompt} = await req.json();
    
    // Example text
    const text = textprompt
    
   
    // Text Cleaning
    const cleanedText = text.replace(/[^\w\s]/gi, '').replace(/\s+/g, ' ');

    const combinedPrompt = `Can you perform the following NLP tasks on the given text:
1. Summarize the text and explain it in detail.
2. Perform part-of-speech (POS) tagging to identify the grammatical roles of each word.
3. Extract named entities, specifically organizations.
4. Analyze the grammatical structure and provide a dependency parse tree.
5. Analyze the sentiment and provide a score indicating whether it's positive, negative, or neutral.
Here is the text: ${cleanedText}`;
    
    const nlpresult = await model.invoke( combinedPrompt);
   
    let a=nlpresult;
    return NextResponse.json({ success: true, a});
  } catch (error) {
    // If an error occurs, return an error response
    console.error('Error:', error);
    return NextResponse.error(new Error('An error occurred while processing the request'));

  }
}
