import React, { useState , useRef } from 'react';
import Header from './Header';
import { checkValidData, checkValidSignUp } from "../utils/validation"
import { createUserWithEmailAndPassword , signInWithEmailAndPassword , updateProfile } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';


const Login = () => {

const [isSignInForm , setIsSignInForm] = useState(true);
const [userName , setUserName] = useState("");
const [password , setPassword] = useState("");
const [errorMessage, setErrorMessage] = useState(null);
const [errorOnSignUp, setErrorOnSignUp] = useState(null);

const fullName = useRef(null); // Instead of assigning a state to collect User Input Value, Here we are referencing to the input element
const reTypePassword = useRef(null);
const phoneNumber = useRef(null);

const dispatch = useDispatch();

const handleSubmitClick = () => {
    setErrorMessage(null);
    setErrorOnSignUp(null);
    const validate = isSignInForm ? checkValidData(userName, password) : checkValidSignUp(fullName.current.value,userName,password,reTypePassword.current.value,phoneNumber.current.value );
    isSignInForm ? setErrorMessage(validate) : setErrorOnSignUp(validate);

    if(validate) return;

    if(!isSignInForm){
        createUserWithEmailAndPassword(auth, userName, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    updateProfile(auth.currentUser, {
      displayName: fullName.current.value, photoURL: "https://example.com/jane-q-user/profile.jpg"
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
    // Signed in 
    const user = userCredential.user;
    // ...
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
      <img src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="Logo"></img>
    </div>
    <form className="absolute p-12 w-3/12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80" onSubmit={(e) => e.preventDefault()}>
        <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
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
            type="text" 
            placeholder="Password" 
            className="p-4 my-4 w-full bg-gray-700 rounded-lg"
            onChange={ (e) => setPassword(e.target.value)}
            value={password}
        />
        {(isSignInForm && errorMessage != null) && <p className="text-red-500">{errorMessage}</p> }
        {!isSignInForm && (<input 
            type="text"
            ref={reTypePassword}
            placeholder="Retype your password" 
            className="p-4 my-4 w-full bg-gray-700" /> )}
         {!isSignInForm && (<input 
            type="text"
            placeholder="Phone Number" 
            className="p-4 my-4 w-full bg-gray-700"
            ref={phoneNumber} />
             )}
        {(!isSignInForm && errorOnSignUp != null) && <p className="text-red-500">{errorOnSignUp}</p> }

        <button className="p-4 my-4 bg-red-700 w-full rounded-lg" onClick={handleSubmitClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>

        <p className="py-6 cursor-pointer" onClick={toggleSignInForm}>{isSignInForm ? "New to NetFlix? Sign Up Now" : "Already existing User? Sign In Now"}</p>
    </form>
    </div>
  ) 
}

export default Login
