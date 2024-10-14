import { NextResponse ,NextRequest} from 'next/server';
import User from '@/app/models/user';
import { mongoconnect,mongoDisconnect } from '@/utils/mongodb';

const bcrypt=require('bcrypt');
export async function POST(req){
    const {fullname,email,password} = await req.json();
    console.log(fullname,email,password);
    
    try { 
        await  mongoconnect();
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.status(400).json({ error: 'email already exists' });
        }

       const hashedPassword = await bcrypt.hash(password, 10);


        const user =await  new User({ fullname,email, password:hashedPassword});
        await user.save();
           await mongoDisconnect();
        return  NextResponse.json({ message: 'User registered successfully' });

    } catch (error) {
        await mongoDisconnect();
       return  NextResponse.json({ error: error.message });
    }

} 