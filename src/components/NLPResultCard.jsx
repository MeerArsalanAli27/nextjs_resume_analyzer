// import React from 'react';

// const NLPResultCard = ({ result }) => {
//     return (
//       <div className="bg-green-500 h-[80vh] w-[80vw] p-4 rounded-xl shadow-md overflow-auto">
//         <h2 className="text-lg font-bold mb-2">NLP Result</h2>
//         <div className="flex flex-col space-y-4">
//           {result.summary?.text && (
//             <div className="bg-gray-200 p-4 rounded-md">
//               <h3 className="text-lg font-bold mb-2">Text Summarization</h3>
//               <p className="text-gray-700 whitespace-pre-wrap">
//                 {result.summary.text.replace(/<[^>]+>/g, '')}
//               </p>
//             </div>
//           )}
  
//           {result.sentiment && (
//             <div className="bg-gray-200 p-4 rounded-md">
//               <h3 className="text-lg font-bold mb-2">Sentiment Analysis</h3>
//               <p className="text-gray-700">Sentiment: {result.sentiment}</p>
//               {result.sentiment_confidence && (
//                 <p className="text-gray-700">Confidence: {result.sentiment_confidence}</p>
//               )}
//             </div>
//           )}
  
//           {result.pos_tags && Object.keys(result.pos_tags).length > 0 && (
//             <div className="bg-gray-200 p-4 rounded-md">
//               <h3 className="text-lg font-bold mb-2">Part-of-Speech (POS) Tagging</h3>
//               <ul className="list-disc pl-4">
//                 {Object.keys(result.pos_tags).map((word, index) => (
//                   <li key={index}>
//                     <strong>{word}:</strong> {result.pos_tags[word].join(', ')}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
  
//           {result.ner_tags && result.ner_tags.length > 0 && (
//             <div className="bg-gray-200 p-4 rounded-md">
//               <h3 className="text-lg font-bold mb-2">Named Entity Recognition (NER)</h3>
//               <ul className="list-disc pl-4">
//                 {result.ner_tags.map((tag, index) => (
//                   <li key={index}>
//                     <strong>{tag.word}:</strong> {tag.tag}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
  
//           {result.dependency_parse && (
//             <div className="bg-gray-200 p-4 rounded-md">
//               <h3 className="text-lg font-bold mb-2">Dependency Parsing</h3>
//               <pre className="text-gray-700 whitespace-pre-wrap">{result.dependency_parse}</pre>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };
  
//   export default NLPResultCard;
  
// import React from 'react';

// const NLPResultCard = ({ result }) => {
//   return (
//     <div className="bg-green-500 h-[80vh] w-[80vw] p-4 rounded-xl shadow-md">
//       <h2 className="text-lg font-bold mb-2">NLP Result</h2>
//       <div className="flex flex-col space-y-4">
//         {result.summary && (
//           <div className="bg-gray-200 p-4 rounded-md">
//             <h3 className="text-lg font-bold mb-2">Text Summarization</h3>
//             <p className="text-gray-700">{result.summary.text.replace(/<[^>]+>/g, '')}</p>
//           </div>
//         )}
//         {result.sentiment && (
//           <div className="bg-gray-200 p-4 rounded-md">
//             <h3 className="text-lg font-bold mb-2">Sentiment Analysis</h3>
//             <p className="text-gray-700">Sentiment: {result.sentiment}</p>
//             <p>{result.tokens}</p>
//             {result.sentiment_confidence && (
//               <p className="text-gray-700">Confidence: {result.sentiment_confidence}</p>
//             )}
//           </div>
//         )}
//         {result.pos_tags && (
//           <div className="bg-gray-200 p-4 rounded-md">
//             <h3 className="text-lg font-bold mb-2">Part-of-Speech (POS) Tagging</h3>
//             <ul className="list-disc pl-4">
//               {Object.keys(result.pos_tags).map((word, index) => (
//                 <li key={index}>{word}: {result.pos_tags[word].join(', ')}</li>
//               ))}
//             </ul>
//           </div>
//         )}
//         {result.ner_tags && (
//           <div className="bg-gray-200 p-4 rounded-md">
//             <h3 className="text-lg font-bold mb-2">Named Entity Recognition (NER)</h3>
//             <ul className="list-disc pl-4">
//               {result.ner_tags.map((tag, index) => (
//                 <li key={index}>{tag.word}: {tag.tag}</li>
//               ))}
//             </ul>
//           </div>
//         )}
//         {result.dependency_parse && (
//           <div className="bg-gray-200 p-4 rounded-md">
//             <h3 className="text-lg font-bold mb-2">Dependency Parsing</h3>
//             <p className="text-gray-700">{result.dependency_parse}</p>
//           </div>
//         )}
//         {result.dependency_tree && (
//           <div className="bg-gray-200 p-4 rounded-md">
//             <h3 className="text-lg font-bold mb-2">Dependency Tree</h3>
//             <pre className="text-gray-700">{result.dependency_tree}</pre>
//           </div>
//         )}
//         {result.dependency_tree && (
//           <div className="bg-gray-200 p-4 rounded-md">
//             <h3 className="text-lg font-bold mb-2">Dependency Tree (Visualized)</h3>
//             <div className="text-gray-700">
//               {result.dependency_tree.split('\n').map((line, index) => (
//                 <p key={index}>{line}</p>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NLPResultCard;

// components/NLPResultCard.js
export default function NLPResultCard({ result }) {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg mt-5">
      <h2 className="text-2xl font-bold">Analysis Results</h2>
      
      <div className="mt-4">
        <h3 className="text-xl font-semibold">Cleaned Text:</h3>
        <p>{result.cleanedText}</p>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-semibold">Tokens:</h3>
        <ul className="list-disc pl-5">
          {result.tokens.map((token, index) => (
            <li key={index}>{token}</li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-semibold">POS Tagging:</h3>
        {result.taggedTokens.map((token, index) => (
          <div key={index} className="border-l-2 border-blue-500 pl-3 mb-2">
            {Object.entries(token).map(([word, tags]) => (
              <div key={word}>
                <strong>{word}</strong> - {tags.join(', ')}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-semibold">Named Entities:</h3>
        {result.entities.length > 0 ? (
          <ul className="list-disc pl-5">
            {result.entities.map((entity, index) => (
              <li key={index}>{entity}</li>
            ))}
          </ul>
        ) : (
          <p>No named entities found.</p>
        )}
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-semibold">Dependency Tree:</h3>
        <pre className="bg-gray-700 p-2 rounded">{result.dependencyTree}</pre>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-semibold">Sentiment Analysis:</h3>
        <p>Sentiment Score: {result.sentiment}</p>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-semibold">Summary:</h3>
        <p>{result.summary.text}</p>
      </div>
    </div>
  );
}
