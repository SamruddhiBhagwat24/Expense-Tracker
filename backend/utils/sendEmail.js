const axios = require("axios");

const sendVerificationEmail = async (email, token) => {
  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "Expense Tracker",
          email: "bhagwatsamruddhi24@gmail.com"
        },
        to: [{ email }],
        subject: "Verify Your Email",
        htmlContent: `
          <h2>Verify Your Account</h2>
          <a href="http://localhost:8000/api/auth/verify/${token}">
            Click Here to Verify
          </a>
        `
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("Verification email sent");
  } catch (error) {
    console.log("Brevo error:", error.response?.data || error.message);
  }
};

module.exports = sendVerificationEmail;
