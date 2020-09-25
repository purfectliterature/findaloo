import React, { useRef, useEffect, useState } from 'react';
import GoogleMapReact from "google-map-react";
import MarkerClusterer from "@googlemaps/markerclustererplus";
import Masonry from "masonry-layout";
import ReactGA from "react-ga";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import ClipLoader from "react-spinners/ClipLoader";
import { useDispatch, useSelector } from "react-redux";
import { Page, Sheet, Button, f7 } from "framework7-react";
import "./styles.css";

import BuildingCard from "../../components/BuildingCard";
import ToiletCard from "../../components/ToiletCard";
import SearchBox from "../../components/SearchBox";
import Marker, { MyLocationMarker } from "../../components/Marker";
import FetchLoading from "../../components/FetchLoading";
import SheetDialog from "../../components/SheetDialog";
import BasicButton from "../../components/BasicButton";

import {
    addBuildings,
    updateToiletsHash,
    cacheNearestToilets,
    getBuildings,
    getToiletsHash,
    getCachedNearestToilets
} from "../../store/toilets";

import { getTokens, getUserInfo, getLastLocation, saveLocation } from "../../store/user";
import { fetchToilets, fetchToiletsHash, fetchNearestToilets } from "../../utils/toilets";

const MAX_BUILDINGS_FEATURED = 20;
const INITIAL_POSITION = { lat: 1.2966, lng: 103.7764 };

export default (props) => {
    const bottomSheetRef = useRef();
    const noLocationDialogRef = useRef();
    const [mapView, setMapView] = useState();
    const [mapsApi, setMapsApi] = useState();
    const [bottomSheetState, setBottomSheetState] = useState("normal");
    const [searchKeywords, setSearchKeywords] = useState("");
    const [currentLocation, setCurrentLocation] = useState(null);
    const [buildingToShow, setBuildingToShow] = useState(null);
    const [buildingToiletsStripShowed, setBuildingToiletsStripShowed] = useState(false);
    const [liveLocation, setLiveLocation] = useState(null);
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);

    const [buildings, setBuildings] = useState(null);
    const [featuredToilets, setFeaturedToilets] = useState(null);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);
    const dispatch = useDispatch();
    const buildingsFromStore = useSelector(getBuildings);
    const toiletsHashFromStore = useSelector(getToiletsHash);
    const tokensFromStore = useSelector(getTokens);
    const userInfoFromStore = useSelector(getUserInfo);
    const locationFromStore = useSelector(getLastLocation);
    const cachedNearestToiletsFromStore = useSelector(getCachedNearestToilets);

    const getCurrentLocation = () => {
        if (navigator.geolocation) {
            setIsLoadingLocation(true);

            navigator.geolocation.getCurrentPosition(
                ({ coords: { latitude, longitude } }) => {
                    if (bottomSheetState === "normal" || buildingToiletsStripShowed) {
                        mapView.panTo({ lat: latitude - 0.0025, lng: longitude });
                    } else {
                        mapView.panTo({ lat: latitude, lng: longitude });
                    }

                    fetchNearestToilets({ lat: latitude, lng: longitude }, (toilets) => {
                        dispatch(cacheNearestToilets(toilets));
                        setFeaturedToilets(toilets);
                    }, (error) => {
                        if (error.message === "Network Error" && cachedNearestToiletsFromStore) {
                            console.log("No network, using local storage");
                            setFeaturedToilets(cachedNearestToiletsFromStore);
                        } else {
                            console.log("No network and no local storage, go fly kite");
                        }
                    });

                    dispatch(saveLocation(latitude, longitude));

                    if (mapView.getZoom() < 16) mapView.setZoom(16);
                    setCurrentLocation({ lat: latitude, lng: longitude });
                    setLiveLocation(true);
                    setIsLoadingLocation(false);
                }
            , () => {
                noLocationDialogRef.current.open(true);
                setIsLoadingLocation(false);
            });
        } else {
            noLocationDialogRef.current.open(true);
        }
    }

    const openBottomSheet = () => {
        setBuildingToiletsStripShowed(false);

        bottomSheetRef.current.open(true);
        
        setTimeout(() => {
            const sheet = document.getElementById("bottom-sheet");
            const page = document.querySelector("#explore .page-content");        
            page.appendChild(sheet);
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
    
    const showMarkerOnMap = (building) => {
        hideBottomSheet();
        setBuildingToShow(building);
        setBuildingToiletsStripShowed(true);

        mapView.panTo({ lat: building.lat - 0.0025, lng: building.lon + 0.002 });
        
        if (mapView.getZoom() < 16) mapView.setZoom(16);
    }

    const renderBuildings = () => {
        let sliced = buildings.slice(0, MAX_BUILDINGS_FEATURED).map((building) => {
            let image;
    
            try {
                image = building.toilets[0].toilet_images[0];
            } catch (error) { }
    
            return (
                <BuildingCard
                    key={building.buildingId}
                    title={building.buildingName}
                    toilets={building.toilets}
                    image={image}
                    onClick={() => showMarkerOnMap(building)}
                />
            );
        });


        if (buildings.length > MAX_BUILDINGS_FEATURED) {
            sliced.push(
                <BuildingCard
                    key={"showAllBuildings"}
                    onClick={() => {}}
                    isShowAllBuildingsButton={true}
                />
            );
        }

        return sliced;
    }

    const renderBuildingToilets = () => {
        if (buildingToShow && buildingToShow.toilets) {
            const toilets = buildingToShow.toilets.map((toilet) => (
                <ToiletCard key={"tm-" + toilet.toiletId} toilet={toilet} mini={true} />
            ));

            return (
                <div className={`map-toilets-overlay ${buildingToiletsStripShowed ? "" : "hidden"}`}>
                    <div className="bldg-toilets">
                        {toilets}
                    </div>
                </div>
            );
        }
    }

    const renderToilets = () => {
        if (featuredToilets) {
            return featuredToilets.map((toilet) => (
                <ToiletCard toilet={toilet} key={"tl-" + toilet.toiletId} />
            ));
        }
    }
    
    useEffect(() => { ReactGA.pageview("/"); });

    useEffect(() => {
        fetchToiletsHash((hash) => {
            if (toiletsHashFromStore === hash) {
                console.log("Hash is the same as server, using local storage");
                setBuildings(buildingsFromStore);
            } else {
                console.log("Hash is different from server, retrieving");
                fetchToilets((buildings) => {
                    console.log("Retrieving buildings from server");
                    dispatch(addBuildings(buildings));
                    dispatch(updateToiletsHash(hash));
                    setBuildings(buildings);
                }, (error) => {
                    if (error.message === "Network Error" && buildingsFromStore) {
                        console.log("No network, using local storage");
                        setBuildings(buildingsFromStore);
                    } else {
                        console.log("No network and no local storage, go fly kite");
                    }
                });
            }
        }, (error) => {
            if (error.message === "Network Error" && buildingsFromStore) {
                console.log("No network, using local storage");
                setBuildings(buildingsFromStore);
            } else {
                console.log("No network and no local storage, go fly kite");
            }
        });
    }, []);

    useEffect(() => {
        if (tokensFromStore && tokensFromStore.authToken) {
            setIsUserLoggedIn(true);
        } else {
            setIsUserLoggedIn(false);
        }
    }, [tokensFromStore]);

    useEffect(() => {
        let positionToFetch = INITIAL_POSITION;
        
        if (locationFromStore) {
            positionToFetch = locationFromStore;
        }

        fetchNearestToilets(positionToFetch, (toilets) => {
            setFeaturedToilets(toilets);
        }, (error) => {
            if (error.message === "Network Error" && cachedNearestToiletsFromStore) {
                console.log("No network, using local storage");
                setFeaturedToilets(cachedNearestToiletsFromStore);
            } else {
                console.log("No network and no local storage, go fly kite");
            }
        });

        setCurrentLocation(positionToFetch);
    }, []);

    useEffect(() => {
        const grid = document.querySelector(".cards");
        new Masonry(grid, {
            itemSelector: ".toil-card",
            gutter: ".cards-gutter",
            percentPosition: true
        });
    });
    
    useEffect(() => {
        if (buildings) openBottomSheet();
    }, [buildings]);

    useEffect(() => {
        try {
            if (buildings && mapsApi && mapView) {
                const markers = buildings.map((building) => {                    
                    const marker = new mapsApi.Marker({
                        position: {
                            lat: parseFloat(building.lat),
                            lng: parseFloat(building.lon)
                        },
                        icon: {
                            url: require("../../assets/marker-toilet.svg"),
                            anchor: new mapsApi.Point(0, 0)
                        }
                    });

                    marker.addListener("click", () => {
                        showMarkerOnMap(building)
                    });

                    return marker;
                });
                
                new MarkerClusterer(mapView, markers, {
                    imagePath: "/static/cluster/m",
                    minimumClusterSize: 3
                });
            }
        } catch (error) {
            console.log("WHOOPS NO MAPS");
            console.error(error);
        }
    }, [buildings, mapView, mapsApi]);

    if (buildings === null) {
        return <FetchLoading />;
    }

    return (<Page className="white-background-skin" id="explore">
        <SheetDialog
            id="new-user-modal"
            title="It’s now easier to deal with your business!"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            image={require("../../assets/persons-peeing.svg")}
            imageAlt="Persons peeing"
            opened={!isUserLoggedIn}
        >            
            <BasicButton
                fill
                type="submit"
                sheetClose="#new-user-modal"
                onClick={() => f7.views.main.router.navigate('/login/')}
            >Log in or Sign Up</BasicButton>

            <BasicButton outline sheetClose="#new-user-modal">Continue to app</BasicButton>
        </SheetDialog>

        <SheetDialog
            id="no-location"
            setRef={noLocationDialogRef}
            title="Whoops, seems like you're out of this world!"
            description="We cannot retrieve your current location. Please check if your Location Services have been turned on and that you have granted location access on your browser, then try again."
            image={require("../../assets/person-on-world.svg")}
            imageAlt="Person on world"
        >
            <BasicButton fill sheetClose="#no-location">Okay</BasicButton>
        </SheetDialog>

        <div className="map-search-overlay">
            <SearchBox
                mode={bottomSheetState === "expanded" ? "flat" : ""}
                onChange={setSearchKeywords}
                onFocus={expandBottomSheet}
                value={searchKeywords}
                onClickProfilePicture={() => f7.views.main.router.navigate('/profile/')}
                onClickLogInButton={() => f7.views.main.router.navigate('/login/')}
                loggedIn={isUserLoggedIn}
                profilePicture={userInfoFromStore.profilePicture}
            />
        </div>

        {renderBuildingToilets()}

        <Button
            fill
            raised
            round
            iconSize="1.6rem"
            color="white"
            className={`my-location ${bottomSheetState === "hidden" ? "bottom" : ""} ${liveLocation ? "location-found" : ""}`}
            onClick={getCurrentLocation}
        >
            {isLoadingLocation ? <ClipLoader size={30} /> : <MyLocationIcon />}
        </Button>

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
                        {buildings ? renderBuildings() : null}
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
                defaultCenter={INITIAL_POSITION}
                defaultZoom={12}
                onDrag={hideBottomSheet}
                options={{
                    zoomControl: false,
                    fullscreenControl: false,
                    streetViewControl: false,
                    clickableIcons: false
                }}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map, maps }) => {
                    setMapView(map);
                    setMapsApi(maps);
                }}
            >
                {currentLocation ?
                    <MyLocationMarker
                        lat={currentLocation.lat}
                        lng={currentLocation.lng}
                        pastLocation={!liveLocation}
                    />
                : null}
                
                {buildingToShow ? 
                    <Marker
                        key={buildingToShow.buildingId}
                        title={buildingToShow.buildingName}
                        lat={buildingToShow.lat}
                        lng={buildingToShow.lon}
                        onClick={() => {}}
                        active={true}
                    />
                : null}
            </GoogleMapReact>
        </div>
    </Page>);
}
