import React, { useState } from "react";
import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
   const [inputs, setInputs] = useState({
      email: "",
      password: "",
   });
   const { email, password } = inputs;
   const onChange = (e) => {
      setInputs({ ...inputs, [e.target.name]: e.target.value });
   };

   const onSubmit = async (e) => {
      e.preventDefault();
      try {
         const body = { email, password };
         const response = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
         });
         const parseRes = await response.json();

         if (parseRes.token) {
            // console.log(parseRes.token);
            localStorage.setItem("token", parseRes.token);
            setAuth(true);
            toast.success("Login Successfull !");
         } else {
            setAuth(false);
            toast.error(parseRes);
         }
      } catch (err) {
         console.error(err.message);
      }
   };

   return (
      <>
         <div className=" min-h-screen flex items-center justify-center ">
            <div className="p-8 rounded-lg md:shadow-xl w-full max-w-md">
               <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
               <form onSubmit={onSubmit}>
                  <div className="mb-4">
                     <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                        Email
                     </label>
                     <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        className="w-full p-3 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter your email"
                        required
                     />
                  </div>
                  <div className="mb-6">
                     <label htmlFor="password" className="block text-sm font-medium text-muted-foreground mb-2">
                        Password
                     </label>
                     <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        className="w-full p-3 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter your password"
                        required
                     />
                  </div>
                  <button type="submit" className="w-full bg-black text-white p-3 rounded-lg hover:bg-black/80">
                     Login
                  </button>
               </form>
               <p className="mt-4 text-center text-sm text-muted-foreground">
                  Don't have an account?&nbsp;
                  <a href="/register" className="text-primary hover:underline">
                     Register
                  </a>
               </p>
            </div>
         </div>
      </>
   );
};

export default Login;
