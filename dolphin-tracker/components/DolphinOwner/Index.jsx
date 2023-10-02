// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import cheerio from "cheerio";
// import './index.scss';

// const DolphinOwners = () => {
//   const [owners, setOwners] = useState([]);

//   useEffect(() => {
//     // Define the URL to scrape
//     const url = "https://www.godolphin.com/runners-and-results/runners";

//     // Make a GET request to the URL and parse the HTML
//     axios
//       .get(url)
//       .then((response) => {
//         const html = response.data;
//         const $ = cheerio.load(html);

//         // Define the CSS selector for the data you want to scrape
//         const selector = "your-selector-for-data";

//         // Iterate through the HTML elements and extract owner data
//         const extractedOwners = [];
//         $(selector).each((index, element) => {
//           // Extract owner information and push it to the extractedOwners array
//           const ownerInfo = {
//             // Extract relevant data here
//           };
//           extractedOwners.push(ownerInfo);
//         });

//         // Update the component state with the extracted data
//         setOwners(extractedOwners);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []); // Empty dependency array to run the effect only once

//   return (
//     <>
//       <h1>Owners</h1>
//       <ul>
//         {owners.map((owner, index) => (
//           <li key={index}>
//             {/* Display owner information */}
//             {owner.name}, {owner.location}
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// };

// export default DolphinOwners;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import cheerio from "cheerio";

// function DolphinOwner() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/api/fetchData")
//       .then((response) => {
//         const html = response.data;
//         const $ = cheerio.load(html);
//         console.log("API Response:", response.data); // Log the response
        

//         // Define the CSS selector for the data you want to scrape
//         const selector = "your-selector-for-data";

//         // Extract and transform the data into the desired format
//         const extractedData = [];
//         $(selector).each((index, element) => {
//           // Extract relevant data here and create an object
//           const raceData = {
//             timeRacecourse: $(element).find(".timeRacecourseSelector").text(),
//             horseOwner: $(element).find(".horseOwnerSelector").text(),
//             // Add more properties as needed
//           };
//           extractedData.push(raceData);
//         });

//         // Update the component state with the extracted data
//         setData(extractedData);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

  
//   // useEffect(() => {
//   //   axios
//   //     .get("http://localhost:3001/api/fetchData")
//   //     .then((response) => {
//   //       console.log("API Response:", response.data); // Log the response
//   //       setData(response.data);
//   //     })
//   //     .catch((error) => {
//   //       console.error("Error fetching data:", error);
//   //     });
//   // }, []);

//   return (
//     <div>
//       <h1>Dolphin Owner Component</h1>
//       {data.length > 0 ? (
//         <ul>
//           {data.map((race, index) => (
//             <li key={index}>
//               <p>Time Racecourse: {race.timeRacecourse}</p>
//               <p>Horse/Owner: {race.horseOwner}</p>
//               {/* Render other race details here */}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>Loading data...</p>
//       )}
//     </div>
//   );
// }

// export default DolphinOwner;


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// function DolphinOwner() {
//   const [racecourseInfo, setRacecourseInfo] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Make an HTTP request to your server API to fetch the HTML content
//     axios.get("http://localhost:3001/api/fetchData")
//       .then((response) => {
//         // Assuming that the racecourse information is in a specific HTML element
//         // You may need to parse the HTML content to extract the required data
//         const htmlContent = response.data;
        
//         // Set the entire HTML content to state for testing purposes
//         setRacecourseInfo(htmlContent);
        
//         setLoading(false); // Set loading to false when data is received
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setError(error);
//         setLoading(false); // Set loading to false on error
//       });
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <div className="DolphinOwner">
//       <h1>Racecourse Information</h1>
//       <div dangerouslySetInnerHTML={{ __html: racecourseInfo }} />
//     </div>
//   );
// }

// export default DolphinOwner;


import React, { useEffect, useState } from "react";
import axios from "axios";

function DolphinOwner() {
  const [racecourseInfo, setRacecourseInfo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Make an HTTP request to your server API to fetch the HTML content
    axios
      .get("http://localhost:3001/api/fetchData")
      .then((response) => {
        // Assuming that the racecourse information is within a specific HTML element
        // You may need to parse the HTML content to extract the required data
        const htmlContent = response.data;

        // Replace "your-selector" with the appropriate selector for the desired content
        const selectedContent = extractContent(htmlContent, ".tabs-content");

        // Set the selected content to state
        setRacecourseInfo(selectedContent);

        setLoading(false); // Set loading to false when data is received
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false); // Set loading to false on error
      });
  }, []);

  // Function to extract inner HTML of a selected element based on a selector
  const extractContent = (htmlContent, selector) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const selectedElement = doc.querySelector(selector);

    // Check if the selected element exists, and return its innerHTML if found
    if (selectedElement) {
      return selectedElement.innerHTML;
    }

    // Return an empty string if the element is not found
    return "";
  };

  return (
    <div className="DolphinOwner" style={{ overflowY: "scroll", height: "500px" }}>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <div dangerouslySetInnerHTML={{ __html: racecourseInfo }} />
    </div>
  );
}

export default DolphinOwner;
