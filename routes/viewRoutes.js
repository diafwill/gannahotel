const express = require("express");
const viewsController = require("../controllers/viewsController");

const router = express.Router();

router.use(viewsController.alerts);

router.get("/", viewsController.getHome);
router.get("/nos-chambres", viewsController.getRooms);
router.get("/room/la-residence", viewsController.getRoomResidence);
router.get("/room/chambre-double-climatise", viewsController.getRoomDouble);
router.get("/room/la-suite", viewsController.getRoomSuite);
router.get("/notre-restaurant", viewsController.getRestaurant);
router.get("/galerie", viewsController.getGalerie);
router.get("/contact", viewsController.getContact);
router.post("/reservation", viewsController.postBooking);

// router.get(
//   '/products/:slug',
//   authController.isLoggedIn,
//   viewsController.getProduct
// );
// router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
// router.get('/me', authController.protect, viewsController.getAccount);

// router.get('/my-tours', authController.protect, viewsController.getMyTours);

// router.post(
//   '/submit-user-data',
//   authController.protect,
//   viewsController.updateUserData
// );

module.exports = router;
