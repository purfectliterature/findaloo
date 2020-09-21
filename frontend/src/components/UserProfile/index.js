import React from 'react';
import './styles.css';

const UserProfileComponent = ({ user }) => {
  return (
    <div className="margin display-flex flex-direction-row align-items-center">
      <div className="margin-right create-review-user-profile-image">
        <img className="image user-profile-image" src={user.profile_image} alt={`${user.name} profile`} />
      </div>

      <div>
        <p className="no-margin">{user.name}</p>
      </div> 
    </div>
  )
}

export default UserProfileComponent;