"use client"
import Link from 'next/link';

export const Navbar = () => {
  
  return (

    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo or Brand Name */}
          <div>
            <Link href="/">
              <span className="text-gray-800 hover:text-green-500 font-bold text-xl cursor-pointer">Ai-Resume-Analyzer</span>
            </Link>
          </div>
          {/* Primary Navbar items */}
          <div className="hidden md:flex space-x-4">
            <Link href="/">
              <span className="text-gray-800 hover:text-green-500 font-medium cursor-pointer">Home</span>
            </Link>
            <Link href="/resumeanalyzer">
              <span className="text-gray-800 hover:text-green-500 font-medium cursor-pointer">Ai-Resume-Analyzer</span>
            </Link>
          
          </div>
          {/* Secondary Navbar items */}
          <div className="hidden md:flex space-x-4">
            <Link href="/loginpage">
              <span className="text-gray-800 hover:text-green-500 font-medium cursor-pointer">Log In</span>
            </Link>
            <Link href="/registerpage">
              <span className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-400 font-medium transition duration-300 cursor-pointer">Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

