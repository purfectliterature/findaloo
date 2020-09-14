import React from "react";
import "./App.css";
import SearchBar from "./SearchBar/SearchBar.js";
import Card from "./Card/Card.js";

function App() {
  const toilet = {
    image:
      "https://www.alsco.com.sg/wp-content/uploads/2016/09/alsco-sg-greenroom-9most-overlooked-washroom-design-details-and-why-you-should-care.jpg",
    name: "NUS LT27",
    distance: "100m",
    isFree: true,
    hasMale: true,
    hasFemale: true,
    rating: 3.2,
    ratingCount: 1000,
    hasBidet: true,
    hasToiletPaper: true,
  };
  return (
    <div className="App">
      <SearchBar></SearchBar>
      <Card toilet={toilet}></Card>
    </div>
  );
}

export default App;
