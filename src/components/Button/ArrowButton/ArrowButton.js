import React from 'react'
import PropTypes from 'prop-types'

import Arrow from '../../Arrow/Arrow'

import './ArrowButton.css'

const DirectionType = {
  left: 'left',
  right: 'right'
}

const ArrowButton = ({ direction, disabled, onClick }) => (
  <div className={`arrowButton arrowButton--${disabled ? 'disabled' : 'active'}`} {...(!disabled && { onClick })}>
    <Arrow direction={direction} color="gray" />
  </div>
)

ArrowButton.propTypes = {
  direction: PropTypes.oneOf([DirectionType.left, DirectionType.right]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func
}

export default ArrowButton
