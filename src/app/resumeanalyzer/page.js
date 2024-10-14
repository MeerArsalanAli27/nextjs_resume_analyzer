"use client"
import React, { Suspense, useState } from 'react';
import Button from '@/components/ui/Button';
import htmlParser from 'html-react-parser';
import { Card } from '@/components/Card';
import Loader from '../../components/ui/Loader'
const NLP = () => {
const [analysisdata,setanalysisdata]=useState('');


const [isLoading, setIsLoading] = useState(false);
    
    // const catchfile=(e)=>{
         
    //     setfilecatch(e.target.files[0]);

    // }
  const handleFileUpload = async (e) => {

    e.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true);
    const formm = new FormData();
   
    
    //   const values=([...formm.values()]);
    //   console.log(values);
    // const  myfile= Object.fromEntries(formm);
    
    formm.set('sendfile',e.target.fileupload.files[0])
    
    if(!formm){
      return alert("please upload document")
 
    } 
 console.log([...formm.values()]);
  
    // if (!myfile) {
    //   return alert('Please upload a document.');
    // }

      const response = await fetch('api/resumebackend', {
        method: 'POST',
        body:formm, })
        .then((res) => res.json())

        .then((result)=>{
         const sections= result.analysisResult.kwargs.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\*(.*?)\*/g, '<em>$1</em>').replace(/\n/g, '<br/>');
         console.log(sections);
       
          setanalysisdata(sections)
        
        })
        .catch((err) => console.log(err))
        .finally(()=>{
          setIsLoading(false);

        })

  

      }

  return (
    <>
    <div className='flex  flex-col items-center justify-center min-h-screen '>

      <form onSubmit={handleFileUpload}>
    <div className='flex  flex-col items-center justify-center align-middle'>
      <h1 className='text-red-800 font-semibold text-4xl pb-5 mb-5 mt-7 pt-10'>Resume Analyzer</h1>
      <span>

      <label htmlFor="document" className='text-red-800 font-semibold mr-4'>upload file</label>
        <input type="file" name="fileupload" className='mb-5'/>
      </span>
      {isLoading?<Loader className="mt-4" />: <Button type="submit" label="Analyze" className="mt-4 w-full bg-red-800 text-white rounded-md p-2 hover:bg-red-700" />}
    </div>
    </form>
    {!isLoading && <Card givedata={analysisdata}/>}
    </div>
        
      {/* {isLoading && ( <Loader/>)}
      
      {showdata && <Card givedata={analysisdata}/>} */}

    </>
  );
};

export default NLP;
