const countChars = require("../services/countCharacter");


const countCharacterController = (req, res) => {

    const {string} = req.query;
    console.log(string)
    if (string.trim().length > 0) {
        const count = countChars(string);
        res.status(200).json({
            status: "ok",
            message: "Success",
            data: count,
        });
    } else {
        res.status(400).json({
            status: "error",
            message: "Invalid query",
        });
    }

}
module.exports = countCharacterController;