import React from 'react';
import { Button } from 'framework7-react';
import {
  AccessibleOutlined,
  AttachMoney,
  MoneyOff,
  Check,
  Close,
  VerifiedUserOutlined,
  OpenInNew,
  Wc,
} from '@material-ui/icons';
import IconText from '../IconText';
import {
  FEATURE_TO_TEXT,
  FEATURE_BOTH_LAVATORIES,
  FEATURE_MALE_LAVATORIES,
  FEATURE_FEMALE_LAVATORIES,
  FEATURE_HANDICAP,
  FEATURE_FREE_TOILET,
  FEATURE_PAID_TOILET,
} from '../../strings';
import './styles.css';

const ImportantInformation = ({ features }) => {
  let genderText = FEATURE_MALE_LAVATORIES;
  if (features.has_female && features.has_male) {
    genderText = FEATURE_BOTH_LAVATORIES;
  } else if (features.has_female) {
    genderText = FEATURE_FEMALE_LAVATORIES;
  }

  let freeSection = (
    <IconText icon={<AttachMoney />} text={FEATURE_PAID_TOILET} />
  );
  if (features.is_free) {
    freeSection = <IconText icon={<MoneyOff />} text={FEATURE_FREE_TOILET} />;
  }

  return (
    <div className="padding-vertical grey-bottom-border">
      {(features.has_female || features.has_male) && (
        <IconText icon={<Wc />} text={genderText} />
      )}
      {features.has_handicap && (
        <IconText icon={<AccessibleOutlined />} text={FEATURE_HANDICAP} />
      )}
      {typeof features.is_free !== 'undefined' && 
        freeSection
      }
    </div>
  );
};

const Features = ({ features }) => {
  let featuresIncluded = [];
  let featuresExcluded = [];
  const featuresToSkip = ['is_free', 'has_handicap', 'has_female', 'has_male'];
  for (const key in features) {
    if (featuresToSkip.includes(key)) {
      continue;
    }

    if (features[key]) {
      featuresIncluded.push(
        <IconText icon={<Check />} text={FEATURE_TO_TEXT[key]} />
      );
    } else {
      featuresExcluded.push(
        <IconText
          icon={<Close />}
          iconColor="var(--color-grey-3)"
          text={FEATURE_TO_TEXT[key]}
          textColor="var(--color-grey-3)"
        />
      );
    }
  }

  return (
    <div className="padding-vertical display-flex flex-direction-row grey-bottom-border">
      <div className="margin-right">
        {featuresIncluded.map((feature, index) => (
          <span key={index}>{feature}</span>
        ))}
      </div>
      <div className="margin-horizontal">
        {featuresExcluded.map((feature, index) => (
          <span key={index}>{feature}</span>
        ))}
      </div>
    </div>
  );
};

const Certificates = ({ certificates }) => {
  return (
    <div className="padding-vertical">
      {certificates.map((certificate, index) => (
        <div
          key={index}
          className="display-flex flex-direction-row margin-bottom"
        >
          <div className="margin-right-half display-flex flex-direction-row align-items-flex-start flex-80">
            <div
              className="certificate-icon primary-skin"
              style={{ visibility: index !== 0 ? 'hidden' : 'visible' }}
            >
              <VerifiedUserOutlined />
            </div>
            <div>
              <p className="no-margin margin-bottom">
                Certified by {certificate.certification_authority}
              </p>
              <Button
                outline
                external
                href={certificate.certification_webpage}
                target="_blank"
                className="learn-more-btn main-outlined-button-skin"
              >
                <span>Learn more</span>
                <OpenInNew />
              </Button>
            </div>
          </div>
          <div className="flex-20 text-align-right">
            <img
              src={certificate.certification_logo}
              className="certificate-logo"
              alt="certificate logo"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const OverviewComponent = ({ features, certificates }) => {
  return (
    <div className="tab-info">
      <ImportantInformation features={features} />
      <Features features={features} />
      <Certificates certificates={certificates} />
    </div>
  );
};

export default OverviewComponent;
