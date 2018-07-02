import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Star from '../Star/Star'

import './Rating.css'

const Rating = ({ rate, max = 5, color = '#31aaa7', bgColor = '#fff', emptyColor = 'lightgray' }) => (
  <div className="rating" style={{ display: 'flex' }}>
    {
      Array.from(Array(max).keys()).map(n => (
        <div className="rating__item">
          <div className="rating__starInner rating__starInner--empty" style={{  backgroundColor: emptyColor }} />
          <div
            className="rating__starInner"
            style={{  backgroundColor: color, width: rate - n > 1 ? '100%' : `${(rate - n) * 100}%` }}
          />
          <Star bgColor={bgColor} width="auto" height="100%" style={{ position: 'absolute' }} />
        </div>
      ))
    }
  </div>
)

export default Rating