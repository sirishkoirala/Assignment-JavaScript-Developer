import React, { useState } from "react";
import { toast } from "react-toastify";

const AddProperties = () => {
   const [formData, setFormData] = useState({
      name: "",
      address: "",
      price: "",
      description: "",
      status: "",
      image: null,
   });

   const handleChange = (e) => {
      const { id, value, files } = e.target;
      if (files) {
         setFormData((prevData) => ({ ...prevData, [id]: files[0] }));
      } else {
         setFormData((prevData) => ({ ...prevData, [id]: value }));
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      // checking all fields
      if (!formData.name || !formData.address || !formData.price || !formData.description || !formData.status) {
         alert("Please fill all required fields.");
         return;
      }

      try {
         const formDataToSend = new FormData();
         formDataToSend.append("name", formData.name);
         formDataToSend.append("address", formData.address);
         formDataToSend.append("price", formData.price);
         formDataToSend.append("description", formData.description);
         formDataToSend.append("status", formData.status);
         formDataToSend.append("image", formData.image);

         const response = await fetch("http://localhost:5000/api/properties", {
            method: "POST",
            headers: {
               token: localStorage.token,
            },
            body: formDataToSend,
         });

         if (response.ok) {
            const newProperty = await response.json();
            console.log("Property added successfully:", newProperty);
            window.location = "/dashboard";
            // Clear the form after adding data
            setFormData({
               name: "",
               address: "",
               price: "",
               description: "",
               status: "",
               image: null,
            });
         } else {
            const errorText = await response.text();
            console.error("Failed to add property:", errorText);
            alert(`Failed to add property: ${errorText}`);
         }
         toast.success("Property added Successfully !");
      } catch (error) {
         console.error("Error:", error);
         alert(`Error: ${error.message}`);
      }
   };

   return (
      <div className="m-8">
         <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <div className="grid gap-4">
               <div className="grid">
                  <label htmlFor="name" className="text-sm font-medium">
                     Name
                  </label>
                  <input
                     id="name"
                     className="border border-border rounded-lg px-3"
                     placeholder="Property Name"
                     value={formData.name}
                     onChange={handleChange}
                  />
               </div>
               <div className="grid gap-2">
                  <label htmlFor="address" className="text-sm font-medium">
                     Address
                  </label>
                  <input
                     id="address"
                     className="border border-border rounded-lg px-3"
                     placeholder="123 Main St"
                     value={formData.address}
                     onChange={handleChange}
                  />
               </div>
               <div className="grid grid-cols-2 gap-9 ">
                  <div className="grid gap-2">
                     <label htmlFor="price" className="text-sm font-medium ">
                        Price
                     </label>
                     <input
                        id="price"
                        type="number"
                        className="border border-border rounded-lg px-3"
                        placeholder="$999.99"
                        value={formData.price}
                        onChange={handleChange}
                     />
                  </div>
                  <div className="grid gap-2 ">
                     <label htmlFor="status" className="text-sm font-medium">
                        Status
                     </label>
                     <select
                        id="status"
                        className="border border-border rounded-lg px-3"
                        value={formData.status}
                        onChange={handleChange}
                     >
                        <option value="" disabled>
                           Select status
                        </option>
                        <option value="available">Available</option>
                        <option value="sold">Sold</option>
                     </select>
                  </div>
               </div>
            </div>
            <div className="flex flex-col gap-4 ">
               <div className="grid gap-2">
                  <label htmlFor="image" className="text-sm font-medium">
                     Upload Image
                  </label>
                  <input id="image" type="file" accept="image/jpeg,image/png,image/jpg" onChange={handleChange} />
               </div>
               <div className="grid gap-2">
                  <label htmlFor="description" className="text-sm font-medium">
                     Description
                  </label>
                  <textarea
                     id="description"
                     rows={3}
                     className="border border-border rounded-lg px-3 py-2"
                     placeholder="Describe your property..."
                     value={formData.description}
                     onChange={handleChange}
                  />
               </div>
               <button type="submit" className="w-full bg-black text-white p-3 rounded-lg hover:bg-black/80">
                  Save Property
               </button>
            </div>
         </form>
      </div>
   );
};

export default AddProperties;
