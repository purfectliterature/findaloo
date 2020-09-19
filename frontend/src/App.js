import React from 'react';
import { App, View } from 'framework7-react';
import './App.css';
import Details from './pages/Details';
import CreateReviews from './pages/CreateReview';

const f7params = {
  root: '#app', // App root element
  id: 'io.framework7.testapp', // App bundle ID
  name: 'Framework7', // App name
  theme: 'auto', // Automatic theme detection
  // App routes
  routes: [
    {
      path: '/toilets/:id/',
      component: Details,
    },
    {
      path: '/reviews/create/',
      component: CreateReviews,
    },
  ],
};

function Main() {
  return (
    <App params={f7params}>
      <View main url="/toilets/:id/" />
    </App>
  );
}

export default Main;
