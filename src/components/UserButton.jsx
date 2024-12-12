import React from 'react'
import { useSelector } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown"
import { Link } from 'react-router-dom';

function UserButton() {
    const userState = useSelector((state) => state.userReducer);
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
          <Dropdown.Item className="text-danger fw-bold">
            LogOut{" "}
            </Dropdown.Item>
            {userState.user?.role.includes('coordinator') &&
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