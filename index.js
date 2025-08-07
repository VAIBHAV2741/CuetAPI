const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// 📨 POST route to save contact form
app.post("/submit", async (req, res) => {
  try {
    const { name, email, phone, course, message } = req.body;

    const newContact = await prisma.contact.create({
      data: { name, email, phone, course, message },
    });

    res.status(201).json({ success: true, data: newContact });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Start the server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
