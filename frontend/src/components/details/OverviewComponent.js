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
import IconTextComponent from '../common/IconTextComponent';
import {
  FEATURE_TO_TEXT,
  FEATURE_BOTH_LAVATORIES,
  FEATURE_MALE_LAVATORIES,
  FEATURE_FEMALE_LAVATORIES,
  FEATURE_HANDICAP,
  FEATURE_FREE_TOILET,
  FEATURE_PAID_TOILET,
} from '../../strings';

const ImportantInformation = ({ features }) => {
  let genderText = FEATURE_MALE_LAVATORIES;
  if (features.has_female && features.has_male) {
    genderText = FEATURE_BOTH_LAVATORIES;
  } else if (features.has_female) {
    genderText = FEATURE_FEMALE_LAVATORIES;
  }

  let freeSection = (
    <IconTextComponent icon={<AttachMoney />} text={FEATURE_PAID_TOILET} />
  );
  if (features.is_free) {
    freeSection = (
      <IconTextComponent icon={<MoneyOff />} text={FEATURE_FREE_TOILET} />
    );
  }

  return (
    <div className="padding-vertical grey-bottom-border">
      <IconTextComponent icon={<Wc />} text={genderText} />
      {features.has_handicap && (
        <IconTextComponent
          icon={<AccessibleOutlined />}
          text={FEATURE_HANDICAP}
        />
      )}
      {freeSection}
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
        <IconTextComponent icon={<Check />} text={FEATURE_TO_TEXT[key]} />
      );
    } else {
      featuresExcluded.push(
        <IconTextComponent
          icon={<Close />}
          iconColor="var(--color-grey-3)"
          text={FEATURE_TO_TEXT[key]}
          textColor="var(--color-grey-3)"
        />
      );
    }
  }

  return (
    <div className="padding-vertical display-flex flex-direction-row justify-content-space-between grey-bottom-border">
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
              className="certificate-icon certificate-icon-skin"
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
                href={certificate.url}
                target="_blank"
                className="learn-more-btn main-outlined-button-skin"
              >
                <span>Learn more</span>
                <OpenInNew />
              </Button>
            </div>
          </div>
          <div className="flex-20">
            <img
              src={certificate.logo}
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
