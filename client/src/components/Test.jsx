// import React from 'react'

// const Test = () => {
//   return (
//      <div className="m-8">
//         <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
//            <div className="grid gap-4">
//               <div className="grid">
//                  <label htmlFor="name" className="text-sm font-medium">
//                     Name
//                  </label>
//                  <input
//                     id="name"
//                     className="border border-border rounded-lg px-3"
//                     placeholder="Product Name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                  />
//               </div>
//               <div className="grid gap-2">
//                  <label htmlFor="address" className="text-sm font-medium">
//                     Address
//                  </label>
//                  <input
//                     id="address"
//                     className="border border-border rounded-lg px-3"
//                     placeholder="123 Main St"
//                     onChange={(e) => setAddress(e.target.value)}
//                  />
//               </div>
//               <div className="grid grid-cols-2 gap-9 ">
//                  <div className="grid gap-2">
//                     <label htmlFor="price" className="text-sm font-medium ">
//                        Price
//                     </label>
//                     <input
//                        id="price"
//                        type="number"
//                        className="border border-border rounded-lg px-3"
//                        placeholder="$99.99"
//                        value={price}
//                        onChange={(e) => setPrice(e.target.value)}
//                     />
//                  </div>
//                  <div className="grid gap-2 ">
//                     <label htmlFor="status" className="text-sm font-medium">
//                        Status
//                     </label>
//                     <select
//                        id="status"
//                        className="border border-border rounded-lg px-3"
//                        value={status}
//                        onChange={(e) => setStatus(e.target.value)}
//                     >
//                        <option value="" disabled selected>
//                           Select status
//                        </option>
//                        <option value="available">Available</option>
//                        <option value="sold">Sold</option>
//                        <option value="preorder">Pre-Order</option>
//                     </select>
//                  </div>
//               </div>
//            </div>

//            <div className="flex flex-col gap-4 ">
//               <div className="grid gap-2">
//                  <label htmlFor="image-upload" className="text-sm font-medium">
//                     Upload Image
//                  </label>
//                  <input
//                     id="image-upload"
//                     type="file"
//                     value={image}
//                     onChange={(e) => setImage(e.target.value)}
//                  />
//               </div>
//               <div className="grid gap-2">
//                  <label htmlFor="description" className="text-sm font-medium">
//                     Description
//                  </label>
//                  <textarea
//                     id="description"
//                     rows={3}
//                     className="border border-border rounded-lg px-3 py-2"
//                     placeholder="Describe your product..."
//                     value={description}
//                     onChange={(e) => setDescription(e.target.value)}
//                  />
//               </div>
//               <button type="submit" className="w-full bg-black text-white p-3 rounded-lg hover:bg-black/80">
//                  Save Product
//               </button>
//            </div>
//         </form>
//      </div>
//   );
// }

// export default Test