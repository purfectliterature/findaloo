import React, { useRef, useEffect, useState } from 'react';
import GoogleMapReact from "google-map-react";
import Masonry from "masonry-layout";
import { Page, Sheet, Button } from "framework7-react";
import "./styles.css";

import BuildingCard from "../../components/BuildingCard";
import ToiletCard from "../../components/ToiletCard";
import SearchBox from "../../components/SearchBox";

const AnyReactComponent = ({ text }) => <div onClick={() => alert(text)}>{text}</div>;

const buildings = [
    { name: "NUS S15", lat: 0, lon: 0 },
    { name: "NUS S16", lat: 0, lon: 0 },
    { name: "NUS LT27", lat: 0, lon: 0 },
    { name: "NUS Computing", lat: 0, lon: 0 },
    { name: "National University Hospital asdwfewef we  ef  dsfdsfwrgqwrg   rgwrg   rg", lat: 0, lon: 0 },
    { name: "Kent Ridge MRT", lat: 0, lon: 0 },
];

const toilets = [
    {
        image:
            "https://www.alsco.com.sg/wp-content/uploads/2016/09/alsco-sg-greenroom-9most-overlooked-washroom-design-details-and-why-you-should-care.jpg",
        name: "NUS LT27",
        distance: "100m",
        isFree: true,
        isMaleToilet: true,
        isFemaleToilet: true,
        reviewRating: 3.8,
        ratingCount: 1000,
        hasBidet: true,
        hasToiletPaper: true,
    },
    {
        image:
            "https://www.alsco.com.sg/wp-content/uploads/2016/09/alsco-sg-greenroom-9most-overlooked-washroom-design-details-and-why-you-should-care.jpg",
        name: "NUS LT27",
        distance: "100m",
        isFree: true,
        isMaleToilet: true,
        isFemaleToilet: true,
        reviewRating: 3.8,
        ratingCount: 1000,
        hasBidet: true,
        hasToiletPaper: true,
    },
    {
        image:
            "https://www.alsco.com.sg/wp-content/uploads/2016/09/alsco-sg-greenroom-9most-overlooked-washroom-design-details-and-why-you-should-care.jpg",
        name: "NUS LT27",
        distance: "100m",
        isFree: true,
        isMaleToilet: true,
        isFemaleToilet: true,
        reviewRating: 3.8,
        ratingCount: 1000,
        hasBidet: true,
        hasToiletPaper: true,
    },
    {
        image:
            "https://www.alsco.com.sg/wp-content/uploads/2016/09/alsco-sg-greenroom-9most-overlooked-washroom-design-details-and-why-you-should-care.jpg",
        name: "NUS LT27",
        distance: "100m",
        isFree: true,
        isMaleToilet: true,
        isFemaleToilet: true,
        reviewRating: 3.8,
        ratingCount: 1000,
        hasBidet: true,
        hasToiletPaper: true,
    }
];

const renderBuildings = () => buildings.map((building) => (
    <BuildingCard key={Math.random()} title={building.name} onClick={() => alert(building.name)} />
));

const renderToilets = () => toilets.map((toilet) => (
    <ToiletCard key={Math.random()} toilet={toilet} />
));

export default (props) => {
    const bottomSheetRef = useRef();
    const [bottomSheetState, setBottomSheetState] = useState("normal");
    const [searchKeywords, setSearchKeywords] = useState("");

    const openBottomSheet = () => {
        bottomSheetRef.current.open(true);
        
        setTimeout(() => {
            const sheet = document.getElementById("bottom-sheet");
            const view = document.querySelector(".view.view-main");        
            view.appendChild(sheet);
        }, 300);

        setBottomSheetState("normal");
    }

    const expandBottomSheet = () => {
        if (bottomSheetState !== "expanded") {
            openBottomSheet();
            const bottomSheet = document.getElementById("bottom-sheet");
            bottomSheet.classList.add("bs-opened");
            bottomSheet.classList.remove("modal-in-swipe-step");
            setBottomSheetState("expanded");
        }
    }

    const hideBottomSheet = () => {
        if (bottomSheetState !== "hidden") {
            document.getElementById("bottom-sheet").classList.remove("bs-opened");
            bottomSheetRef.current.close(true);
            setBottomSheetState("hidden");
        }
    }

    useEffect(() => {
        openBottomSheet();
    }, []);

    useEffect(() => {
        const grid = document.querySelector(".cards");
        const masonry = new Masonry(grid, {
            itemSelector: ".toil-card",
            gutter: ".cards-gutter",
            percentPosition: true
        });
    });

    return (<>
        <div className="map-search-overlay">
            <SearchBox
                mode={bottomSheetState === "expanded" ? "flat" : ""}
                onChange={setSearchKeywords}
                onFocus={expandBottomSheet}
                value={searchKeywords}
            />
        </div>

        <Button
            fill
            raised
            round
            iconSize="1.6rem"
            color="white"
            className={`my-location ${bottomSheetState === "hidden" ? "bottom" : ""}`}
            iconF7="location_fill"
        />

        <Button
            fill
            round
            className={`open-bottom-sheet ${bottomSheetState !== "hidden" ? "hidden" : ""}`}
            iconF7="arrow_up"
            onClick={openBottomSheet}
        >
            Explore toilets
        </Button>

        <Sheet
            id="bottom-sheet"
            className="bottom-sheet"
            swipeToStep
            swipeToClose
            ref={bottomSheetRef}
            backdrop={false}
            onSheetStepOpen={() => {
                document.getElementById("bottom-sheet").classList.add("bs-opened");
                setBottomSheetState("expanded");
            }}
            onSheetStepClose={() => {
                document.getElementById("bottom-sheet").classList.remove("bs-opened");
                document.getElementById("search").blur();
                setBottomSheetState("normal");
            }}
            onSheetClose={hideBottomSheet}
            onSheetClosed={hideBottomSheet}
        >
            <div className="sheet-modal-swipe-step">
                <div className="bottom-sheet-top">
                    <div className="handle" />

                    <h2>Is nature calling now?</h2>

                    <div className="buildings">
                        {renderBuildings()}
                    </div>
                </div>
            </div>
        
            <Page className="bottom-sheet-content">
                <div className="cards">
                    <div className="cards-gutter" />
                    
                    {renderToilets()}
                </div>
            </Page>
        </Sheet>

        {/* "AIzaSyB2XApF_YJNLUrfs7avQLSgGeTAEt4_z_E" */}

        <div className="mapview">
            <GoogleMapReact
                bootstrapURLKeys={{ key: "" }}
                defaultCenter={{ lat: 1.3521, lng: 103.8198 }}
                defaultZoom={12}
                onDrag={hideBottomSheet}
                options={{
                    zoomControl: false,
                    fullscreenControl: false,
                    streetViewControl: false
                }}
            >
                <AnyReactComponent lat={1.2966} lng={103.7764} text="NUS" />
            </GoogleMapReact>
        </div>
    </>);
}
