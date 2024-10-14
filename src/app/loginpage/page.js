"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
export default function Login() {
  const router = useRouter();
  const submitform=async(e)=>{
    e.preventDefault();
    const formm = new FormData(e.currentTarget);
    
const  formobject = Object.fromEntries(formm);
console.log(formobject);
e.currentTarget.reset();
const response=await fetch('api/login', {
    method: "POST",
    body: JSON.stringify(formobject),
    headers: {
      "Content-Type": "application/json",
      
    } 
  })
      if(response.ok){
        router.push('/')
      }
      else{
        alert("error occured at backemd")
      }
  // .then((res) => res.json())
  //  .then((result)=>{
  //   alert("logged in")
    
  //  })
  //  .catch((err) => console.log(err));
  
 


}
 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Login</h2>
        <form onSubmit={submitform}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              name='email'
              type="email"
              id="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input 
              name='password'
              type="password"
              id="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-gray-700">
          Don't have an account?{' '}
          <Link href="/registerpage">
            <span className="text-green-600 hover:underline cursor-pointer">Register</span>
          </Link>
        </p>
      </div>
    </div>
  );  
  }
