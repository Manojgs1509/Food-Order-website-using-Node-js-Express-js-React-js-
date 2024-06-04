import React, { useContext, useState } from 'react'
import './Login.css'
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../Context/StroreContext';
import axios from 'axios'

const Login = ({setShowLogin}) => {

  const {url,setToken}=useContext(StoreContext);
    const [currState,setCurrState]=useState('login');
    const [data,setData]=useState({
        name:"",
        email:"",
        password:""
    })

      const onChangeHandler=(event)=>{
         
        const name=event.target.name;
        const value=event.target.value;

        setData(data=> ({...data,[name]:value}));
      }

      const onLogin=async(event)=>{
          event.preventDefault();
          let newUrl=url;

          if(currState === 'login'){
              newUrl+='/api/user/login';
          }else{
             newUrl+='/api/user/register';
          }

         const response=await axios.post(newUrl,data);

         if(response.data.success){
            setToken(response.data.token);
            localStorage.setItem('token',response.data.token);
            setShowLogin(false);
         }else{
             alert(response.data.message);
         }

          
           
      }

  return (
    <div className='login'>
         <form onSubmit={onLogin} className='login-form-container'>
              <div className="login-form-title">
                  <h2>{currState}</h2>
                  <img onClick={()=> setShowLogin(false)} src={assets.cross_icon} alt="" />
              </div>
              <div className="login-inputs">
                  
                {currState === 'login' ? <></> : <input onChange={onChangeHandler} name='name' value={data.name} type="text" placeholder='Enter Your Name' required/> }
                  <input onChange={onChangeHandler} name='email' value={data.email} type="email" placeholder='Enter Your Email' required/>
                  <input onChange={onChangeHandler} name='password' value={data.password} type="password" placeholder='Enter Your password' required/>
                   
              </div>
              <button type='submit'>{currState === "sign up" ? "Create Account " : "Login"}</button>
              <div className='login-condition'>
                  <input type="checkbox" required/>
                  <p>By continuing , I agree to the terms of use & privacy policy. </p>
              </div>
              {
                currState === 'login' 
                 ? <p>Create a new account ? <span onClick={()=> setCurrState('sign up')}>Click here</span> </p>
                 : <p>Already have an account ?  <span onClick={()=> setCurrState('login')}>Login here</span></p>
              }
         </form>
    </div>
  )
}

export default Login