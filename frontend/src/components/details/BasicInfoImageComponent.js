import React from 'react';
import { Swiper, SwiperSlide, Button } from 'framework7-react';
import { Report, Share, ArrowBack } from '@material-ui/icons';

const BasicInfoImage = ({ images, handleBackOnClick, handleShareOnClick, handleReportOnClick }) => {
  return (
    <div className="image-section">
      <Swiper pagination navigation scrollbar className="swiper">
        {/* <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide> */}
        {images.map((image, index) => (
          <SwiperSlide>
            <img src={image} alt="toilet image" className="image" />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="actions flex-row">
        <div>
          <Button onClick={handleBackOnClick} className="actions-btn actions-btn-skin"> 
            <ArrowBack />
          </Button>
        </div>
        <div>
          <Button onClick={handleShareOnClick} className="actions-btn actions-btn-skin">
            <Share />
          </Button>
          <Button onClick={handleReportOnClick} className="actions-btn actions-btn-skin">
            <Report />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoImage;
