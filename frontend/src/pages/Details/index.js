import React, { useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Page } from 'framework7-react';
import './styles.css';
import BasicInfoImageComponent from '../../components/details/BasicInfoImageComponent';
import BasicInfoComponent from '../../components/details/BasicInfoComponent';
import OverviewComponent from '../../components/details/OverviewComponent';
import ReviewsComponent from '../../components/details/ReviewsComponent';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
};

const Details = () => {
  const data = {
    images: [
      'https://images.unsplash.com/flagged/photo-1570737231926-4d67558ff216?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2843&q=80',
      'https://unsplash.com/photos/d6LzDABxP6I',
    ],
    name: 'Changi Airport T4 dept - FC Lounge',
    address: '69 Changi Highlands Rd, T4-04-102 Singapore 169420',
    review_rating: 4.3,
    numberOfReviews: 3300,
    region: 'east',
    features: {
      has_handheld_bidet: true,
      has_seat_bidet: false,
      has_toilet_paper: true,
      has_seat_cleaner: true,
      has_handicap: true,
      is_free: true,
      has_water_heater: true,
      has_hand_dryer: true,
      has_hand_soap: true,
      has_baby_change_station: false,
    },
    certificates: [
      {
        certification_authority: 'Restroom Association (Singapore)',
        // logo: 'https://www.toilet.org.sg/images/RestroomLogo.png',
        url: 'https://toilet.org.sg/',
      },
      {
        certification_authority: 'Restroom Association (Singapore)',
        // logo: 'https://www.toilet.org.sg/images/RestroomLogo.png',
        url: 'https://toilet.org.sg/',
      },
    ],
    reviews: [
      {
        user: {
          name: 'Ronald McDonalds',
          profileImage: 'https://www.comp.nus.edu.sg/stfphotos/sooyj_2.jpg',
        },
        cleanliness_rating: 4,
        title: '',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        created_at: 1600253600,
      },
      {
        user: {
          name: 'Ketucky',
          profileImage: 'https://www.comp.nus.edu.sg/stfphotos/sooyj_2.jpg',
        },
        cleanliness_rating: 2,
        title: '',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        created_at: 1600253600,
      },
    ],
  };

  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleTabChangeIndex = (index) => {
    setActiveTab(index);
  };

  const handleBackOnClick = () => {
    // TODO: Change
    console.log('Back');
  };

  const handleShareOnClick = () => {
    // TODO: Change
    console.log('Share');
  };

  const handleReportOnClick = () => {
    // TODO: Change
    console.log('Report');
  };

  const handleOnReviewClick = (index) => {
    // TODO: Change
    console.log(`Review: ${index} stars`);
  };

  return (
    <Page>
      <BasicInfoImageComponent
        images={data.images}
        handleBackOnClick={handleBackOnClick}
        handleShareOnClick={handleShareOnClick}
        handleReportOnClick={handleReportOnClick}
      />

      <BasicInfoComponent
        name={data.name}
        address={data.address}
        ratings={data.review_rating}
        numberOfReviews={data.numberOfReviews}
      />

      <div className="section">
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Overview" className="tab" />
          <Tab label="Reviews" className="tab" />
        </Tabs>

        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeTab}
          onChangeIndex={handleTabChangeIndex}
        >
          <TabPanel value={activeTab} index={0} dir={theme.direction}>
            <OverviewComponent
              features={data.features}
              certificates={data.certificates}
            />

            <div className="obtain-data">
              <a href="#">How did we obtain this data?</a>
            </div>
          </TabPanel>
          <TabPanel value={activeTab} index={1} dir={theme.direction}>
            <ReviewsComponent
              reviews={data.reviews}
              handleOnReviewClick={handleOnReviewClick}
            />
          </TabPanel>
        </SwipeableViews>
      </div>
    </Page>
  );
};

export default Details;
