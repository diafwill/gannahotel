const sendErrorDev = (err, req, res) => {
  // B) RENDERED WEBSITE
  console.error("ERROR 💥", err);
  return res.status(err.statusCode).render("error", {
    title: `Une erreur s'est produite!`,
    msg: err.message
  });
};

const sendErrorProd = (err, req, res) => {
  // B) RENDERED WEBSITE
  // A) Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).render("error", {
      title: `Une erreur s'est produite!`,
      msg: err.message
    });
  }
  // B) Programming or other unknown error: don't leak error details
  // 1) Log error
  console.error("ERROR 💥", err);
  // 2) Send generic message
  return res.status(err.statusCode).render("error", {
    title: `Une erreur s'est produite!`,
    msg: "Veuillez réessayer plus tard."
  });
};

module.exports = (err, req, res, next) => {
  // console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;

    sendErrorProd(error, req, res);
  }
};
