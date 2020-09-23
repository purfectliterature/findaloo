import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Page, Tabs, Tab, Toolbar, Link, Button, f7 } from 'framework7-react';
import { endpoints } from '../../utils/routes';
import './styles.css';
import BasicInfoImage from '../../components/BasicInfoImage';
import BasicInfo from '../../components/BasicInfo';
import Overview from '../../components/Overview';
import Reviews from '../../components/Reviews';

const Details = (props) => {
  const { id } = props;

  const defaultInfo = {
    features: [],
    toilet_images: [],
    reviews: [],
    certifications: [],
  }
  const [details, setDetails] = useState(defaultInfo);

  useEffect(() => {
    axios.get(`${endpoints.databaseApi}/toilets/${id}`).then((res) => {
      if (res.status === 200) {
        setDetails(res.data);
      }
    });
  }, []);

  const handleShareOnClick = () => {
    // TODO: Change
    console.log('Share');
  };

  const handleReportOnClick = () => {
    f7.views.main.router.navigate('/reports/create/', {
      props: {
        id: id,
        postTitle: details.toiletName,
      },
    });
  };

  const handleOnReviewClick = (rating) => {
    f7.views.main.router.navigate('/reviews/create/', {
      props: {
        id: id,
        rating: rating,
        postTitle: details.toiletName,
      },
    });
  };

  return (
    <Page className="white-background-skin">
      <BasicInfoImage
        images={details.toilet_images}
        handleShareOnClick={handleShareOnClick}
        handleReportOnClick={handleReportOnClick}
      />

      <BasicInfo
        name={details.toiletName}
        address={details.address}
        ratings={details.avg_review}
        numberOfReviews={details.review_count}
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
            <Overview
              features={details.features}
              certificates={details.certifications}
            />

            <div className="text-align-center">
              {/* #TODO: Change link */}
              <Button
                external
                href="https://www.google.com"
                target="_blank"
              >
                <span>How did we obtain this data?</span>
              </Button>
            </div>
          </Tab>

          <Tab id="reviews" className="page-content" tabActive>
            <Reviews
              reviews={details.reviews}
              handleOnReviewClick={handleOnReviewClick}
            />
          </Tab>
        </Tabs>
      </div>
    </Page>
  );
};

export default Details;
