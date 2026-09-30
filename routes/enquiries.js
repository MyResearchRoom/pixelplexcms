"use strict";
const { Router } = require("express");
const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

const { addEnquiry, getAllEnquiries, deleteEnquiry } = require("../controller/enquiries");

const router = Router();

router.post(
    "/add-enquiries",
    addEnquiry
);

router.get(
    "/getAllEnquiries", 
    authMiddleware,
    getAllEnquiries
);

router.delete(
  "/enquiries/:id",
  authMiddleware,
  deleteEnquiry
);

module.exports = router;