"use strict";

const { Enquiry } = require("../models");

exports.addEnquiry = async (req, res) => {
  try {
    const {
      name,
      companyName,
      email,
      phoneNumber,
      industry,
      projectType,
      displayRequirement,
      location,
      estimatedBudget,
      message,
    } = req.body;


    if (
      !name ||
      !email ||
      !phoneNumber ||
      !industry ||
      !projectType ||
      !displayRequirement ||
      !location
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required enquiry fields",
      });
    }

    const enquiry = await Enquiry.create({
      name: name.trim(),
      companyName: companyName?.trim() || null,
      email: email.trim(),
      phoneNumber: phoneNumber.trim(),
      industry: industry.trim(),
      projectType: projectType.trim(),
      displayRequirement: displayRequirement.trim(),
      location: location.trim(),
      estimatedBudget: estimatedBudget?.trim() || null,
      message: message?.trim() || null,
    });

    return res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully",
      data: enquiry,
    });
  } catch (error) {
    console.error("Add enquiry error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit enquiry",
      error: error.message,
    });
  }
};

exports.getAllEnquiries = async (req, res) => {
  try {
    const{page:pageValue,limit:limitValue} = req.query;
    const page = Math.max(parseInt(pageValue, 10) || 1, 1);

    const limit = Math.max(
      parseInt(limitValue, 10) || 10,
      1
    );

    const offset = (page - 1) * limit;

    const { count, rows: enquiries } =
      await Enquiry.findAndCountAll({
        order: [["createdAt", "DESC"]],
        limit,
        offset,
      });

    const totalPages = Math.ceil(count / limit);

    return res.status(200).json({
      success: true,
      message: "Enquiries fetched successfully",
      data: enquiries,
      pagination: {
        currentPage: page,
        limit,
        totalRecords: count,
        totalPages,
      },
    });
  } catch (error) {
    console.error("Get enquiries error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch enquiries",
      error: error.message,
    });
  }
};

exports.deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Enquiry ID is required",
      });
    }

    const enquiry = await Enquiry.findByPk(id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found",
      });
    }

    await enquiry.destroy();

    return res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully",
    });
  } catch (error) {
    console.error("Delete enquiry error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete enquiry",
    });
  }
};