const express = require("express");
const router = express.Router();

const userRoutes=require("./userRoute");
const visitorRoutes = require("./visitorRoute");
const enquiriesRoutes = require("./enquiries");


router.use("/test", (req, res) => res.send("<h1>This is a test API for pixel plex backend started on 29-09-2026</h1>"));
router.use("/api/user", userRoutes);
router.use("/api/visitor", visitorRoutes);

router.use("/api/enquiries", enquiriesRoutes);



module.exports = router;