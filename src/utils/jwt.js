// // utils/jwt.js
// import jwt from 'jsonwebtoken';

// const JWT_SECRET = 'meer2727'; // Replace with your own secret

// export const generateToken = (user) => {
//     return jwt.sign({ id: user._id, username: user.email }, JWT_SECRET, {
//         expiresIn: '1d',
//     });
// };

// export const verifyToken = async(token) => {
//     return await jwt.verify(token, JWT_SECRET);
// };
 
import { jwtVerify, SignJWT } from 'jose';

// Replace with your own secret and convert it to a Uint8Array
const secret = new TextEncoder().encode(process.env.JWT_SECRET);


export const generateToken = async (user) => {
    const token = await new SignJWT({ id: user._id, username: user.email })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1d')
        .sign(secret);
    return token;
};

export const verifyToken = async (token) => {
    const { payload } = await jwtVerify(token,secret);
    return payload;
};
