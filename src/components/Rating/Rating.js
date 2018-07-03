import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Star from '../Star/Star'

import { nArray } from '../../utils'

import './Rating.css'

const Rating = ({ rate, max = 5, color = '#31aaa7', bgColor = '#fff', emptyColor = 'lightgray' }) => (
  <div className="rating" style={{ display: 'flex' }}>
    {
      nArray(max).map((n, i) => (
        <div key={i} className="rating__item">
          <div className="rating__starInner rating__starInner--empty" style={{  backgroundColor: emptyColor }} />
          <div
            className="rating__starInner"
            style={{  backgroundColor: color, width: rate - n > 1 ? '100%' : `${(rate - n) * 100}%` }}
          />
          <Star bgColor={bgColor} style={{ position: 'absolute', width: 'auto', height: '100%' }} />
        </div>
      ))
    }
  </div>
)

export default Rating