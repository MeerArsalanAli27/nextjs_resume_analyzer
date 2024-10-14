import { NextResponse,NextRequest } from "next/server";
import User from '@/app/models/user';
import { mongoconnect,mongoDisconnect } from '@/utils/mongodb';
const bcrypt=require('bcrypt');
import { generateToken } from "@/utils/jwt";


export async function POST(req){
    const {email,password} = await req.json();
    console.log(email,password);
    
  if (!email|| !password) { return NextResponse.json({ message: 'Please provide both email and password' }); }
  try {
    await  mongoconnect();
    const user = await User.findOne({ email });
    if (!user) {
     return NextResponse.json({ message: 'Invalid credentials' },{status:400});
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
    return NextResponse.json({ message: 'Invalid credentials' },{status:400}); 
}
    const token =await  generateToken(user);
    //jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
 await mongoDisconnect()
//this is nnew method for send nextresponse because we have to send and set cookies with ths token and send it in fronend
  const response=NextResponse.json({ message:'loggedin successfully',success:true,status:200}) ;
                 response.cookies.set('token',token,{
                  httpOnly:true, 
                    }) 
   
                    return response;



  } catch (error) {
      NextResponse.json({ message: 'Something went wrong' ,status:404});
  }

}

