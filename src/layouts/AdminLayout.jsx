import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Footer from "../components/Footer.jsx";

export default function AdminLayout({children}) {
    return (
       <>
       <Header></Header>
       <div className="flex">
           <Sidebar/>
           <div className="w-full p-2">
               {children}
           </div>
       </div>
       <Footer></Footer>
       </>
    )
}