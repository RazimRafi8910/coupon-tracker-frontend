import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar"
import UserHomePage from "./pages/UserHomePage"
import Login from "./pages/UserLogin"
import ManagerHomePage from "./pages/ManagerHomePage"
import CoordinatorHomePage from "./pages/CoordinatorHomePage"
import Students from "./pages/managerPages/Students"
import Coupons from "./pages/managerPages/Coupons"
import AuthProvider from './components/AuthProvider'
import StudentDetails from "./pages/managerPages/StudentDetails"
import Coordinator from "./pages/managerPages/Coordinator"
import CoordinatorDetail from "./pages/managerPages/CoordinatorDetail"
import CouponsPage from './pages/coordinatorPages/CouponsPage'
import CouponRegister from "./pages/managerPages/CouponRegister"

function App() {
  return (
    <>
      <div className="app" style={{ backgroundColor: '#f3f3f3' }}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={(<AuthProvider><UserHomePage /></AuthProvider>)} />
            <Route path="/login" element={(<Login />)} />
            <Route path="/manager" element={(<AuthProvider><ManagerHomePage /></AuthProvider>)} />
            <Route path="/manager/coupons" element={<Coupons />} />
            <Route path="/manager/students" element={<Students />} />
            <Route path="/manager/student/:studentid" element={<StudentDetails />} />
            <Route path="/manager/coordinator" element={<Coordinator />} />
            <Route path="/manager/coordinator/:coordinatorId" element={<CoordinatorDetail />} />
            <Route path="/manager/register" element={(<AuthProvider><CouponRegister/></AuthProvider>)} />
            <Route path="/coordinator" element={(<AuthProvider><CoordinatorHomePage /></AuthProvider>)} />
            <Route path="/coordinator/coupons" element={(<AuthProvider> <CouponsPage/> </AuthProvider>)} />
          </Routes>
          <ToastContainer />
        </Router>
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
