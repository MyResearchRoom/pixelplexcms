const {Visitor}= require("../models");

exports.incrementVisitor = async (req, res) => {
  try {
    let visitor = await Visitor.findByPk(1);

    if (!visitor) {
      visitor = await Visitor.create({
        id: 1,
        count: 1,
      });
    } else {
      visitor.count += 1;
      await visitor.save();
    }

    res.status(200).json({
      success: true,
      count: visitor.count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getVisitorCount = async (req, res) => {
  try {
    const visitor = await Visitor.findByPk(1);

    if (!visitor) {
      return res.status(200).json({
        success: true,
        count: 0,
      });
    }

    res.status(200).json({
      success: true,
      count: visitor.count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};