const  getRandomInt = require("../services/randomNumber");

const randomNumberController = (req, res) => {
    const {start, end} = req.query;
    if (start && end) {
        const randomNumber = getRandomInt(start, end);
        res.status(200).json({
            status: "ok",
            message: "Success",
            data: randomNumber,
        });
    } else {
        res.status(400).json({
            status: "error",
            message: "Invalid query",
        });
    }

}

module.exports = randomNumberController;