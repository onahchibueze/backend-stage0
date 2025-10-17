import express from "express";
import axios from "axios";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET"],
    allowedHeaders: ["Content-Type"],
  })
);

const PORT = process.env.PORT || 5000;
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
    console.error("❌ Error fetching cat fact:", error.message);

    if (error.code === "ECONNABORTED" || error.code === "ENOTFOUND") {
      return res.status(504).json({
        status: "error",
        message:
          "Cat Facts API timed out or is unreachable. Please try again later.",
      });
    }

    if (error.response) {
      return res.status(error.response.status).json({
        status: "error",
        message: `Cat Facts API returned ${error.response.status}: ${error.response.statusText}`,
      });
    }

    res.status(500).json({
      status: "error",
      message: "An unexpected error occurred while fetching cat fact.",
    });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
