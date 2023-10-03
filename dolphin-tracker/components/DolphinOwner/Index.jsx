import React, { useEffect, useState } from "react";
import cheerio from "cheerio";

const DolphinOwner = () => {
  const [mainContent, setMainContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [kemptonTime, setKemptonTime] = useState("");
  const [chantillyTime, setChantillyTime] = useState("");
  const [kensingtonTime, setKensingtonTime] = useState("");
  const [pstTime, setPstTime] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/fetchData")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.text(); // Read the response as text (HTML)
      })
      .then((html) => {
        // Use cheerio to parse the HTML and extract the content of .tabs-content
        const $ = cheerio.load(html);
        const mainContentHtml = $(".tabs-content").html();

        setMainContent(parseHTML(mainContentHtml));
        setIsLoading(false);

        // Get the current time in Kempton, Chantilly, and Kensington (AUS)
        const kemptonNow = new Date().toLocaleString("en-GB", {
          timeZone: "Europe/London", // Kempton, England
        });
        setKemptonTime(formatTime(kemptonNow));

        const chantillyNow = new Date().toLocaleString("fr-FR", {
          timeZone: "Europe/Paris", // Chantilly, France
        });
        setChantillyTime(formatTime(chantillyNow));

        const kensingtonNow = new Date().toLocaleString("en-AU", {
          timeZone: "Australia/Sydney", // Kensington, Australia
        });
        setKensingtonTime(formatTime(kensingtonNow));

        // Convert Kempton time to PST
        const kemptonTimeInMs = new Date(kemptonNow).getTime();
        const pstTimeInMs = kemptonTimeInMs - 8 * 60 * 60 * 1000; // 8 hours behind
        const pstTimeStr = new Date(pstTimeInMs).toLocaleString("en-US", {
          timeZone: "America/Los_Angeles",
        });
        setPstTime(formatTime(pstTimeStr));
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

  // Function to parse HTML and convert it into React elements
  const parseHTML = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const elements = [];

    for (const node of doc.body.childNodes) {
      elements.push(convertNodeToElement(node));
    }

    return elements;
  };

  // Function to convert DOM nodes to React elements
  const convertNodeToElement = (node) => {
    if (node.nodeType === Node.ELEMENT_NODE) {
      const props = {};
      for (const attr of node.attributes) {
        props[attr.name] = attr.value;
      }

      if (node.tagName.toLowerCase() === "td" && props.class === "time") {
        // Compare horse time with PST here
        const horseTime = node.textContent;
        const isHorseTimeInPST = compareTimeWithPST(horseTime);
        props.class = isHorseTimeInPST ? "time-pst" : "time-not-pst";
      }

      const children = [];
      for (const childNode of node.childNodes) {
        children.push(convertNodeToElement(childNode));
      }

      return React.createElement(
        node.tagName.toLowerCase(),
        props,
        ...children
      );
    } else if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent;
    }

    return null;
  };

  // Function to format time in military time format
  const formatTime = (timeStr) => {
    const date = new Date(timeStr);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // Function to compare horse time with PST
 const compareTimeWithPST = (horseTime) => {
   // Get the current time in PST (Pacific Standard Time)
   const currentPST = new Date().toLocaleString("en-US", {
     timeZone: "America/Los_Angeles",
   });

   // Parse the horse time and PST time as Date objects
   const horseTimeDate = new Date(horseTime);
   const pstTimeDate = new Date(currentPST);

   // Define a time range for comparison (e.g., within 30 minutes)
   const timeRangeInMinutes = 30;

   // Calculate the time difference in minutes
   const timeDifferenceInMinutes = Math.abs(
     (horseTimeDate - pstTimeDate) / (60 * 1000)
   );

   // Compare if the horse time is within the defined time range of PST
   return timeDifferenceInMinutes <= timeRangeInMinutes;
 };


  return (
    <div style={{ height: "100vh", overflow: "auto" }}>
      <div>
        <h1>Dolphin Owner</h1>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        <div className="main-content">
          <h2>Main Content</h2>
          <p>
            Current Time in Kempton, England (GMT): {kemptonTime} (PST:{" "}
            {pstTime})
          </p>
          <p>
            Current Time in Chantilly, France (CET): {chantillyTime} (PST:{" "}
            {pstTime})
          </p>
          <p>
            Current Time in Kensington, Australia (AEDT): {kensingtonTime} (PST:{" "}
            {pstTime})
          </p>
        </div>
        <div className="scrollable-content">
          {/* Render the extracted React elements here */}
          <div className="tabs-content">
            <h2>Tabs-content</h2>
            {mainContent.map((element, index) => (
              <React.Fragment key={index}>{element}</React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DolphinOwner;
