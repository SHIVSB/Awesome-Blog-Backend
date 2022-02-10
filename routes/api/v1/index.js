const express = require("express");
var router = express.Router();
const authController = require("../../../src/utils/authentication");
const userController = require("../../../src/controllers/userController.js");
const PhotoMiddleware = require("../../../src/middlewares/photoUpload");
const postController = require("../../../src/controllers/postController");
const commentController = require("../../../src/controllers/commentController");
const emailController = require("../../../src/controllers/emailMessagingController");
const categoryController = require("../../../src/controllers/categoryController");

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.get("/getallusers",authController.authMiddleware,  userController.getallusers);
router.delete("/deleteuser/:id",authController.authMiddleware, userController.deleteuser);
router.get("/:id", userController.getuserbyid);
router.get("/profile/:id",authController.authMiddleware, userController.userProfile);
router.put("/:id", authController.authMiddleware, userController.updateProfile);
router.put("/updatePassword/:id",  authController.authMiddleware, userController.updatePassword);
router.post("/follow", authController.authMiddleware, userController.followUser);
router.post("/unfollowuser", authController.authMiddleware, userController.unfollowUser);
router.put("/block-user/:id", authController.authMiddleware, userController.blockUser);
router.put("/unblock-user/:id", authController.authMiddleware, userController.unblockUser);
router.post("/sendmail", authController.authMiddleware, userController.generateVerificationTokenController);
router.post("/verifyaccount", authController.authMiddleware, userController.accountVerificationController);
router.post("/forgotpassword", userController.forgotPasswordToken);
router.put("/resetpassword", userController.passwordReset);
router.put("/profilephotoupload",authController.authMiddleware, PhotoMiddleware.photoUpload.single("image") , PhotoMiddleware.profilePhotoSize,userController.profilePhotoUpload);
router.post("/posts", authController.authMiddleware, PhotoMiddleware.photoUpload.single("image"), PhotoMiddleware.postImgResize, postController.createPost)
router.post("/allposts", authController.authMiddleware, postController.fetchAllPosts);
router.post("/:id", authController.authMiddleware, postController.fetchPost);
router.put("/post/:id", authController.authMiddleware, postController.updatePost);
router.delete("/post/:id", authController.authMiddleware, postController.deletePost);
router.post("/post/like", authController.authMiddleware, postController.toggleAddLiketoPost);
router.post("/post/dislike", authController.authMiddleware, postController.toggleAddDisliketoPost);
router.post("/post/comment", authController.authMiddleware, commentController.createComment);
router.get("/post/getallcomment", authController.authMiddleware, commentController.fetchAllComments);
router.post("/post/singlecomment/:id", authController.authMiddleware, commentController.fetchComment);
router.put("/post/singlecomment/:id", authController.authMiddleware, commentController.updateComment);
router.delete("/post/singlecomment/:id", authController.authMiddleware, commentController.deleteComment);
router.post("/contactmail/send", authController.authMiddleware, emailController.sendEmailMsg);
router.post("/createcategory/new", authController.authMiddleware, categoryController.createCategory);
router.get("/categories/all", authController.authMiddleware, categoryController.fetchallcategories);
router.get("/category/:id", authController.authMiddleware, categoryController.fetchSingleCategory);
router.put("/updatecategory/:id", authController.authMiddleware, categoryController.updateCategory);
router.delete("/delete/category/:id", authController.authMiddleware, categoryController.deleteCategory);

module.exports = router;