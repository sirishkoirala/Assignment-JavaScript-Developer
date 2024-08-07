const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');
const authRoutes = require("./routes/jwtAuth.js");
const dashboardRoutes = require("./routes/dashboard.js");
const propertyRoutes = require("./routes/propertyRoutes");

// middleware
app.use(express.json());
app.use(cors());
const uploadsPath = path.join('E:', 'Project/Assignment0/server/uploads');
app.use('/uploads', express.static(uploadsPath));


//ROUTERS
app.use("/api", authRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/api", propertyRoutes);

//SERVER RUNING
app.listen(5000, () => {
   console.log("server is running on port 5000");
   console.log(`Serving static files from ${uploadsPath}`);
})