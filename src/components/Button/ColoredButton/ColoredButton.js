import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './ColoredButton.css'

const ColoredButton = ({ children, label = 'BOOK', onClick = () => {} }) => (
  <div className="coloredButton button shadow" style={{ textAlign: 'center', color: '#fff', maxWidth: 150, fontSize: 20, fontWeight: 600 }}>
    {children || label}
  </div>
)

export default ColoredButton
