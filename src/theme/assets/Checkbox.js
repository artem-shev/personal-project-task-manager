// Core
import React from 'react';
import { string, bool, func } from 'prop-types';

// Imstruments
import transform from './Svg';

function Checkbox(props) {
  const {
    color1, color2, value, onChange,
  } = props;
  const fill = value ? color1 : color2;

  return (
    <g onClick={onChange}>
      <rect
        fill={fill}
        height="25"
        rx="5"
        ry="5"
        stroke={color1}
        style={{ strokeWidth: 2 }}
        width="25"
        x="1"
        y="1"
      />
      <path
        d="M22.12 6c-3.12 3.16-6.84 6.36-10.23 9.64l-5.42-4.05L4 14.84l6.78 5.08L12.23 21l1.25-1.25C17 16.2 21.29 12.6 25 8.89z"
        fill={color2}
      />
    </g>
  );
}

Checkbox.propTypes = {
  color1: string.isRequired,
  color2: string.isRequired,
  value: bool.isRequired,
  onChange: func,
};

Checkbox.defaultProps = {
  onChange: () => {},
};

export default transform({
  viewBoxWidth: 27, viewBoxHeight: 27, width: 25, height: 25,
})(Checkbox);
