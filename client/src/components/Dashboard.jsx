import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PropertyItem from "./PropertyItems";
import AddProperties from "./AddProperties";

const Dashboard = ({ setAuth }) => {
   const [name, setName] = useState("");
   const [properties, setProperties] = useState([]);
   const [isVisible, setIsVisible] = useState(false);
   const [filter, setFilter] = useState("All Properties");
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const [searchTerm, setSearchTerm] = useState("");

   async function getName() {
      try {
         const response = await fetch("http://localhost:5000/dashboard", {
            method: "GET",
            headers: { token: localStorage.token },
         });

         const parseRes = await response.json();

         setName(parseRes.user_name);
      } catch (err) {
         console.error(err.message);
      }
   }

   const fetchProperties = async () => {
      try {
         const response = await fetch("http://localhost:5000/api/properties", {
            method: "GET",
            headers: { token: localStorage.token },
         });
         const data = await response.json();
         setProperties(data);
      } catch (error) {
         console.error("Error fetching properties:", error);
      }
   };

   const deleteProperty = async (id) => {
      try {
         const response = await fetch(`http://localhost:5000/api/properties/${id}`, {
            method: "DELETE",
            headers: {
               "Content-Type": "application/json",
               token: localStorage.token,
            },
         });
         if (response.ok) {
            setProperties(properties.filter((property) => property.id !== id));
         } else {
            console.error("Failed to delete property");
         }
         toast.error("Deleted Successfully !");
      } catch (err) {
         console.error("Server Error", err);
      }
   };

   useEffect(() => {
      getName();
      fetchProperties();
   }, []);

   const logout = (e) => {
      e.preventDefault();
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logged out Successfully !");
   };

   const handleClick = () => {
      setIsVisible(!isVisible);
   };

   const handleFilterChange = (newFilter) => {
      setFilter(newFilter);
      setIsDropdownOpen(false);
   };

   const filteredProperties = properties
      .filter((property) => {
         if (filter === "All Properties") return true;
         if (filter === "Available") return property.status === "available";
         if (filter === "Sold") return property.status === "sold";
         return true;
      })
      .filter(
         (property) =>
            property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            property.address.toLowerCase().includes(searchTerm.toLowerCase())
      );

   const handleToggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
   };

   const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
   };

   return (
      <>
         <nav className="bg-background text-foreground p-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold mb-4">Welcome {name}</h1>
            <button className="font-bold text border-2 border-black rounded-lg px-3 py-1.5" onClick={(e) => logout(e)}>
               Logout
            </button>
         </nav>

         <div className="flex items-center justify-between p-6 bg-card border-b relative z-20 border-border">
            <h2 className="text-xl font-bold text-foreground">Properties</h2>
            <div className="flex items-center space-x-2">
               <form className="flex">
                  <input
                     type="text"
                     className="p-2 border border-border rounded-md focus:outline-none text-sm font-medium"
                     placeholder="Search Properties"
                     value={searchTerm}
                     onChange={handleSearchChange}
                  />
                  <button
                     type="button"
                     className="p-2 border border-border rounded-md focus:outline-none text-sm font-medium"
                  >
                     Search
                  </button>
               </form>
               <button
                  className="p-2 border border-border rounded-md focus:outline-none text-sm font-medium"
                  onClick={handleClick}
               >
                  {!isVisible ? "Add Properties" : "Cancel Adding"}
               </button>
               <div className="relative inline-block text-left">
                  <button
                     type="button"
                     className="inline-flex justify-between w-full rounded-md border border-border px-4 py-2 text-sm font-medium"
                     aria-haspopup="true"
                     aria-expanded={isDropdownOpen}
                     onClick={handleToggleDropdown}
                  >
                     Filter by
                     <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                     >
                        <path
                           fillRule="evenodd"
                           d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                           clipRule="evenodd"
                        />
                     </svg>
                  </button>

                  {isDropdownOpen && (
                     <div className="absolute z-30 right-0  mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1" role="none">
                           <a
                              href="#"
                              className="block px-4 py-2 text-sm"
                              onClick={() => handleFilterChange("All Properties")}
                           >
                              All Properties
                           </a>
                           <a
                              href="#"
                              className="block px-4 py-2 text-sm"
                              onClick={() => handleFilterChange("Available")}
                           >
                              Available
                           </a>
                           <a href="#" className="block px-4 py-2 text-sm" onClick={() => handleFilterChange("Sold")}>
                              Sold
                           </a>
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
         {isVisible && <AddProperties />}
         <div className="w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {filteredProperties.length === 0 ? (
               <p>No properties available.</p>
            ) : (
               filteredProperties.map((property) => (
                  <PropertyItem key={property.id} property={property} onDelete={deleteProperty} />
               ))
            )}
         </div>
      </>
   );
};

export default Dashboard;
