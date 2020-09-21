import React from "react";
import "./ListPage.css";
import SearchBar from "../../components/listPage/SearchBar/SearchBar.js";
import Card from "../../components/listPage/Card/Card.js";
import FloatButton from "../../components/listPage/FloatButton/FloatButton.js";
import MapIcon from "@material-ui/icons/Map";
import Masonry from "react-masonry-css";
import { Page, f7 } from "framework7-react";

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
    review_rating: 3.8,
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

class ListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //toiletList: props.toiletList,
            toiletList: toilets,
            searchKeyword: "",
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCardClick = this.handleCardClick.bind(this);
    }

    handleCardClick(id) {
        f7.views.main.router.navigate(`/toilets/${id}/`);
    }

    renderToiletList() {
        let list = [];
        for (const toilet of this.state.toiletList) {
            list.push(
                <Card
                    toilet={toilet}
                    key={list.length}
                    onClick={this.handleCardClick(toilet.id)}
                ></Card>
            );
        }
        return list;
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((location) =>
                this.setState({
                    location:
                        location.coords.latitude +
                        "," +
                        location.coords.longitude,
                })
            );
        } else {
            this.setState({
                location: "Geolocation is not supported by this browser.",
            });
        }
    }

    handleChange(e) {
        var keyword = e.target.value;
        this.setState({
            searchKeyword: keyword,
        });
    }

    handleSearch() {
        fetch(
            "/toilets/search?keyword=" + this.state.searchKeyword + "&limit=20"
        )
            .then((response) => {
                if (response.ok) return response.json();
                else throw Error();
            })
            .then((toiletList) => {
                this.setState({
                    toiletList: toiletList,
                });
            })
            .catch((error) => {
                //handle error
            });
    }
    render() {
        this.getLocation();
        return (
            <Page className="white-background-skin">
                <div className="list-page">
                    <div className="searchBar-container">
                        <SearchBar
                            onSearch={this.handleSearch}
                            onChange={this.handleChange}
                        ></SearchBar>
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
                    <FloatButton
                        text="View Map"
                        icon={<MapIcon></MapIcon>}
                    ></FloatButton>
                </div>
            </Page>
        );
    }
}

export default ListPage;
