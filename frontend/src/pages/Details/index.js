import React from 'react';
import { Page, Tabs, Tab, Toolbar, Link } from 'framework7-react';
import './styles.css';
import BasicInfoImageComponent from '../../components/details/BasicInfoImageComponent';
import BasicInfoComponent from '../../components/details/BasicInfoComponent';
import OverviewComponent from '../../components/details/OverviewComponent';
import ReviewsComponent from '../../components/details/ReviewsComponent';

const Details = () => {
  const data = {
    images: [
      'https://images.unsplash.com/flagged/photo-1570737231926-4d67558ff216?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2843&q=80',
      'https://images.unsplash.com/photo-1550503194-e24e63cfffa7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80',
    ],
    name: 'Changi Airport T4 dept - FC Lounge',
    address: '69 Changi Highlands Rd, T4-04-102 Singapore 169420',
    review_rating: 2.2,
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
      has_female: true,
      has_male: false,
    },
    certificates: [
      {
        certification_authority: 'Restroom Association (Singapore)',
        logo: 'https://www.toilet.org.sg/images/RestroomLogo.png',
        url: 'https://toilet.org.sg/',
      },
      {
        certification_authority: 'Restroom Association (Singapore)',
        logo: 'https://www.toilet.org.sg/images/RestroomLogo.png',
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
        title: 'Tip-top cleanliness',
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
        title: 'Dirty',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        created_at: 1600253600,
      },
    ],
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
    <Page className="page-skin">
      <BasicInfoImageComponent
        images={data.images}
        handleShareOnClick={handleShareOnClick}
        handleReportOnClick={handleReportOnClick}
      />

      <BasicInfoComponent
        name={data.name}
        address={data.address}
        ratings={data.review_rating}
        numberOfReviews={data.numberOfReviews}
      />

      <div className="padding">
        <Toolbar tabbar className="tab-bar" bgColor="inherit">
          <Link tabLink="#overview" tabLinkActive>
            Overview
          </Link>
          <Link tabLink="#reviews">Reviews</Link>
        </Toolbar>
        <Tabs animated>
          <Tab id="overview" className="page-content" tabActive>
            <OverviewComponent
              features={data.features}
              certificates={data.certificates}
            />

            <div className="text-align-center">
              {/* #TODO: Change link */}
              <a href="https://www.google.com">How did we obtain this data?</a>
            </div>
          </Tab>

          <Tab id="reviews" className="page-content" tabActive>
            <ReviewsComponent
              reviews={data.reviews}
              handleOnReviewClick={handleOnReviewClick}
            />
          </Tab>
        </Tabs>
      </div>
    </Page>
  );
};

export default Details;
