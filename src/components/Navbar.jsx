import React from 'react'
import { useEffect } from 'react';
import UserButton from './UserButton'
import { useSelector,useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { userLogin } from "../slice/userSlice"

function Navbar() {
  const userState = useSelector((state) => state.userReducer);

    return (
        <>
            <div className='bg-primary py-2'>
            <div className="container">
            <nav className="navbar navbar-light">
                <a className="navbar-brand text-light fw-bold fs-2" href="/user">
                    {/* <img src="/" width="30" height="30" className="d-inline-block align-top" alt="" /> */}
                    Sunrise Coupon Tracker
                        </a>
                        <div>
                            {userState.loginStatus ? <UserButton/> : (<Link to={"/user/login"} className="btn btn-outline-light mb-1 px-3 ms-3">Login</Link>) } 
                        </div>
            </nav>
            </div>
            </div>
        </>
    )
}

export default Navbar