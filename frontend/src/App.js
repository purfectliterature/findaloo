import React from "react";
import "./App.css";
import SearchBar from "./SearchBar/SearchBar.js";
import Rating from "./Rating/Rating";

function App() {
  return (
    <div className="App">
      <SearchBar></SearchBar>
      <Rating rating="3.2" count="10000"></Rating>
    </div>
  );
}

export default App;
