const {createUser,getAllUsers,modifyUser,getUserById,loginUser} = require("./user.controller");
const router = require("express").Router();
const { checkToken } = require("../TokenValidation/TokenValidation");

router.post("/add-new", createUser);
router.post("/get-all",checkToken, getAllUsers);
router.put("/modify",checkToken, modifyUser);
router.post("/get/:id",checkToken, getUserById);
router.post("/login", loginUser);

module.exports=router