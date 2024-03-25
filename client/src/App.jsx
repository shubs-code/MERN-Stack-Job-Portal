import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div className=" min-h-screen w-full p-6">
      <ToastContainer position="bottom-right"/>
      <Navbar />
      <Outlet />
    </div>
  );
};
export default App;
