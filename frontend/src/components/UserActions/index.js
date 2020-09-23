import React from 'react';
import { List, ListItem } from 'framework7-react';

const UserActions = ({
  handleChangePasswordOnClick,
  handleEditProfileOnClick,
  handleRewardsOnClick,
  handleManageReviewsOnClick,
}) => {
  return (
    <div>
      <List>
        <ListItem
          title="Edit Profile"
          link="#"
          onClick={handleEditProfileOnClick}
        />
        <ListItem
          title="Change Password"
          link="#"
          onClick={handleChangePasswordOnClick}
        />
        <ListItem title="Rewards" link="#" onClick={handleRewardsOnClick} />
        <ListItem
          title="Manage Reviews"
          link="#"
          onClick={handleManageReviewsOnClick}
        />
      </List>
    </div>
  );
};

export default UserActions;
