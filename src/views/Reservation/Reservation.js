import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Section from '../../components/Section/Section'
import Calendar from '../../components/Calendar/Calendar'

import BasicInfo from './BasicInfo/BasicInfo'
import DateInput from './DateInput/DateInput'

const Reservation = ({ price, rating, availableDates }) => (
  <div style={{ width: 480, backgroundColor: '#fff' }}>
    <Section>
      <BasicInfo price={price} rating={rating} />
      <DateInput />
    </Section>
  </div>
)

export default Reservation
