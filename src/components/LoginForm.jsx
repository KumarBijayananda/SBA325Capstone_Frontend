import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth/auth_context";


export default function LoginForm({ setNewUser }) {
  const nav = useNavigate();
  const {login} = useAuth();
  const [formData, setFormData]= useState({
    email:'',
    password:'',
  })

function handleChange(e){
  setFormData({...formData, [e.target.name]:e.target.value})
}

async function handleSubmit(e){
  e.preventDefault();
  await login(formData);
  nav('/dashboard')
}

  const handleClick = () => {
    nav('/signup')
  };

  return (
    <div className='forms'>
      <h2>Login</h2>
      <form autoComplete='off' onSubmit={handleSubmit}>
        <label htmlFor='email'>Email: </label>
        <input onChange={handleChange} type='email' id='email' name='email' placeholder='Email' />
        <label htmlFor='password'>Password: </label>
        <input onChange={handleChange}
          type='password'
          id='password'
          name='password'
          placeholder='Password'
          minLength='6'
        />
        <button type='submit'>
          Log In
        </button>
      </form>
      <p>
        Dont have an account? <button onClick={handleClick}>Sign Up</button>
      </p>
    </div>
  );
};

