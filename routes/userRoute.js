const { Router } = require("express");
const { userRegisterValidation } = require("../validation/userValidation");
const { validateRequest } = require("../middlewares/validators");
const { AdminRegistration, login, getAdminDetailById, editAdmin, changePassword } = require("../controller/user");
const authMiddleware = require("../middlewares/authMiddleware");

const router = Router();

router.post(
    "/admin-register", 
    userRegisterValidation,
    validateRequest,
    AdminRegistration
);

router.post(
    "/login", 
    login
);

router.get(
    "/:id",
    authMiddleware,
    getAdminDetailById,
);

router.patch(
    "/edit/:id",
    authMiddleware,
    editAdmin
);

router.put(
    "/changePassword",
    authMiddleware,
    changePassword
);

module.exports = router;
