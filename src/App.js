import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginReg from "./components/Auth/LoginReg";
import ResetPassword from "./components/Auth/ResetPassword";
import SendPasswordResetEmail from "./components/Auth/SendPasswordResetEmail";
import Contact from "./components/pages/Contact";
import UserDashboard from "./components/User/UserDashboard";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Home from "./components/pages/Home";
import Layout from "./components/Layout";
import About from "./components/pages/About";
import BuynBid from "./components/pages/buybid";
import UserContextProvider from "./components/Context/Context";
import Navbar from "./components/Navbar";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="buybid" element={<BuynBid/>} />
            {/* <Route path="sell" element={<Sell />} /> */}
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<LoginReg />} />
            <Route path="sendpasswordresetemail" element={<SendPasswordResetEmail />} />
            <Route path="reset" element={<ResetPassword />} />
          </Route>
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
