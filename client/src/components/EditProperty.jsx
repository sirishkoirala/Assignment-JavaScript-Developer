import React, { useState } from "react";
import { toast } from "react-toastify";

const EditProperty = ({ property }) => {
   const [isOpen, setIsOpen] = useState(false);

   const [name, setName] = useState(property.name);
   const [address, setAddress] = useState(property.address);
   const [price, setPrice] = useState(property.price);
   const [description, setDescription] = useState(property.description);
   const [status, setStatus] = useState(property.status);
   const [image, setImage] = useState(null);

   const handleImageChange = (e) => {
      setImage(e.target.files[0]);
   };

   const updateProperty = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append("name", name);
      formData.append("address", address);
      formData.append("price", price);
      formData.append("description", description);
      formData.append("status", status);
      if (image) {
         formData.append("image", image);
      }

      try {
         const response = await fetch(`http://localhost:5000/api/properties/${property.id}`, {
            method: "PUT",
            headers: {
               token: localStorage.token,
            },
            body: formData,
         });

         if (response.ok) {
            window.location = "/";
         } else {
            const errorText = await response.text();
            console.error("Failed to update property:", errorText);
            alert(`Failed to update property: ${errorText}`);
         }
         toast.success("Property edited Sucessfully !");
      } catch (err) {
         console.error("Error:", err);
         alert(`Error: ${err.message}`);
      }
   };

   const resetInput = () => {
      setName(property.name);
      setAddress(property.address);
      setPrice(property.price);
      setDescription(property.description);
      setStatus(property.status);
      setImage(null);
      setIsOpen(false);
   };

   return (
      <>
         <button type="button" onClick={() => setIsOpen(true)}>
            Edit
         </button>

         {isOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto text-black">
               <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                  <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                     <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                  </div>

                  <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                     &#8203;
                  </span>

                  <div
                     className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                     role="dialog"
                     aria-modal="true"
                     aria-labelledby="exampleModalLabel"
                  >
                     <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                           <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                              <h3 className="text-lg leading-6 font-medium text-gray-900" id="exampleModalLabel">
                                 Edit Property
                              </h3>
                              <div className="mt-2">
                                 {/* entry */}
                                 <div className="grid gap-4">
                                    <div className="grid">
                                       <label htmlFor="name" className="text-sm font-medium">
                                          Name
                                       </label>
                                       <input
                                          id="name"
                                          className="border border-border rounded-lg px-3"
                                          placeholder="Product Name"
                                          value={name}
                                          onChange={(e) => setName(e.target.value)}
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
                                          value={address}
                                          onChange={(e) => setAddress(e.target.value)}
                                       />
                                    </div>
                                    <div className="grid grid-cols-2 gap-9">
                                       <div className="grid gap-2">
                                          <label htmlFor="price" className="text-sm font-medium">
                                             Price
                                          </label>
                                          <input
                                             id="price"
                                             type="number"
                                             className="border border-border rounded-lg px-3"
                                             placeholder="$99.99"
                                             value={price}
                                             onChange={(e) => setPrice(e.target.value)}
                                          />
                                       </div>
                                       <div className="grid gap-2">
                                          <label htmlFor="status" className="text-sm font-medium">
                                             Status
                                          </label>
                                          <select
                                             id="status"
                                             className="border border-border rounded-lg px-3"
                                             value={status}
                                             onChange={(e) => setStatus(e.target.value)}
                                          >
                                             <option value="" disabled>
                                                Select status
                                             </option>
                                             <option value="available">Available</option>
                                             <option value="sold">Sold</option>
                                          </select>
                                       </div>
                                    </div>

                                    {/* image input */}
                                    <div className="grid gap-2">
                                       <label htmlFor="image-upload" className="text-sm font-medium">
                                          Upload Image
                                       </label>
                                       <input
                                          id="image"
                                          type="file"
                                          accept="image/jpeg,image/png,image/jpg"
                                          onChange={handleImageChange}
                                       />
                                    </div>

                                    <div className="grid gap-2">
                                       <label htmlFor="description" className="text-sm font-medium">
                                          Description
                                       </label>
                                       <textarea
                                          id="description"
                                          rows={3}
                                          className="border border-border rounded-lg px-3 py-2"
                                          placeholder="Describe your product..."
                                          value={description}
                                          onChange={(e) => setDescription(e.target.value)}
                                       />
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                           type="button"
                           className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                           onClick={updateProperty}
                        >
                           Save
                        </button>
                        <button
                           type="button"
                           className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm"
                           onClick={resetInput}
                        >
                           Cancel
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

export default EditProperty;
