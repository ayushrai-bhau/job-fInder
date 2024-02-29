const express = require("express");
const router = express.Router();
const  controller =require("../controllers/jobcontrollers")


const verifyToken = require("../middleware/verifyMiddleware");

router.post("/create", verifyToken,controller.createJobDetail )

router.get("/detail/:jobId", controller.getJobDetailsById );

router.get("/all-jobs", controller.getAllJobDetails);

router.put("/edit/:jobId", verifyToken,controller.editJobDetailByID );

module.exports = router;
