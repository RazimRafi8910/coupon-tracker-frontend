import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"

function App() {
  return (
    <>
      <div className='app ' style={{backgroundColor:'#e4eaff'}}>
        <div>
          <Navbar/>
        </div>
        <div>
        <Outlet/>
        </div>
      </div>  
    </>
  )
}

export default App
