import React from 'react';
import './styles.css';
import BasicInfo from '../../components/details/BasicInfo';

const Details = () => {
  const data = {
    images: [
      'https://images.unsplash.com/flagged/photo-1570737231926-4d67558ff216?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2843&q=80',
      'https://unsplash.com/photos/d6LzDABxP6I',
    ],
    name: 'Changi Airport T4 dept - FC Lounge',
    address: '69 Changi Highlands Rd, T4-04-102 Singapore 169420',
    review_rating: 2.5,
    reviews: 3300,
    region: 'east',
    features: {
      has_handheld_bidet: true,
      has_seat_bidet: true,
      has_toilet_paper: true,
      has_seat_cleaner: true,
      has_handicap: true,
      is_free: true,
      has_water_heater: true,
      has_hand_dryer: true,
      has_hand_soap: true,
      has_baby_change_station: true,
    },
  };

  return (
    <div>
      <BasicInfo
        name={data.name}
        address={data.address}
        ratings={data.review_rating}
        numberOfReviews={data.reviews}
      />
    </div>
  );
};

export default Details;
