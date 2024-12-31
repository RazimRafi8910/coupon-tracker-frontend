import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { userLogin } from "../slice/userSlice"

function AuthProvider({ children, manager = false, coordinator = false, login = false }) {
    const navigate = useNavigate()
    const userState = useSelector((state) => state.userReducer)
    const dispatch = useDispatch()

    useEffect(() => {
        
        const username = localStorage.getItem('username')
        if (!userState.loginStatus) {
            if (username) {
                const user = {
                    username,
                    role: localStorage.getItem('role')
                }
                dispatch(userLogin(user))
            }
        }

        if (!username) {
            return navigate('/login')
        }

        // if (userState.user == null) {
        //     return navigate('/login')
        // }

        if (manager && userState.user?.role != 1) {
            return navigate('/');
        }

        if (coordinator && userState.user?.role != 2) {
            return navigate('/');
        }

        // if (userState.user !== null && login) {
        //     navigate(-1);
        //     return
        // }
    }, [navigate])

    return [children]
}

export default AuthProvider