import React, { useState, useEffect } from 'react';
import { Page, Navbar, NavLeft, NavTitle, Button, f7 } from 'framework7-react';
import { ArrowBackIos } from '@material-ui/icons';
import './styles.css';

const RewardCard = ({ reward }) => {
  return (
    <div className="margin-bottom padding-horizontal display-flex flex-direction-row align-items-center reward-card simple-shadow-skin">
      <div className="flex-20 margin-right reward-image-section">
        <img
          className="image reward-image"
          src={reward.image_url}
          alt="reward"
        />
      </div>
      <div className="flex-80">
        <h3>{reward.name}</h3>
      </div>
      <div className="reward-points grey-text">{reward.points_needed} pts</div>
    </div>
  );
};

const Rewards = (props) => {
  const { points } = props;

  const [rewards, setRewards] = useState([]);

  const rewardsStub = [
    {
      name: '$10 NTUC Voucher',
      points_needed: 50,
      image_url:
        'https://images.unsplash.com/photo-1592438224549-98c4f4b46e5a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
    },
    {
      name: '1 month toilet pass',
      points_needed: 1000,
      image_url:
        'https://images.unsplash.com/photo-1521327708881-8c1b5c6d2ce9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80',
    },
  ];

  useEffect(() => {
    setRewards(rewardsStub);
  }, []);

  return (
    <Page className="white-background-skin">
      <Navbar>
        <NavLeft>
          <Button
            onClick={() => {
              f7.views.main.router.navigate(`/profile/`, { animate: false });
            }}
          >
            <ArrowBackIos />
          </Button>
        </NavLeft>
        <NavTitle>Rewards</NavTitle>
      </Navbar>

      <div className="padding">
        <div className="text-align-center margin-bottom-double">
          <div className="margin-bottom display-flex justify-content-space-around user-info-points secondary-background-skin white-skin">
            <h4 className="no-margin">{points}</h4>
            <h4 className="no-margin">PTS</h4>
          </div>
          <p className="no-margin grey-skin">Expires on 1 Dec 2020</p>
        </div>

        <div>
          {rewards.map((reward, index) => (
            <RewardCard reward={reward} key={index} />
          ))}
        </div>
      </div>
    </Page>
  );
};

export default Rewards;
