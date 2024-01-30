import React from 'react'
import { useState } from 'react'
import axios from "axios";

function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function registerUser(e) {
    try {
      e.preventDefault();
      axios.post('/register', {
        name,
        email,
        password
      })
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div className='p-1 items-center text-center relative top-32 grow flex-col'>
        <div className='mb-6 text-4xl text-center'>
          Create a new Account
        </div>
        <form className='max-w-md mx-auto' onSubmit={registerUser} action="">
          <input type="text"
            placeholder='Name'
            value={name}
            onChange={e => setName(e.target.value)} />
          <input type="email"
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)} />
          <input type="password"
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)} />
          <button className='w-full rounded-xl bg-primary my-1 py-1.5 shadow-md shadow-gray-600 text-white'>Register</button>
        </form>
      </div>
    </div>
  )
}

export default Register
