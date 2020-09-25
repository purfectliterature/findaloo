import React, { useState } from 'react';
import { Page, Navbar, f7 } from 'framework7-react';
import BuildingCard from '../../components/BuildingCard';

const Buildings = (props) => {
  const { buildings } = props;

  const BULK_SIZE = 20;

  const [buildingsToShow, setBuildingsToShow] = useState(
    buildings.slice(0, BULK_SIZE)
  );
  const [allowInfinite, setAllowInfinite] = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);

  const loadMore = () => {
    if (!allowInfinite) {
      return;
    }

    setAllowInfinite(false);

    setTimeout(() => {
      const currentLength = buildingsToShow.length;
      const buildingsToAdd = buildings.slice(
        currentLength,
        currentLength + BULK_SIZE
      );

      setBuildingsToShow([...buildingsToShow, ...buildingsToAdd]);
      setAllowInfinite(true);
    }, 1000);
  };

  const handleBuildingCardOnClick = (building) => {
    f7.views.main.router.navigate('/', {
      props: {
        building
      },
  });
  };

  const renderBuildings = () => {
    const slice = buildingsToShow.map((building) => {
      let image;

      try {
        image = building.toilets[0].toilet_images[0];
      } catch (error) {}

      return (
        <div key={building.buildingId} className="margin-bottom margin-horizontal-quarter">
          <BuildingCard
            key={building.buildingId}
            title={building.buildingName}
            toilets={building.toilets}
            image={image}
            onClick={() => handleBuildingCardOnClick(building)}
          />
        </div>
      );
    });

    return slice;
  };

  return (
    <Page
      infinite
      infiniteDistance={50}
      infinitePreloader={showPreloader}
      onInfinite={loadMore}
      className="white-background-skin"
    >
      <Navbar backLink />

      <div className="padding display-flex flex-direction-row justify-content-center flex-wrap">
        {renderBuildings()}
      </div>
    </Page>
  );
};

export default Buildings;
