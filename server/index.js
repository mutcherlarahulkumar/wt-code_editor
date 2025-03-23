const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const {router} = require('./ChatLogic')
const {routes} = require('./routes/index')
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());


app.use('/chat',router);

app.use('/user',routes);

const JDoodle_API = "https://api.jdoodle.com/v1/execute";
const CLIENT_ID = "bba5ac294a110b3174d32215c629137c"; // Replace with your JDoodle Client ID
const CLIENT_SECRET = "55af224ae0aa01899cf28562c8327cf4a5e6d6bf5680184f1bc1c5d3c95acd71"; // Replace with your JDoodle Client Secret

// Execute code endpoint
app.post("/execute", async (req, res) => {
    const { language, code, input } = req.body;

    if (!language || !code) {
        return res.status(400).json({ error: "Language and code are required." });
    }

    let jdoodleLanguage, versionIndex;

    // Map frontend language to JDoodle language and version index
    switch (language) {
        case "javascript":
            jdoodleLanguage = "nodejs";
            versionIndex = "3";
            break;
        case "python":
            jdoodleLanguage = "python3";
            versionIndex = "3";
            break;
        case "c":
            jdoodleLanguage = "c";
            versionIndex = "5";
            break;
        case "cpp":
            jdoodleLanguage = "cpp17";
            versionIndex = "0";
            break;
        case "java":
            jdoodleLanguage = "java";
            versionIndex = "4";
            break;
        default:
            return res.status(400).json({ error: "Unsupported language." });
    }

    try {
        const response = await axios.post(JDoodle_API, {
            script: code,
            stdin: input || "",
            language: jdoodleLanguage,
            versionIndex,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
        });

        const { output } = response.data;
        res.json({ output });
    } catch (error) {
        res.status(500).json({ error: "Failed to execute code." });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

