import React from 'react'
import htmlParser from 'html-react-parser';
export const Card = ({givedata}) => {
  return (
    <div className='flex justify-center mt-10'>
            <div className='bg-white shadow-lg rounded-lg p-6 max-w-4xl transform transition duration-500 hover:scale-105 hover:shadow-2xl'>
              <h2 className='text-3xl font-bold mb-4 text-center text-blue-800'>Analysis Result</h2>
              <div className='prose'>{htmlParser(givedata)}</div>
            </div>
          </div>
  )
}
