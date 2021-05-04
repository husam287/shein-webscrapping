module.exports = (error, req, res, next) => {
    console.log(error);
    const { statusCode, errorCode, data } = error;
    res.status(statusCode || 500).json({ errorCode: errorCode || "SERVER_ERROR", data });
};
