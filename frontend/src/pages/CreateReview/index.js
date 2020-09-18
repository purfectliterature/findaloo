import React from 'react';
import { Page, Navbar, NavRight, Button, f7 } from 'framework7-react';
import './styles.css';

const CreateReviews = (props) => {
  // const { id, rating, title } = props;
  const id = 1;
  const rating = 2;
  const title = 'peepoo peepoo';
  const currentUser = {
    name: 'Its me!',
    profileImage: 'https://www.comp.nus.edu.sg/stfphotos/sooyj_2.jpg',
  };

  const handlePostOnClick = (rating, title, description) => {
    console.log('rating', rating);
    console.log('title', title);
    console.log('description', description);

    // TODO: API CALL

    f7.views.main.router.navigate(`/toilets/${id}/`);
  };

  return (
    <Page>
      <Navbar backLink title={title}>
        <NavRight>
          <Button
            onClick={() => {
              handlePostOnClick(rating);
            }}
          >
            Post
          </Button>
        </NavRight>
      </Navbar>
    </Page>
  );
};

export default CreateReviews;
