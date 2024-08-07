import React, { useState } from "react";
import { toast } from "react-toastify";

const Register = ({ setAuth }) => {
   const [inputs, setInputs] = useState({
      name: "",
      email: "",
      password: "",
   });

   const { name, email, password } = inputs;

   const onChange = (e) => {
      setInputs({ ...inputs, [e.target.name]: e.target.value });
   };

   const onSubmit = async (e) => {
      e.preventDefault();
      try {
         const body = { name, email, password };
         const response = await fetch("http://localhost:5000/api/register", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
         });

         const parseRes = await response.json();

         if (parseRes.token) {
            localStorage.setItem("token", parseRes.token);
            setAuth(true);
            toast.success("Registration Successful !");
         } else {
            setAuth(false);
            toast.error(parseRes);
         }
      } catch (err) {
         console.error(err.message);
      }
      console.log(inputs);
   };

   return (
      <>
         <div className="min-h-screen flex items-center justify-center">
            <div className="p-8 rounded-lg md:shadow-xl w-full max-w-md">
               <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
               <form onSubmit={onSubmit}>
                  <div className="mb-4">
                     <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                        Name
                     </label>
                     <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={onChange}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter your name"
                        required
                     />
                  </div>
                  <div className="mb-4">
                     <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                        Email
                     </label>
                     <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={onChange}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter your email"
                        required
                     />
                  </div>
                  <div className="mb-6">
                     <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
                        Password
                     </label>
                     <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={onChange}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Enter your password"
                        required
                     />
                  </div>

                  <button
                     type="submit"
                     className="w-full bg-black text-white py-2 rounded-md hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black"
                  >
                     Register
                  </button>
               </form>
               <p className="mt-4 text-center text-sm text-muted-foreground">
                  Already have an account?&nbsp;
                  <a href="/" className="text-primary hover:underline">
                     Login
                  </a>
               </p>
            </div>
         </div>
      </>
   );
};

export default Register;
