import React , { useEffect } from 'react'
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser , removeUser } from '../utils/userSlice';
import { logo } from '../utils/constants';

const Header = () => {

const dispatch = useDispatch();
const navigate = useNavigate();
const user = useSelector(store => store.user);

useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {    // Firebase Method to track sign in / sign out
        if (user) {
          const {uid, email , displayName, photoURL} = user;
          dispatch(addUser({uid: uid ,email: email,displayName: displayName , photoURL: photoURL}));
          navigate("/browse");
        } else {
            dispatch(removeUser());
            navigate("/");
        }
      });

      return () => unsubscribe()
},[])

const handleSignOut = () => {
    
signOut(auth).then(() => {
}).catch((error) => {
  // An error happened.
});
}

return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
        <img className="w-44" src = {logo} alt= "Logo"></img>
        {user && <div className="flex p-2">
            <img className="w-12 h-12" src={user.photoURL} alt="User Icon"></img>
            <button onClick={handleSignOut} className='font-bold text-white'>Sign Out</button>
        </div> }
    </div>
  )
}

export default Header
