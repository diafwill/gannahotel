const catchAsync = require("../utils/catchAsync");
// const AppError = require('../utils/appError');
const Email = require("../utils/email");

exports.alerts = (req, res, next) => {
  const { alert } = req.query;
  if (alert) res.locals.alert = alert;
  // if (alert)
  //   res.locals.alert = {
  //     type: 'success',
  //     message: 'Testing for success alert'
  //   };
  /*
  TODO

  */
  // if (alert === 'booking')
  //   res.locals.alert =
  //     "Your booking was successful! Please check your email for a confirmation. If your booking doesn't show up here immediatly, please come back later.";
  next();
};

exports.getHome = catchAsync(async (req, res, next) => {
  res.status(200).render("home", {
    title: "Accueil"
  });
});

exports.getRooms = catchAsync(async (req, res, next) => {
  res.status(200).render("rooms/index", {
    title: "Nos chambres"
  });
});

exports.getRoomResidence = catchAsync(async (req, res, next) => {
  res.status(200).render("rooms/residence", {
    title: "La résidence"
  });
});

exports.getRoomDouble = catchAsync(async (req, res, next) => {
  res.status(200).render("rooms/double", {
    title: "Double climatisée"
  });
});

exports.getRoomSuite = catchAsync(async (req, res, next) => {
  res.status(200).render("rooms/suite", {
    title: "La suite"
  });
});

exports.getRestaurant = catchAsync(async (req, res, next) => {
  res.status(200).render("restaurant", {
    title: "Notre restaurant"
  });
});

exports.getGalerie = catchAsync(async (req, res, next) => {
  res.status(200).render("galerie", {
    title: "Notre galerie"
  });
});

exports.getContact = catchAsync(async (req, res, next) => {
  res.status(200).render("contact", {
    title: "Notre galerie"
  });
});

exports.postBooking = catchAsync(async (req, res, next) => {
  const { user } = req.body;
  const adminEmail = "dazomahou22@gmail.com";
  // console.log(user);

  await new Email(user, adminEmail).sendBooking();
  await new Email(user, user.email).sendClientBooking();
  res.status(200).json({
    status: "success",
    message: `Votre réservation a bien été enregistrée.`
  });
});
