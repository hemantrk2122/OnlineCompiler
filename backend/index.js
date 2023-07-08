const express = require('express');
const { generateFile } = require('./generateFile');
const { executeCpp } = require('./executeCpp');
const cors = require('cors');
const app = express();

// Middlewares -> help us to comunicate with our code
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Get route
app.get('/', (req, res) => {
    res.json({ online: "compiler" });
});

// Post route
app.post('/run', async (req, res) => {
    const { language = 'cpp', code } = req.body;
    if (code === undefined) return res.status(404).json({ sucess: 'false', error: 'Empty Code!' });
    try {
        const filePath = await generateFile(language, code);
        const output = await executeCpp(filePath);
        res.json({ filePath, output });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ error: error });
    }
});

app.listen(4000, () => {
    console.log("Server is running on port 4000! ");
});