import React from "react";
import EditProperty from "./EditProperty";
const PropertyItem = ({ property, onDelete }) => {
   return (
      <div className="bg-card p-4 rounded-lg shadow-md">
         <img
            alt={property.image}
            src={`http://localhost:5000/uploads/${property.image}`}
            className="h-48 w-auto object-cover mx-auto"
         />
         <h3 className="text-lg font-semibold mt-2">{property.name}</h3>
         <div className="flex gap-4">
            <p className="text-slate-500 text-sm">${property.price}</p>
            <h3 className="text-xs font-semibold mt-">{property.address}</h3>
         </div>
         <p className="text-muted-foreground">{property.description}</p>
         <div className="flex justify-between items-center gap-4 mt-3">
            <span className="bg-orange-200 py-2 rounded-lg w-full hover:bg-orange/80 flex items-center justify-center">
               <EditProperty property={property} />
            </span>
            <button
               className="bg-red-200 py-2 rounded-lg w-full hover:bg-orange/80"
               onClick={() => onDelete(property.id)}
            >
               Delete
            </button>
         </div>
      </div>
   );
};

export default PropertyItem;
