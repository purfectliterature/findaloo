import React, { useRef, useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import GoogleMapReact from "google-map-react";
import Masonry from "masonry-layout";
import { Page, Sheet, Button as Butt } from "framework7-react";
import "./Explore.css";

import TextBox from '../components/TextBox';
import Button from '../components/Button';

const AnyReactComponent = ({ text }) => <div onClick={() => alert(text)}>{text}</div>;

export default (props) => {
    const bottomSheetRef = useRef();
    const [bottomSheetState, setBottomSheetState] = useState("normal");

    useEffect(() => {
        bottomSheetRef.current.open(true);
        setBottomSheetState("normal");
    }, []);

    useEffect(() => {
        const grid = document.querySelector(".cards");
        const masonry = new Masonry(grid, {
            itemSelector: ".fake-card",
            gutter: ".cards-gutter",
            percentPosition: true
        });
    }, []);

    const expandBottomSheet = () => {
        if (bottomSheetState !== "expanded") {
            bottomSheetRef.current.open(true);
            const bottomSheet = document.getElementById("bottom-sheet");
            bottomSheet.classList.remove("modal-in-swipe-step");
            bottomSheet.classList.add("bs-opened");
            setBottomSheetState("expanded");
        }
    }

    const hideBottomSheet = () => {
        if (bottomSheetState !== "hidden") {
            bottomSheetRef.current.close(true);
            setBottomSheetState("hidden");
        }
    }

    return (<>
        <div className="map-search-overlay">
            <TextBox
                id="id"
                name="name"
                type="search"
                placeholder="Search anything here"
                value="10"
                left={<SearchIcon />}
                right={<Button caption="Log in" />}
                onChange={() => {}}
                onFocus={expandBottomSheet}
                mode={bottomSheetState === "expanded" ? "flat" : ""}
            />
        </div>

        <Butt
            fill
            raised
            round
            iconSize="1.6rem"
            color="white"
            className={`my-location ${bottomSheetState === "hidden" ? "bottom" : ""}`}
            iconF7="location_fill"
        />

        <Butt
            fill
            round
            className={`open-bottom-sheet ${bottomSheetState !== "hidden" ? "hidden" : ""}`}
            iconF7="arrow_up"
            sheetOpen=".bottom-sheet"
            onClick={() => setBottomSheetState("normal")}
        >
            Explore toilets
        </Butt>

        <Sheet
            id="bottom-sheet"
            className="bottom-sheet"
            swipeToStep
            swipeToClose
            ref={bottomSheetRef}
            backdrop={false}
            onSheetStepOpen={() => {
                document.getElementById("bottom-sheet").classList.add("bs-opened");
                setBottomSheetState("expanded")
            }}
            onSheetStepClose={() => {
                document.getElementById("bottom-sheet").classList.remove("bs-opened");
                setBottomSheetState("normal");
            }}
            onSheetClose={() => setBottomSheetState("hidden")}
        >
            <div className="sheet-modal-swipe-step">
                <div className="bottom-sheet-top">
                    <div className="handle" />

                    <h2>Is nature calling now?</h2>

                    <div className="buildings">
                        <div className="px-card">
                            <h3>Hello 1</h3>
                            <h3>Hello 2</h3>
                        </div>
                        <div className="px-card" />
                        <div className="px-card" />
                        <div className="px-card" />
                        <div className="px-card" />
                        <div className="px-card" />
                        <div className="px-card" />
                        <div className="px-card" />
                        <div className="px-card" />
                        <div className="px-card" />
                    </div>
                </div>
            </div>
        
            <Page className="bottom-sheet-content">
                <div className="cards">
                    <div class="cards-gutter"></div>
                    
                    <div className="fake-card">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,
                    </div>

                    <div className="fake-card">
                        It is a long established fact that a reader will be distracted by the readable content of a 
                    </div>
                    
                    <div className="fake-card">
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.
                    </div>
                </div>
            </Page>
        </Sheet>

        {/* AIzaSyB2XApF_YJNLUrfs7avQLSgGeTAEt4_z_E */}

        <div className="mapview">
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyB2XApF_YJNLUrfs7avQLSgGeTAEt4_z_E" }}
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
