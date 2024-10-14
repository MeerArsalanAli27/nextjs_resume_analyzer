"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';


export default function Register() {
  const router = useRouter();
  const submitform=async(e)=>{
        e.preventDefault();
        const formm = new FormData(e.currentTarget);
        
    const  formobj = Object.fromEntries(formm);
    console.log(formobj);
  e.currentTarget.reset();
    const res= await fetch('api/register', {
        method: "POST",
        body: JSON.stringify(formobj),
        headers: {
          "Content-Type": "application/json",
          
        } 
      })
  
      if(res.ok){
        router.push('/loginpage')
        
       
      }
      // .then((res) => res.json())
      // .then((result)=>{
      //   alert("rgistred")
        
      // })
      // .catch((err) => console.log(err));
      
     
 

    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Register</h2>
        <form onSubmit={submitform}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
              name='fullname'
            />
          </div>
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
            Register
          </button>
        </form>
        <p className="mt-4 text-gray-700">
          Already have an account?{' '}
          <Link href="/loginpage">
            <span className="text-green-600 hover:underline cursor-pointer">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
}
