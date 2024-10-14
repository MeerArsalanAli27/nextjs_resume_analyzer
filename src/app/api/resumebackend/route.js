import { NextResponse ,NextRequest} from 'next/server';

import { writeFile } from 'fs/promises';

import PDFParser from 'pdf2json';  
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
const dotenv=require('dotenv');
dotenv.config();

const model = new ChatGoogleGenerativeAI({
  apiKey:process.env.GOOGLE_API_KEY,
  modelName: "gemini-pro",
  maxOutputTokens: 8000,
  temperature:0,
});

export async function POST(NextRequest){
  const data=await NextRequest.formData();
  let parsedText='';
  let analysistext;



const getfile=data.get('sendfile');
if(!getfile){
  console.log("error not got file");
  return NextResponse.json({sucess: false})
}
console.log(getfile)
const bytes=await getfile.arrayBuffer();
const buffer=Buffer.from(bytes);
console.log("these are bytes:",bytes,'THESE ARE BUFFER',buffer);

const path=`./files/${getfile.name}`;
await writeFile(path,buffer)

console.log(`open ${path} to check file`)

const pdfParser = new (PDFParser)(null, 1);
await pdfParser.loadPDF(path);

// See pdf2json docs for more info on how the below works.
pdfParser.on('pdfParser_dataError', (errData) =>
  console.log(errData.parserError)
);

 // Wait for the PDF to be parsed
 const parsePDF = () =>
 new Promise((resolve, reject) => {
   pdfParser.on('pdfParser_dataReady', async () => {
     parsedText = pdfParser.getRawTextContent();
     try {
       analysistext = await model.invoke(
         `Perform resume analysis and.Provide general information about the applicant and generate a random resume score from 1 to 100 based on this resume. Suggest some additional skills based on current skills to land a good job.and give recommendation to improve the resume  ${parsedText}`
       );
       resolve(analysistext);
     } catch (error) {
       reject(error);
     }
   });

   pdfParser.loadPDF(path);
 });

try {
 const analysisResult = await parsePDF();

 console.log(analysisResult);
 return NextResponse.json({ success: true,analysisResult });
} catch (error) {
 console.error('Error during PDF parsing or analysis:', error);
 return NextResponse.json({ success: false, message: 'Error during analysis' });
}
}