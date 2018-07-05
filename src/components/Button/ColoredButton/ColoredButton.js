import React from 'react'
import PropTypes from 'prop-types'

import './ColoredButton.css'

const ColoredButton = ({ children, label, onClick }) => (
  <div className="coloredButton button shadow" onClick={onClick}>
    {children || label}
  </div>
)

ColoredButton.defaultProps = {
  label: 'BOOK',
  onClick: () => {}
}

ColoredButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func
}

export default ColoredButton
