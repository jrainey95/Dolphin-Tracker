import React, { useEffect, useState } from "react";
import cheerio from "cheerio";

const DolphinOwner = () => {
  const [tabsContent, setTabsContent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch HTML content from your backend server when the component mounts
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
        const tabsContentHtml = $(".tabs-content").html();
        setTabsContent(parseHTML(tabsContentHtml));
        setIsLoading(false);
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

      const children = [];
      for (const childNode of node.childNodes) {
        children.push(convertNodeToElement(childNode));
      }

      if (node.classList.contains("track-course-location")) {
        // Extract the local time from the element's text content
        const localTime = node.textContent.trim();

        // Convert local time to PST
        const options = {
          timeZone: "America/Los_Angeles", // Pacific Time Zone (PST)
          hour12: true, // Use 12-hour format
          hour: "numeric",
          minute: "numeric",
        };

        const pstTime = new Date(localTime).toLocaleString("en-US", options);

        // Create a new React element to display the PST time
        return (
          <div {...props}>
            {children}
            <span className="pst-time">{pstTime}</span>
          </div>
        );
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

  return (
    <div>
      <h1>Godolphin</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      <div className="main-content">
        <h2>Main Content</h2>
        {/* Render the extracted React elements here */}
        {tabsContent.map((element, index) => (
          <React.Fragment key={index}>{element}</React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default DolphinOwner;
