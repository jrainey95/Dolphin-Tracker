const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

app.get("/api/fetchData", async (req, res) => {
  try {
    const axiosResponse = await axios.get(
      "https://www.godolphin.com/runners-and-results/runners"
    );
    const html = await axiosResponse.data; // Use axiosResponse.data to get the HTML content
    console.log('html', html);

    // Send the HTML content as a response to the client
    res.send(html);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Unable to fetch data" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
