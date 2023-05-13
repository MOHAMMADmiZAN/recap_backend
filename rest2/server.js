const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
const cors = require('cors');
const userController = require("./controller/userController");
const randomNumberController = require("./controller/randomNumberController");

app.use(express.json());
app.use(cors());

app.get("/api/v1/person",userController);
app.get("/api/v1/random",randomNumberController)

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
