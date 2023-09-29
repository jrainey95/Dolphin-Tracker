import React, { useState } from "react";

const Home = () => {
  // Define a state variable to track the selected option
  const [selectedOwner, setSelectedOwner] = useState("");

  // Define an array of owner options
  const ownerOptions = [
    "Godolphin",
    "Coolmore",
    "Darley",
    // Add more owner options as needed
  ];

  // Handle the change event when an option is selected
  const handleOwnerChange = (event) => {
    setSelectedOwner(event.target.value);
  };

  // Handle the button click event
  const handleButtonClick = () => {
    // Perform an action when the button is clicked
    // For example, you can display an alert with the selected owner
    if (selectedOwner) {
      alert(`You selected: ${selectedOwner}`);
    } else {
      alert("Please select an owner.");
    }
  };

  return (
    <>
      <div className="home-container">
        <h1>Owners List</h1>
        {/* Dropdown select */}
        <select value={selectedOwner} onChange={handleOwnerChange}>
          <option value="">Select an Owner</option>
          {ownerOptions.map((owner, index) => (
            <option key={index} value={owner}>
              {owner}
            </option>
          ))}
        </select>
        {/* Button */}
        <button onClick={handleButtonClick}>Submit</button>
        {/* Display selected owner */}
        {selectedOwner && <p>You selected: {selectedOwner}</p>}
      </div>
    </>
  );
};

export default Home;
