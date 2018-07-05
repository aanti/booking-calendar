import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Section from '../../components/Section/Section'
import Calendar from '../../components/Calendar/Calendar'

import BasicInfo from './BasicInfo/BasicInfo'
import DateInput from './DateInput/DateInput'
import Summary from './Summary/Summary'

import './Reservation.css'

const Reservation = ({ price, rating }) => (
  <div className="reservation shadow">
    <Section>
      <BasicInfo price={price} rating={rating} />
      <DateInput renderSummary={value => <Summary {...value} price={price} />} />
    </Section>
  </div>
)

Reservation.propTypes = {
  price: PropTypes.number.isRequired,
  rating: PropTypes.shape({
    rate: PropTypes.number,
    numberOfRates: PropTypes.number
  })
}

export default Reservation
