import React from 'react';
import { Swiper, SwiperSlide, Button } from 'framework7-react';
import { Report, Share, ArrowBack } from '@material-ui/icons';
import './styles.css';

const BasicInfoImage = ({
  images,
  handleShareOnClick,
  handleReportOnClick,
}) => {
  return (
    <div
      className="swiper-image-section"
      style={{ height: images.length > 0 ? '200px' : '20px' }}
    >
      {images.length > 0 && (
        <Swiper pagination className="swiper">
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt="toilet" className="image" />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className="display-flex flex-direction-row justify-content-space-between actions">
        <div>
          <Button
            back
            className={`actions-btn ${
              images.length > 0 ? 'white-skin' : 'primary-skin'
            } `}
          >
            <ArrowBack />
          </Button>
        </div>
        <div>
          <Button
            onClick={handleShareOnClick}
            className={`actions-btn ${
              images.length > 0 ? 'white-skin' : 'primary-skin'
            } `}
          >
            <Share />
          </Button>
          <Button
            onClick={handleReportOnClick}
            className={`actions-btn ${
              images.length > 0 ? 'white-skin' : 'primary-skin'
            } `}
          >
            <Report />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoImage;
