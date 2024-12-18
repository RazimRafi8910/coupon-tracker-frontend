import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import UserHomePage from "./pages/UserHomePage"
import Login from "./pages/UserLogin"
import ManagerHomePage from "./pages/ManagerHomePage"
import CoordinatorHomePage from "./pages/CoordinatorHomePage"
import Students from "./pages/managerPages/Students"
import Coupons from "./pages/managerPages/Coupons"
import AuthProvider from './components/AuthProvider'
import { useSelector, useDispatch } from "react-redux"
import { userLogin, userLogout } from "./slice/userSlice"
import { useEffect } from "react"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import StudentDetails from "./pages/managerPages/StudentDetails"

function App() {
  const dispatch = useDispatch()
  const userState = useSelector((state) => state.userReducer)
  useEffect(() => {
    // async function getUser() {
    //   try {
    //     const response = await fetch(`http://localhost:3001/get-user`, {
    //       method: "GET",
    //       headers: {
    //         'Content-type': 'application/json'
    //       },
    //       credentials: 'include'
    //     });
    //     const result = await response.json()
    //     if (result.success) {
    //       dispatch(userLogin(result.responseUser));
    //     } else {
    //       dispatch(userLogout());
    //     }
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    // if (userState.user == null) {
    //   getUser()
    // }
    // console.log(userState)
    
      // const username = localStorage.getItem('username');
      // if (username) {
      //   const user = {
      //     username,
      //     role: localStorage.getItem('role')
      //   }
      //   dispatch(userLogin(user));
      // }
    
    console.log(userState)
  }, [])
  return (
    <>
      <div className="app" style={{ backgroundColor: '#dfdfdf' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={(<AuthProvider><UserHomePage /></AuthProvider>)} />
          <Route path="/login" element={(<Login />)} />
          <Route path="/manager" element={(<AuthProvider><ManagerHomePage /></AuthProvider>)} />
          <Route path="/manager/coupons" element={<Coupons />} />
          <Route path="/manager/students" element={<Students />} />
          <Route path="/manager/student/:studentid" element={<StudentDetails />} />
          <Route path="/coordinator" element={(<AuthProvider><CoordinatorHomePage /></AuthProvider>)} />
        </Routes>
        <ToastContainer />
      </div>
      {/* <div className='app ' style={{backgroundColor:'#e4eaff'}}>
        <div>
          <Navbar/>
        </div>
        <div>
        <Outlet/>
        </div>
      </div>   */}
    </>
  )
}

export default App
