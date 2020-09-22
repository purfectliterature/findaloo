import React, { useState, useEffect } from 'react';
import { Page, Navbar, Button, f7 } from 'framework7-react';
import UserInfo from '../../components/UserInfo';
import UserActions from '../../components/UserActions';
import './styles.css';

const Profile = () => {
  const userInfoStub = {
    id: 1,
    name: 'Yuen Jian',
    profilePicture: 'https://www.comp.nus.edu.sg/stfphotos/sooyj_2.jpg',
    email: 'sooyj@comp.nus.edu.sg',
    points: 10346,
  };

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    // TODO: Fetch from backend

    setUserInfo(userInfoStub);
  }, []);

  const handleEditProfileOnClick = () => {
    f7.views.main.router.navigate('/edit-profile/', {
      props: {
        userId: userInfo.id,
        userName: userInfo.name,
        userProfilePicture: userInfo.profilePicture,
      },
    });
  };

  const handleChangePasswordOnClick = () => {
    f7.views.main.router.navigate('/change-password/', {
      props: {
        userId: userInfo.id,
      },
    });
  };

  const handleRewardsOnClick = () => {
    f7.views.main.router.navigate('/rewards/', {
      props: {
        userId: userInfo.id,
        points: userInfo.points,
      },
    });
  };

  const handleManageReviewsOnClick = () => {
    f7.views.main.router.navigate('/manage-reviews/', {
      props: {
        userId: userInfo.id,
      },
    });
  };

  return (
    <Page className="white-background-skin">
      <Navbar backLink />

      <div className="margin display-flex flex-direction-column justify-content-space-between profile-page">
        <div>
          <UserInfo userInfo={userInfo} />
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
        >
          Logout
        </Button>
      </div>
    </Page>
  );
};

export default Profile;
