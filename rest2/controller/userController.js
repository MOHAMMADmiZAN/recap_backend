const generatePerson = require("../services/userService");


const userController = (req, res) => {
    const queryPropertyArray = req.query.query?.split(",") ?? [];
    const person = generatePerson(queryPropertyArray);

    console.log(Object.keys(person))

    if (Object.keys(person).length === 0) {
        res.status(400).json({
            status: "error",
            message: "Invalid query",
        });
    } else {
        res.status(200).json({
            status: "ok",
            message: "Success",
            data: person,
        });
    }

}

module.exports = userController;