import React, { useEffect } from 'react'
import Login from './Login';
import Browse from './Browse';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase'
import { useDispatch, useSelector } from 'react-redux';
import { addUser , removeUser } from '../utils/userSlice';

const Body = () => {
    const dispatch = useDispatch();
    
    const appRoute = createBrowserRouter([
        {
            path: "/",
            element: <Login/>
        }, 
        {
            path: "/browse",
            element: <Browse />
        }
    ])

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {    // Firebase Method to track sign in / sign out
            if (user) {
              const {uid, email , displayName, photoURL} = user;
              dispatch(addUser({uid: uid ,email: email,displayName: displayName , photoURL: photoURL}));
            } else {
                dispatch(removeUser());
            }
          });
    },[])
  return (
    <div>
      <RouterProvider router={appRoute} />
    </div>
  )
}

export default Body
