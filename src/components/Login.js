import React, { useState , useRef } from 'react';
import Header from './Header';
import { checkValidData, checkValidSignUp } from "../utils/validation"
import { createUserWithEmailAndPassword , signInWithEmailAndPassword , updateProfile } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BG_URL , USER_AVATAR } from '../utils/constants';


const Login = () => {

const [isSignInForm , setIsSignInForm] = useState(true);
const [userName , setUserName] = useState("");
const [password , setPassword] = useState("");
const [errorMessage, setErrorMessage] = useState(null);
const [errorOnSignUp, setErrorOnSignUp] = useState(null);

const fullName = useRef(null); // Instead of assigning a state to collect User Input Value, Here we are referencing to the input element

const dispatch = useDispatch();

const handleSubmitClick = () => {
    setErrorMessage(null);
    setErrorOnSignUp(null);
    const validate = isSignInForm ? checkValidData(userName, password) : checkValidSignUp(fullName.current.value,userName,password );
    isSignInForm ? setErrorMessage(validate) : setErrorOnSignUp(validate);

    if(validate) return;

    if(!isSignInForm){
        createUserWithEmailAndPassword(auth, userName, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    updateProfile(auth.currentUser, {
      displayName: fullName.current.value, photoURL: USER_AVATAR
    }).then(() => {
      const {uid, email , displayName, photoURL} = auth.currentUser;
      dispatch(addUser({uid: uid ,email: email,displayName: displayName , photoURL: photoURL}));
    }).catch((error) => {
      setErrorOnSignUp(error.message);
    });
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorOnSignUp(errorCode + "-" + errorMessage);
  });
    } else {
        signInWithEmailAndPassword(auth, userName, password)
  .then((userCredential) => { 
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage);
  });
    }
}


const toggleSignInForm = () => {
    setUserName("");
    setPassword("");
    setErrorMessage(null);
    setErrorOnSignUp(null);
    setIsSignInForm(!isSignInForm);
}

  return (
    <div>
      <Header />
      <div className='absolute'>
        <img src={BG_URL} alt="Logo" className='h-screen object-cover brightness-50 md:w-screen'></img>
      </div>
      <div className="form relative flex h-screen items-center justify-center">
      <form className="w-full rounded-lg bg-black bg-opacity-80 p-12 text-white md:w-3/12" onSubmit={(e) => e.preventDefault()}>
        <h1 className='text-3xl font-bold text-white'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && (<input 
            type="text"
            placeholder="Full Name" 
            ref={fullName}
            className="p-4 my-4 w-full bg-gray-700" /> )}
        <input 
            type="text"
            placeholder="Email Address" 
            className="p-4 my-4 w-full bg-gray-700"
            onChange={ (e) => setUserName(e.target.value)}
            value={userName} />
        
        <input 
            type="password" 
            placeholder="Password" 
            className="p-4 my-4 w-full bg-gray-700 rounded-lg"
            onChange={ (e) => setPassword(e.target.value)}
            value={password}
        />
        {(isSignInForm && errorMessage != null) && <p className="text-red-500">{errorMessage}</p> }
        {(!isSignInForm && errorOnSignUp != null) && <p className="text-red-500">{errorOnSignUp}</p> }

        <button className="p-4 my-4 bg-red-700 w-full rounded-lg" onClick={handleSubmitClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>

        <p className="py-6 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to NetFlix? Sign Up Now" : "Already existing User? Sign In Now"}</p>
    </form>
    </div>
    </div>
  ) 
}

export default Login
