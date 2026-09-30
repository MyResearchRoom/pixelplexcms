const { User } = require('../models');
const bcrypt = require("bcryptjs");
const { Op } = require('sequelize');
const jwt = require("jsonwebtoken")


    exports.AdminRegistration = async (req, res) => {
    try {
        const { name, email, mobileNumber, password } = req.body;

        if (!name || !email || !password || !mobileNumber) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email alrady registered"
            })
        }

        const existingUserWithMobile = await User.findOne({ where: { mobileNumber } });
        if (existingUserWithMobile) {
            return res.status(400).json({
                success: false,
                message: "Mobile number already registered"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            mobileNumber,
            password: hashedPassword,
        });

        if (!user) {
            return errorResponse(res, "Admin not created", 400);
        }

        const userData = user.toJSON();
        delete userData.password;

        return res.status(201).json({
            success: true,
            message: "Admin created successfully",
            data: userData
        });
        } catch (error) {            
            return res.status(500).json({
                success: false,
                message: "Failed to register admin"
            });
        }
    };

    exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password ) {
            return res.status(400).json({
                success: false,
                message: "Please provide email and password"
            });
        }
        const user = await User.findOne({
            where: { email },
            attributes: {
                include: ["password"]
            }
        });    

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // if (user.isBlock) {
        //     return errorResponse(res,
        //     "Your account has been blocked, Please Contact to admin.",
        //     400
        //     );
        // }

        const ismatch = await bcrypt.compare(password, user.password);
        if (!ismatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
                {
                    id: user.id,
                    email: user.email,
                    mobileNumber: user.mobileNumber,
                },
                process.env.JWT_SECRET,
                { expiresIn: "7d" }
        );

        return res.status(200).json({
                success: true,
                message: "Login Successfull",
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    token
                }
        });   

    }catch (err) {
        console.log(err);
        
        return res.status(500).json({
                success: false,
                message: "Failed to login"
        })
    }
    };  

    exports.getAdminDetailById = async(req, res) => {
        try {
            const { id } = req.params;

            const user = await User.findOne({
                where: {
                    id,
                },
            });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            return res.status(200).json({
                success: true,
                message: "Admin details fetched successfully",
                data: user
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Failed to get admin details"
            })
        }
    };

    exports.editAdmin = async(req, res) => {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json(
                    { success: false, message: "Id is required" }
                );
            }
            const { name, email, mobileNumber } = req.body;

            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            const existingUser = await User.findOne({
                where: {
                    email,
                    id: {[Op.ne]: id,},
                },
            });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: "Email alrady registered"
                })
            }

            const existingUserWithMobile = await User.findOne({ where: { 
                mobileNumber,
                id: {[Op.ne]: id,}, 
            }});
            if (existingUserWithMobile) {
                return res.status(400).json({
                    success: false,
                    message: "Mobile number already registered"
                })
            }

            user.name = name || user.name;
            user.email = email || user.email;
            user.mobileNumber = mobileNumber || user.mobileNumber;
            
            await user.save();

            return res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    mobileNumber: user.mobileNumber,
                    
                },
            });
        } catch (error) {
            console.log(error);

            return res.status(500).json({
                success: false,
                message: "Failed to update admin",
            });
        }
    };

    exports.changePassword = async(req, res) => {
        try {
            const userId = req.user?.id; 
            if (!userId) {
                return res.status(400).json({ success: false, message: "Id is required" });
            }
            const { newPassword, oldPassword } = req.body;

            if (!newPassword || !oldPassword) {
                return res.status(400).json({
                    success: false,
                    message: "Please provide both New Password and Old Password"
                });
            }

            const user = await User.scope(null).findByPk(userId); 

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            const isMatch = await bcrypt.compare(oldPassword, user.password);

            if (!isMatch) {
                return res.status(400).json({
                    success: false,
                    message: "Old password is incorrect"
                });
            }

            if (oldPassword === newPassword) {
                return res.status(400).json({
                    success: false,
                    message: "New password must be different from old one"
                });
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);

            user.password = hashedPassword;
            await user.save();

            return res.status(200).json({
                success: true,
                message: "Password changed successfully."
            })

        } catch (error) {
            console.log(error);          
            return res.status(500).json({
                success: false,
                message: "Failed to change password "
            });
        }
    };
