import React, { useRef, useEffect, useState } from 'react';
import GoogleMapReact from "google-map-react";
import Masonry from "masonry-layout";
import { Page, Sheet, Button } from "framework7-react";
import "./styles.css";

import BuildingCard from "../../components/BuildingCard";
import ToiletCard from "../../components/ToiletCard";
import SearchBox from "../../components/SearchBox";
import Marker, { MyLocationMarker } from "../../components/Marker";

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
        name: "National University Hospital",
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

const markers = [
    { title: "Yusof Ishak House", lat: 1.2982403, lng: 103.7760079 },
    { title: "NUS Central Library", lat: 1.2969589, lng: 103.7744992 },
    { title: "NUS S17", lat: 1.2948408, lng: 103.7759664 },
    { title: "COM2-0108", lat: 1.2956401, lng: 103.7755801 }
]

const renderBuildings = () => buildings.map((building) => (
    <BuildingCard key={Math.random()} title={building.name} onClick={() => alert(building.name)} />
));

const renderToilets = () => toilets.map((toilet) => (
    <ToiletCard key={Math.random()} toilet={toilet} />
));

export default (props) => {
    const bottomSheetRef = useRef();
    const [mapView, setMapView] = useState();
    const [bottomSheetState, setBottomSheetState] = useState("normal");
    const [searchKeywords, setSearchKeywords] = useState("");
    const [currentLocation, setCurrentLocation] = useState(null);
    const [activeMarker, setActiveMarker] = useState("");
    const [buildingToShow, setBuildingToShow] = useState(null);
    const [buildingToiletsStripShowed, setBuildingToiletsStripShowed] = useState(false);

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                ({ coords: { latitude, longitude } }) => {
                    if (bottomSheetState === "normal" || buildingToiletsStripShowed) {
                        mapView.panTo({ lat: latitude - 0.0025, lng: longitude });
                    } else {
                        mapView.panTo({ lat: latitude, lng: longitude });
                    }

                    if (mapView.getZoom() < 16) mapView.setZoom(16);
                    setCurrentLocation({ lat: latitude, lng: longitude });
                }
            , () => alert("ADUH"));
        } else {
            alert("not supported");
        }
    }

    const openBottomSheet = () => {
        setBuildingToiletsStripShowed(false);

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

    const showMarkerOnMap = (marker) => {
        hideBottomSheet();
        setBuildingToShow(toilets); // TODO: change to building's toilets!
        setBuildingToiletsStripShowed(true);
        
        setActiveMarker(marker.title);
        if (bottomSheetState === "normal" || buildingToiletsStripShowed) {
            mapView.panTo({ lat: marker.lat - 0.0025, lng: marker.lng + 0.002 });
        } else {
            mapView.panTo({ lat: marker.lat, lng: marker.lng + 0.002 });
        }
        
        if (mapView.getZoom() < 16) mapView.setZoom(16);
    }

    const renderMarkers = () => markers.map((marker) => (
        <Marker
            key={marker.title}
            title={marker.title}
            lat={marker.lat}
            lng={marker.lng}
            onClick={() => showMarkerOnMap(marker)}
            active={activeMarker === marker.title}
        />
    ));

    const renderBuildingToilets = (toilets) => toilets.map((toilet) => (
        <ToiletCard key={Math.random()} toilet={toilet} mini={true} />
    ));

    return (<>
        <div className="map-search-overlay">
            <SearchBox
                mode={bottomSheetState === "expanded" ? "flat" : ""}
                onChange={setSearchKeywords}
                onFocus={expandBottomSheet}
                value={searchKeywords}
                rightButtonOnClick={() => {}}
            />
        </div>

        {buildingToShow ?
            <div className={`map-toilets-overlay ${buildingToiletsStripShowed ? "" : "hidden"}`}>
                <div className="bldg-toilets">
                    {renderBuildingToilets(buildingToShow)}
                </div>
            </div>
        : null}

        <Button
            fill
            raised
            round
            iconSize="1.6rem"
            color="white"
            className={`my-location ${bottomSheetState === "hidden" ? "bottom" : ""}`}
            iconF7="location_fill"
            onClick={getCurrentLocation}
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

        <div className="mapview" id="mapview">
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyB2XApF_YJNLUrfs7avQLSgGeTAEt4_z_E" }}
                defaultCenter={{ lat: 1.2966, lng: 103.7764 }}
                defaultZoom={12}
                onDrag={hideBottomSheet}
                options={{
                    zoomControl: false,
                    fullscreenControl: false,
                    streetViewControl: false,
                    clickableIcons: false
                }}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => setMapView(map)}
            >
                {currentLocation ? <MyLocationMarker lat={currentLocation.lat} lng={currentLocation.lng} text="NUS" /> : null}
                
                {renderMarkers()}
            </GoogleMapReact>
        </div>
    </>);
}
