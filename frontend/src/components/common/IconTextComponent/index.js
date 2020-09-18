import React from 'react';
import './styles.css';

const IconTextComponent = ({
  icon,
  iconColor = 'var(--color-primary)',
  text,
  textColor = 'black',
}) => {
  return (
    <div className="icon-text">
      <div style={{'color': iconColor}} className="icon-text-icon">{icon}</div>
      <div style={{'color': textColor}} className="icon-text-text">{text}</div>
    </div>
  )
};

export default IconTextComponent