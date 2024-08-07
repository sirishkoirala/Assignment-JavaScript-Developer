const pool = require("../db.js");

const getAllProperties = async (req, res) => {
   try {
      const properties = await pool.query("SELECT * FROM properties");

      res.json(properties.rows);
   } catch (err) {
      console.error(err.message);
      res.status(500).json("Server Error");
   }
};

const createProperty = async (req, res) => {
   try {
      const { filename } = req.file
      const { name, address, price, description, status, user_id } = req.body;
      const newProperty = await pool.query(
         `INSERT INTO properties (name, address, price, description, status, image, user_id) 
          VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
         [name, address, price, description, status, filename, user_id]
      );
      res.json(newProperty.rows[0]);
   } catch (err) {
      console.error(err.message);
      res.status(500).json("Server Error");
   }
};

const updateProperty = async (req, res) => {
   try {

      const { id } = req.params;
      const { name, address, price, description, status } = req.body;
      const filename = req.file ? req.file.filename : null;
      if (!name || !address || !price || !description || !status) {
         return res.status(400).json({ message: "All fields are required" });
      }

      const updatedProperty = await pool.query(
         `UPDATE properties 
          SET name = $1, address = $2, price = $3, description = $4, status = $5, image = $6, updatedAt = NOW() 
          WHERE id = $7 RETURNING *`,
         [name, address, price, description, status, filename, id]
      );
      if (updatedProperty.rows.length === 0) {
         return res.status(404).json("Property not found");
      }
      res.json(updatedProperty.rows[0]);
   } catch (err) {
      console.error(err.message);
      res.status(500).json("Server Error");
   }
};

const deleteProperty = async (req, res) => {
   try {
      const { id } = req.params;
      const deleteResponse = await pool.query("DELETE FROM properties WHERE id = $1 RETURNING *", [id]);
      if (deleteResponse.rows.length === 0) {
         return res.status(404).json("Property not found");
      }
      res.json(deleteResponse.rows[0]);
   } catch (err) {
      console.error(err.message);
      res.status(500).json("Server Error");
   }
};

module.exports = {
   getAllProperties,
   createProperty,
   updateProperty,
   deleteProperty,
};
