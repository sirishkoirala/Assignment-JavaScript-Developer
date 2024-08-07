import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Test from "./components/Test";
import "./App.css";


const App = () => {
   const [isAuthenticated, setIsAuthenticated] = useState(false);

   const setAuth = (boolean) => {
      setIsAuthenticated(boolean);
   };

   async function isAuth() {
      try {
         const response = await fetch("http://localhost:5000/auth/isVerify", {
            method: "GET",
            headers: { token: localStorage.token },
         });
         const parseRes = await response.json();
         // console.log(parseRes);

         parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
      } catch (err) {
         console.error(err.message);
      }
   }

   useEffect(() => {
      isAuth();
   }, []);

   return (
      <>
         <Router>
            <Routes>
               <Route path="/" element={<Navigate to="/login" />} />
               <Route
                  path="/login"
                  index
                  element={
                     !isAuthenticated ? (
                        <Login setIsAuthenticated={setIsAuthenticated} setAuth={setAuth} />
                     ) : (
                        <Navigate to="/dashboard" />
                     )
                  }
               />
               <Route
                  path="/register"
                  element={!isAuthenticated ? <Register setAuth={setAuth} /> : <Navigate to="/dashboard" />}
               />
               <Route
                  path="/dashboard"
                  element={isAuthenticated ? <Dashboard setAuth={setAuth} /> : <Navigate to="/login" />}
               />
               
            </Routes>
         </Router>
         {/* <Test/> */}
         <ToastContainer />
      </>
   );
};

export default App;
