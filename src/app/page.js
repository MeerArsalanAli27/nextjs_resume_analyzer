"use client"
import {Textarea} from '../components/ui/textarea'
import Button from "@/components/ui/Button"
import { Card } from '@/components/Card';
const axios=require('axios')
import { useState } from 'react'
import Loader from '../components/ui/Loader'

export default function Home() {
  const [resdata, setResdata] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const submitHandle = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formm = new FormData(e.currentTarget);
    const values = [...formm.values()];
    let isempty = values.includes('');
    if (isempty) {
      alert("Please provide all input");
      return;
    }
    const formobj = Object.fromEntries(formm);
    // Using Axios to send the form data to the server
    try {
      e.currentTarget.reset();
      const res= await axios.post('/api/preprocess', { textprompt: formobj.text })
        const sections=res.data.a.kwargs.content;

        let finalresult = sections
        // Convert bold text to <h3>
        .replace(/\*\*(.*?)\*\*/g, '<h3>$1</h3>') 
        // Convert numbered list sections to <h4> and add a space before each section
        .replace(/^\d+\.\s+(.*)/gm, '<h4>$1</h4><br>') 
        // Convert double line breaks to paragraphs
        .replace(/\n{2,}/g, '</p><p>') 
        // Convert lines starting with "-" to list items
        .replace(/^- (.*)/gm, '<li>$1</li>') 
        // Wrap list items with <ul> only if there are list items
        .replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>') 
        // Convert remaining single line breaks to <br>
        .replace(/\n/g, '<br>') 
        // Convert table rows
        .replace(/^\|(.+?)\|$/gm, (match, content) => {
            const cells = content.split('|').map(cell => `<td>${cell.trim()}</td>`).join('');
            return `<tr>${cells}</tr>`;
        })
        // Wrap table rows with <table> if there are rows
        .replace(/(<tr>.*<\/tr>\s*)+/gs, '<table>$&</table>') 
        // Remove table divider row
        .replace(/\|\s*---+\s*\|/g, '') 
        // Convert code blocks to <pre><code>
        .replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>') 
        // Clean up extra paragraph tags
        .replace(/<\/p><p>/g, '</p><p>') 
        // Add a default fallback if nothing is matched
        .replace(/(^\s*$)/gm, '<p>No content available.</p>'); // Handle empty lines
    
    // Format tables with specific styles and attributes for accessibility
    finalresult = finalresult.replace(/<table>(.*?)<\/table>/gs, '<table style="width: 100%; border-collapse: collapse;" role="table">$1</table>');
    
    // Style code blocks with a light background and add overflow for large content
    finalresult = finalresult.replace(/<pre><code>(.*?)<\/code><\/pre>/gs, '<pre style="background: #f8f9fa; padding: 10px; border-radius: 4px; overflow-x: auto;"><code>$1</code></pre>');
    
    // Handle nested lists: ensuring proper formatting for nested <ul>
    finalresult = finalresult.replace(/(<ul>)(<li>.*?<\/li>)(<\/ul>)/gs, '$1$2$3');
    
    // Replace multiple <br> with a single <br> for cleaner output
    finalresult = finalresult.replace(/(<br>\s*){2,}/g, '<br>');
    
    // Enhance readability by wrapping all paragraphs in a <div>
    finalresult = `<div>${finalresult}</div>`;
    
    // Optional: Add accessibility features like ARIA roles to lists and paragraphs
    finalresult = finalresult
        .replace(/<ul>/g, '<ul role="list">')  // Add role to unordered lists
        .replace(/<li>/g, '<li role="listitem">') // Add role to list items
        .replace(/<p>/g, '<p role="text">'); // Add role to paragraphs

    setResdata(finalresult); 
    } catch (error) {
      console.error(error);
      alert('An error occurred while processing your request.');
    }finally{
        setIsLoading(false);
    }
    // Reset form data after sending
  };
  return (
    <>
     <div className="flex items-center justify-center min-h-screen">
  <form onSubmit={submitHandle} className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg">
    <h1 className="text-red-500 font-semibold text-4xl pb-4 text-center">NLP Task</h1>
    
    <Textarea 
      name="text" 
      placeholder="Enter your text here..." 
      className="w-full p-2 border border-gray-300 rounded-md resize-none"
      rows={4}  // Adjust rows to your preference
    />
      {isLoading?<Loader className="mt-4" />: <Button type="submit" label="Analyze" className="mt-4 w-full bg-red-800 text-white rounded-md p-2 hover:bg-red-700" />}
  </form>
</div>
  {!isLoading && <Card givedata={resdata}/>}
    </>
  );
}