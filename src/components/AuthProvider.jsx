import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import Loader from "./Loader"

function AuthProvider({ children, manager = false }) {
    const navigate = useNavigate()
    const userState = useSelector((state) => state.userReducer)

    
    
    useEffect(() => {
        if (manager == true) {
            if (userState.user.role.includes("manager")) {
                navigate('/manager')
            } else {
                navigate('/')
            }
        }
        if (userState.loginStatus) {
            navigate('/')
        } else {
            navigate('/user/login')
        }
    },[userState,navigate])
    
    return [children]
}

export default AuthProvider