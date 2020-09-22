import React from 'react';
import './styles.css';

const UserInfo = ({ userInfo }) => {
  return (
    <div className="padding">
      <div className="margin-bottom user-info-profile-picture">
        <img
          className="image user-profile-image"
          src={userInfo.profilePicture}
          alt="profile"
        />
      </div>

      <div className="text-align-center margin-bottom">
        <h3 className="no-margin">{userInfo.name}</h3>
        <p className="no-margin grey-text">{userInfo.email}</p>
      </div>

      <div className="display-flex justify-content-space-around user-info-points secondary-background-skin white-skin">
        <h4 className="no-margin">{userInfo.points}</h4>
        <h4 className="no-margin">PTS</h4>
      </div>
    </div>
  );
};

export default UserInfo;
