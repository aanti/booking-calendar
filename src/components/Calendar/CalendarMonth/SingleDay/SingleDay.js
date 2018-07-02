import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './SingleDay.css'

export const DayType = {
  available: 'available',
  disabled: 'disabled',
  reserved: 'reserved',
  selected: 'selected',
  today: 'today'
}

const SingleDay = ({ number, active = true, selected, type = DayType.available, onClick }) => (
  <div className={`singleDay singleDay--${type}`} onClick={onClick}>
    {number}
  </div>
)

export default SingleDay
