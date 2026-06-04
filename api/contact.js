const { Resend } = require("resend");

const TO_EMAIL = "heyitzsamiur@gmail.com";

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") {
    return res.status(405).json({ status: 405, message: "Method not allowed" });
  }

  const { name, email, message } = req.body || {};

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return res.status(400).json({ status: 400, message: "Name, email, and message are required." });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ status: 400, message: "Please enter a valid email address." });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return res.status(500).json({ status: 500, message: "Email service is not configured. Please reach out directly at srahman96@gatech.edu." });
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: TO_EMAIL,
      reply_to: email.trim(),
      subject: `Portfolio contact from ${name.trim()}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1a1a2e; border-bottom: 2px solid #7b2ff7; padding-bottom: 8px;">
            New message from your portfolio
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 0; color: #555; width: 80px; font-weight: bold;">Name</td>
              <td style="padding: 8px 0; color: #1a1a2e;">${name.trim()}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #555; font-weight: bold;">Email</td>
              <td style="padding: 8px 0; color: #1a1a2e;">
                <a href="mailto:${email.trim()}" style="color: #7b2ff7;">${email.trim()}</a>
              </td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background: #f5f5f5; border-radius: 8px; border-left: 4px solid #7b2ff7;">
            <p style="margin: 0; color: #1a1a2e; white-space: pre-wrap; line-height: 1.6;">${message.trim()}</p>
          </div>
          <p style="margin-top: 20px; color: #888; font-size: 13px;">
            Hit reply to respond directly to ${name.trim()}.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return res.status(500).json({ status: 500, message: "Failed to send message. Please email me directly at srahman96@gatech.edu.", debug: error.message });
    }

    return res.status(200).json({ status: 200, message: "Message sent! I'll get back to you soon." });
  } catch (err) {
    console.error("Contact handler error:", err.message);
    return res.status(500).json({ status: 500, message: "Something went wrong. Please email me directly at srahman96@gatech.edu." });
  }
};
