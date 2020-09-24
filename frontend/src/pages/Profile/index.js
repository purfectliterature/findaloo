import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Page, Navbar, Button, f7 } from 'framework7-react';
import UserInfo from '../../components/UserInfo';
import UserActions from '../../components/UserActions';
import './styles.css';

import { setUserInfo, getTokens } from '../../store/user';
import { fetchUserInfo } from '../../utils/user';
import { logout } from '../../utils/auth';

const Profile = () => {
  const [userDetails, setUserDetails] = useState({});
  const userTokens = useSelector(getTokens);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUserInfo(userTokens.authToken, (data) => {
      setUserDetails(data);
      dispatch(setUserInfo(data));
    });
  }, []);

  const handleLogoutOnClick = () => {
    logout(
      userTokens.refreshToken,
      (data) => {
        f7.views.main.router.navigate('/');
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const handleEditProfileOnClick = () => {
    f7.views.main.router.navigate('/edit-profile/');
  };

  const handleChangePasswordOnClick = () => {
    f7.views.main.router.navigate('/change-password/');
  };

  const handleRewardsOnClick = () => {
    f7.views.main.router.navigate('/rewards/', {
      props: {
        points: userDetails.points,
      },
    });
  };

  const handleManageReviewsOnClick = () => {
    f7.views.main.router.navigate('/manage-reviews/');
  };

  return (
    <Page className="white-background-skin">
      <Navbar backLink />

      <div className="margin display-flex flex-direction-column justify-content-space-between profile-page">
        <div>
          <UserInfo userInfo={userDetails} />
          <UserActions
            handleEditProfileOnClick={handleEditProfileOnClick}
            handleChangePasswordOnClick={handleChangePasswordOnClick}
            handleRewardsOnClick={handleRewardsOnClick}
            handleManageReviewsOnClick={handleManageReviewsOnClick}
          />
        </div>
        <Button
          outline
          className="padding-vertical display-flex justify-content-center red-outline-skin"
          onClick={handleLogoutOnClick}
        >
          Logout
        </Button>
      </div>
    </Page>
  );
};

export default Profile;
