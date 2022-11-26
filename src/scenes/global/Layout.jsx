import { Outlet } from "react-router-dom";
// import Navbar from "./Navbar"
// import Sidebar from "./Sidebar"
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = () => {
  return (
    <div className="app">
        <div className="siebar__wrapper">
        <Sidebar/>
        </div>
        <main className='content'>
        <Topbar/>
            <Outlet/>
        </main>
    </div>   
  )
}

export default Layout