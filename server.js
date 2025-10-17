import express from "express";
import axios from "axios";
import cors from "cors";
import rateLimit from "express-rate-limit";
const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET"],
    allowedHeaders: ["Content-Type"],
  })
);

const PORT = process.env.PORT || 5000;
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 50,
});
app.use(limiter);
app.get("/me", async (req, res) => {
  try {
    const response = await axios.get("https://catfact.ninja/fact", {
      timeout: 5000,
    });
    const catFact = response.data.fact;
    const timestamp = new Date().toISOString();
    const data = {
      status: "success",
      user: {
        email: "chibuezesomotochukwu09@gmail.com",
        name: "Onah Chibueze Somtochukwu",
        stack: "Node.js/Express.js",
      },
      timestamp,
      fact: catFact,
    };
    res.status(200).json(data);
  } catch (error) {
    console.error("Cat API error:", error.message);

    res.status(500).json({
      status: "error",
      message: "Failed to fetch cat fact. Try again later.",
      timestamp: new Date().toISOString(),
    });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
