const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

app.get("/api/fetchData", async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.godolphin.com/runners-and-results/runners"
    );
    const data = response.data;
    console.log(response.data)
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Unable to fetch data" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
