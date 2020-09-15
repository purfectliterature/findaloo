import React from 'react';
import {
  AccessibleOutlined,
  AttachMoney,
  MoneyOff,
  Check,
  Close,
  VerifiedUser,
  OpenInNew,
} from '@material-ui/icons';
import IconTextComponent from '../common/IconTextComponent';
import { FEATURE_TO_TEXT } from '../../strings';

const ImportantInformation = ({ features }) => {
  let freeSection = (
    <IconTextComponent icon={<AttachMoney />} text="Pay per use" />
  );
  if (features.is_free) {
    freeSection = <IconTextComponent icon={<MoneyOff />} text="Free" />;
  }

  return (
    <div className="overview-subsection grey-bottom-border">
      {features.has_handicap && (
        <IconTextComponent
          icon={<AccessibleOutlined />}
          text="Handicap toilets available"
        />
      )}
      {freeSection}
    </div>
  );
};

const Features = ({ features }) => {
  let featuresIncluded = [];
  let featuresExcluded = [];
  const featuresToSkip = ['is_free', 'has_handicap'];
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
    <div className="overview-subsection grey-bottom-border flex-row">
      <div className="overview-features-left">
        {featuresIncluded.map((feature, index) => (
          <span key={index}>{feature}</span>
        ))}
      </div>
      <div className="overview-features-right">
        {featuresExcluded.map((feature, index) => (
          <span key={index}>{feature}</span>
        ))}
      </div>
    </div>
  );
};

const Certificates = ({ certificates }) => {
  return (
    <div className="overview-subsection">
      {certificates.map((certificate, index) => (
        <div key={index} className="flex-row separator">
          <div className="flex-80 flex-row flex-align-top">
            <div className="certificate-icon certificate-icon-skin">
              <VerifiedUser />
            </div>
            <div>
              <p className="p-margin">
                Certified by {certificate.certification_authority}
              </p>
              <a
                href={certificate.url}
                target="_blank"
                rel="noopener noreferrer"
                className="learn-more-btn main-outlined-button-skin"
              >
                <span>Learn more</span>
                <OpenInNew/>
              </a>
            </div>
          </div>
          <div className="flex-20">
            <img src={certificate.logo} className="certificate-logo" alt='certificate logo'/>
          </div>
        </div>
      ))}
    </div>
  );
};

const OverviewComponent = ({ features, certificates }) => {
  return (
    <div className="tabInfo">
      <ImportantInformation features={features} />
      <Features features={features} />
      <Certificates certificates={certificates} />
    </div>
  );
};

export default OverviewComponent;
