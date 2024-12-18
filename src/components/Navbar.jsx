import React from 'react'
import UserButton from './UserButton'
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

function Navbar() {
    const userState = useSelector((state) => state.userReducer);

    return (
        <>
            <div className='bg-primary py-2'>
                <div className="container">
                    <nav className="navbar navbar-light">
                        <Link to={'/'} className="navbar-brand text-light fw-bold fs-2">
                            {/* <img src="/" width="30" height="30" className="d-inline-block align-top" alt="" /> */}
                            Sunrise Coupon

                        </Link>
                        <div>
                            {userState.loginStatus ? <UserButton /> : (<Link to={"/login"} className="btn btn-outline-light mb-1 px-3 ms-3">Login</Link>)}
                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default Navbar