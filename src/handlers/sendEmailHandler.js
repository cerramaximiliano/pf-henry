const sendEmail = require("../controllers/emailController");

const sendEmailHandler = async (req, res) => {
    try {
        const result = await sendEmail();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { sendEmailHandler };