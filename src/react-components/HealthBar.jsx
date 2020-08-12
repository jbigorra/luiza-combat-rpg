import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './HealthBar.css';

export default function HealthBar (props) {
  const { healthBarId, healthFillerId } = props;
  const [health, setHealth] = useState(100);

  useEffect(() => {
    const hFiller = document.getElementById(healthFillerId);
    hFiller.style.width = health + '%';
  }, [health, healthFillerId]);

  function minHealth (current, minimumAllowed) {
    return current < minimumAllowed ? minimumAllowed : current;
  }

  function maxHealth (current, maximumAllowed) {
    return current > maximumAllowed ? maximumAllowed : current;
  }

  function increaseHealth (e) {
    setHealth(h => maxHealth(h + 5, 100));
  }

  function decreaseHealth (e) {
    setHealth(h => minHealth(h - 5, 0));
  }

  return (
    <div>
      <div className="health-buttons">
        <span className="increase-health-button" onClick={increaseHealth}>+</span>
        <span className="decrease-health-button" onClick={decreaseHealth}>-</span>
      </div>
      <div id={healthBarId} className="health-bar">
        <div id={healthFillerId} className="health-filler"></div>
      </div>
    </div>
  );
}

HealthBar.propTypes = {
  healthBarId: PropTypes.string,
  healthFillerId: PropTypes.string,
  healthPercentage: PropTypes.number
};
