import React from 'react'
import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../UserContext';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);

    async function loginUser(e){
        e.preventDefault();
        try{
            const response = await axios.post('/login',{
                email,
                password
            });
            setUser(response.data);
            setRedirect(true);
        }
        catch(err){
            console.log(err);
        }
    }

    if(redirect){
        return <Navigate to={'/'} />
    }

    return (
        <div className='p-1 items-center text-center relative top-32 grow flex-col'>
            <div className='mb-6 text-4xl text-center'>
                Login to Your Account
            </div>
            <form className='max-w-md mx-auto' action="" onSubmit={loginUser}>
                <input type="email" 
                    placeholder='Email'
                    value={email}
                    onChange={e => setEmail(e.target.value)} />
                <input type="password" 
                    placeholder='Password'
                    value={password}
                    onChange={e => setPassword(e.target.value)} />
                <button className='w-full rounded-xl bg-primary my-1 py-1.5 shadow-md shadow-gray-600 text-white'>Login</button>
            </form>
            <div className='text-gray-500'>Don't have an account yet? <Link to={'/Register'} className='text-black underline'>Register here</Link></div>
        </div>
    )
}

export default Login
