const { Router } = require("express");
const { incrementVisitor, getVisitorCount } = require("../controller/visitors");

const router = Router();

router.post("/increment", incrementVisitor);
router.get("/count", getVisitorCount);

module.exports = router;