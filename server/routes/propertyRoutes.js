const router = require("express").Router();
const { getAllProperties, createProperty, updateProperty, deleteProperty } = require("../controllers/propertyController");
const authorization = require("../middleware/authorization");
const upload = require("../middleware/multer.js");


router.get("/properties", authorization, getAllProperties);
router.post("/properties", authorization, upload.single('image'), createProperty);
router.put("/properties/:id", authorization, upload.single('image'), updateProperty);
router.delete("/properties/:id", authorization, deleteProperty);

module.exports = router;
