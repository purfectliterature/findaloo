import React, { useState, useEffect } from 'react';
import { Page, Navbar, Button } from 'framework7-react';
import UserInfo from '../../components/UserInfo';
import './styles.css';

const Profile = () => {
  const userInfoStub = {
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

  return (
    <Page className="white-background-skin">
      <Navbar backLink />

      <div className="margin display-flex flex-direction-column justify-content-space-between">
        <div>
          <UserInfo userInfo={userInfo} />
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
