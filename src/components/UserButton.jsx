import React, { useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown"
import { userLogout } from '../slice/userSlice';
import { Link,useNavigate } from 'react-router-dom';
import { getBackendURL } from '../utils/backendAPI';

const API = getBackendURL()

function UserButton() {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const userState = useSelector((state) => state.userReducer);
  const handleLogout = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${API}/logout`, {
        method: 'GET',
        headers: {
          'Content-type':'application/json'
        },
        credentials:'include'
      })
      const result = await response.json()
      if (result.success) {
        dispatch(userLogout())
        localStorage.clear()
        navigate('/login');
      } else {
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }
  return (
    <>
      <div>
        <Dropdown>
          {/* <span
          className={`position-absolute ms-2 top-50 start-25 translate-middle p-1 ${onlineStatus
              ? "bg-success border-success"
              : "bg-danger border-danger"
            } border rounded-circle`}
        >
          <span className="visually-hidden">New alerts</span>
          </span> */}
          <Dropdown.Toggle
            className={"py-1 border border-light"}
            data-bs-theme="dark"
            id="dropdown-basic"
          >
            {userState.user.username}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {isLoading ? 
              <Dropdown.Item onClick={handleLogout} className="text-light fw-bold">
              loading
              </Dropdown.Item>
              :
              <Dropdown.Item onClick={handleLogout} className="text-danger fw-bold">
              LogOut{" "}
            </Dropdown.Item>
            }
            
            {userState.user?.role == 2 &&
              <Dropdown.Item className="text-danger fw-bold">
                <Link to={'/coordinator'}>Coordinator</Link>
              </Dropdown.Item>
            }
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  )
}

export default UserButton