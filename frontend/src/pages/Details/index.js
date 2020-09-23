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
  const authKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQiLCJlbWFpbCI6ImFnbmVzMkBnbWFpbC5jb20iLCJhdXRoVHlwZSI6Im5hdGl2ZSIsImlhdCI6MTYwMDg1NTIwNiwiZXhwIjoxNjAwODU4ODA2fQ.UFilfB1Xv9JongrE2TxubJJU7oFm7JdF-vPK3MWg6SU';
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authKey}`,
  };

  const defaultInfo = {
    features: [],
    toilet_images: [],
    reviews: [],
    certifications: [],
  };
  const [details, setDetails] = useState(defaultInfo);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    axios.get(`${endpoints.databaseApi}/toilets/${id}`).then((res) => {
      if (res.status === 200) {
        setDetails(res.data);
      }
    });
  }, []);

  useEffect(() => {
    axios
      .get(`${endpoints.databaseApi}/customer/profile`, { headers: headers })
      .then((response) => {
        if (response.status === 200) {
          setCurrentUser(response.data);
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
              <Button external href="https://toilet.org.sg/" target="_blank">
                <span>How did we obtain this data?</span>
              </Button>
            </div>
          </Tab>

          <Tab id="reviews" className="page-content" tabActive>
            <Reviews
              currentUser={currentUser}
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
