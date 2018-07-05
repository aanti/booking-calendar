import React from 'react'
import PropTypes from 'prop-types'

import Rating from '../../../components/Rating/Rating'

import './BasicInfo.css'

const BasicInfo = ({ price, currency = 'zł', rating: { rate, numberOfRates } }) => (
  <div className="basicInfo">
    <section className="basicInfo__priceSection">
      <span className="basicInfo__price">{price}</span>
      <span className="basicInfo__currency">{currency}</span>
      <span className="basicInfo__priceInfo">per night</span>
    </section>
    <div className="basicInfo__rating">
      <Rating rate={rate} />
      <div>{numberOfRates}</div>
    </div>
  </div>
)

BasicInfo.propTypes = {
  price: PropTypes.number.isRequired,
  currency: PropTypes.string,
  rating: PropTypes.shape({
    rate: PropTypes.number,
    numberOfRates: PropTypes.number
  })
}


export default BasicInfo
