import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Page, Tabs, Tab, Toolbar, Link, Button, f7 } from 'framework7-react';
import './styles.css';
import BasicInfoImage from '../../components/BasicInfoImage';
import BasicInfo from '../../components/BasicInfo';
import Overview from '../../components/Overview';
import Reviews from '../../components/Reviews';

import { addToilet, getToiletDetails } from '../../store/toilets';
import { getUserInfo, getTokens } from '../../store/user';
import { fetchToiletDetails } from '../../utils/toilets';

const Details = (props) => {
  const { id } = props;

  const defaultInfo = {
    features: [],
    toilet_images: [],
    reviews: [],
    certifications: [],
  };
  const [details, setDetails] = useState(defaultInfo);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector(getUserInfo);
  const userTokens = useSelector(getTokens);
  const storeDetails = useSelector(getToiletDetails(id));

  useEffect(() => {
    if (userTokens && userTokens.authToken) {
      setIsUserLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    fetchToiletDetails(
      id,
      (data) => {
        setDetails(data);
        dispatch(addToilet(id, data));
      },
      (err) => {
        console.log(err);

        if (err.message === 'Network Error') {
          if (typeof storeDetails !== 'undefined') {
            setDetails(storeDetails);
          }
        }
      }
    );
  }, []);

  const handleBackOnClick = () => {
    f7.views.main.router.back('/', { force: true });
  };

  const handleShareOnClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${details.title}`,
          url: `https://findaloo.netlify.app/toilets/${id}`,
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    }
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

  const handleOnLoginClick = () => {
    f7.views.main.router.navigate('/login/');
  }

  return (
    <Page className="white-background-skin">
      <BasicInfoImage
        isUserLoggedIn={isUserLoggedIn}
        images={details.toilet_images}
        handleShareOnClick={handleShareOnClick}
        handleReportOnClick={handleReportOnClick}
        handleBackOnClick={handleBackOnClick}
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
              isUserLoggedIn={isUserLoggedIn}
              currentUser={currentUser}
              reviews={details.reviews}
              handleOnReviewClick={handleOnReviewClick}
              handleOnLoginClick={handleOnLoginClick}
            />
          </Tab>
        </Tabs>
      </div>
    </Page>
  );
};

export default Details;
