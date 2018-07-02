import React from 'react'
import PropTypes from 'prop-types'

const Marker = ({ fillColor = '#fff', borderColor = '#c8c8c8', ...props }) => (
  <svg viewBox="0 0 136.652 74.912" {...props}>
    <g strokeWidth={1.904} strokeLinecap="round">
      <path d="M136.652 67.84H0L68.326 0z" fill={borderColor} />
      <path d="M136.652 74.912H0l68.326-67.84z" fill={fillColor} />
    </g>
  </svg>
)

export default Marker
