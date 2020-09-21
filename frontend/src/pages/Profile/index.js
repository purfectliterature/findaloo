import React from 'react';
import { Page, Navbar, Button } from "framework7-react";
import './styles.css';

const Profile = () => {
  return (
    <Page className="white-background-skin">
      <Navbar backLink />

      <div className="margin display-flex flex-direction-column justify-content-space-between"> 
        <Button outline className="padding-vertical display-flex justify-content-center red-outline-skin">Logout</Button>
      </div>
    </Page>
  )
}

export default Profile;