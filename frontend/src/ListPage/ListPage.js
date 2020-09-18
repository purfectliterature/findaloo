import React from "react";
import "./ListPage.css";
import SearchBar from "../SearchBar/SearchBar";
import Card from "../Card/Card.js";
import FloatButton from "../FloatButton/FloatButton.js";
import MapIcon from "@material-ui/icons/Map";
import Masonry from "react-masonry-css";
import Page from "framework7-react";

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    300: 1,
};

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

const toilets = [
    toilet,
    toilet,
    toilet,
    toilet,
    toilet,
    toilet,
    toilet,
    toilet,
];

function renderToiletList() {
    let list = [];
    for (const toilet of toilets) {
        list.push(<Card toilet={toilet} key={list.length}></Card>);
    }
    return list;
}

export const ListPage = () => (
    <Page>
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
                {renderToiletList()}
            </Masonry>
            <FloatButton
                text="View Map"
                icon={<MapIcon></MapIcon>}
            ></FloatButton>
        </div>
    </Page>
);

export default ListPage;
