import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './utils/jwt';
 import { cookies } from 'next/headers';
// This function can be marked `async` if using `await` inside
export function middleware(request=NextRequest) {
    //this is short form of getting  pathname from url
   // let path=request.nextUrl.pathname; 

    // Parse the URL from the request
  const url = new URL(request.url);
  // Extract the pathname
  const pathname = url.pathname;
  console.log('Pathname:', pathname);
let verifiedtoken;
  const ispublic=pathname==='/loginpage'|| pathname==='/registerpage'
  const gettoken=request.cookies.get("token")

 if(gettoken){
     
      verifiedtoken=verifyToken(`${gettoken.value}`);

 }
  

  if(ispublic && verifiedtoken){
    // let verify=gettoken.value;
    //  const verifiedtoken=verifyToken(verify);
     return NextResponse.redirect(new URL('/', request.url)) 

    //  else{
    //     alert("an error occured please please log in again")
    //     return NextResponse.redirect(new URL('/loginpage', request.url))}


  } 
  if(!ispublic && !gettoken){
    return NextResponse.redirect(new URL('/loginpage', request.url))

  }

  
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/loginpage','/registerpage','/','/resumeanalyzer']
} 



