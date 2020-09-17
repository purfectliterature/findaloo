import React from 'react';
import { Swiper, SwiperSlide, Button } from 'framework7-react';
import { Report, Share, ArrowBack } from '@material-ui/icons';

const BasicInfoImage = ({ images, handleShareOnClick, handleReportOnClick }) => {
  return (
    <div className="image-section">
      <Swiper pagination className="swiper">
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image} alt="toilet" className="image" />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="display-flex flex-direction-row justify-content-space-between actions">
        <div>
          <Button back href="false" className="actions-btn actions-btn-skin"> 
            <ArrowBack />
          </Button>
        </div>
        <div>
          <Button href="false" onClick={handleShareOnClick} className="actions-btn actions-btn-skin">
            <Share />
          </Button>
          <Button href="false" onClick={handleReportOnClick} className="actions-btn actions-btn-skin">
            <Report />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoImage;
