import React from "react";
import "./ListPage.css";
import SearchBar from "../SearchBar/SearchBar";
import Card from "../Card/Card.js";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  300: 1,
};

class ListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toiletList: props.toiletList,
    };
  }

  renderToiletList() {
    let list = [];
    for (const toilet of this.state.toiletList) {
      list.push(<Card toilet={toilet} key={list.length}></Card>);
    }
    return list;
  }

  render() {
    return (
      <div className="list-page">
        <div className="searchBar-container">
          <SearchBar></SearchBar>
        </div>
        <div className="title-container">
          <h3>Is nature calling now?</h3>
        </div>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
          id="toilet-list"
        >
          {this.renderToiletList()}
        </Masonry>
      </div>
    );
  }
}

export default ListPage;
