const express = require("express");
const reportController = require("../controllers/report");

const router = express.Router();

router.post("/", reportController.postReport);
router.get("/", reportController.getReport);

module.exports = router;
