import React, { useEffect, useState } from "react";
import axios from "axios";
import cheerio from "cheerio";

const DolphinOwners = () => {
  const [owners, setOwners] = useState([]);

  useEffect(() => {
    // Define the URL to scrape
    const url = "https://www.godolphin.com/runners-and-results/runners";

    // Make a GET request to the URL and parse the HTML
    axios
      .get(url)
      .then((response) => {
        const html = response.data;
        const $ = cheerio.load(html);

        // Define the CSS selector for the data you want to scrape
        const selector = "your-selector-for-data";

        // Iterate through the HTML elements and extract owner data
        const extractedOwners = [];
        $(selector).each((index, element) => {
          // Extract owner information and push it to the extractedOwners array
          const ownerInfo = {
            // Extract relevant data here
          };
          extractedOwners.push(ownerInfo);
        });

        // Update the component state with the extracted data
        setOwners(extractedOwners);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array to run the effect only once

  return (
    <>
      <h1>Owners</h1>
      <ul>
        {owners.map((owner, index) => (
          <li key={index}>
            {/* Display owner information */}
            {owner.name}, {owner.location}
          </li>
        ))}
      </ul>
    </>
  );
};

export default DolphinOwners;
