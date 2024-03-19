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

    
  return (
    <div>
      <RouterProvider router={appRoute} />
    </div>
  )
}

export default Body
