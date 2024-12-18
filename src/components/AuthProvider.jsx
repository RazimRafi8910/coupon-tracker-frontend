import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function AuthProvider({ children, manager = false, coordinator = false, login=false}) {
    const navigate = useNavigate()
    const userState = useSelector((state) => state.userReducer)

    console.log(userState)
    useEffect(() => {

        if (userState.user == null) {
            return navigate('/login')
        }
    
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
    },[userState,navigate])
    
    return [children]
}

export default AuthProvider