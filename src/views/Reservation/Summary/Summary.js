import React from 'react'
import PropTypes from 'prop-types'

import ColoredButton from '../../../components/Button/ColoredButton/ColoredButton'

import { Dates } from '../../../utils'

import './Summary.css'

const Summary = ({ from, to, price, currency = 'zł' }) => {
  const numberOfDays = Dates.getDayDiff(from, to)
  return (
    <div className="summary">
      <div className="summary__item">
        <div className="summary__item__label">Length of stay: </div>
        <div><span className="summary__item__value">{numberOfDays} days</span></div>
      </div>
      <div className="summary__item">
        <div className="summary__item__label">Summary price: </div>
        <div>
          <span className="summary__item__value">{`${numberOfDays} x ${price} = ${price * numberOfDays}`} {currency}
          </span>
        </div>
      </div>
      <ColoredButton>BOOK</ColoredButton>
    </div>
  )
}

Summary.propTypes = {
  from: PropTypes.string,
  to: PropTypes.string,
  price: PropTypes.number,
  currency: PropTypes.string
}

export default Summary
