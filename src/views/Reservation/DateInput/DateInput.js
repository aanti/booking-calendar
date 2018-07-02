import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Arrow from '../../../components/Arrow/Arrow'
import Calendar from '../../../components/Calendar/Calendar'

import * as Dates from '../../../utils/dates/dates'

import './DateInput.css'


class DateInput extends Component {
  constructor () {
    super()

    this.state = {
      calendarOpen: false,
      mode: 'off',
      value: {
        from: null,
        to: null
      }
    }
  }

  handleInputClick = () => {
    console.log('handle click')
    this.setState(({ calendarOpen }) => ({ calendarOpen: !calendarOpen }))
  }

  handleCheckInClick = () => {
    this.setState(({ mode }) => ({ mode: mode === 'checkin' ? 'off' : 'checkin' }))
  }

  handleCheckOutClick = () => {
    this.setState(({ mode }) => ({ mode: mode === 'checkout' ? 'off' : 'checkout' }))
  }

  handleDayClick = (date) => {
    console.log('handle day click', date)
    this.setState(({ value, mode }) => ({
      value: {
        ...value,
        ...(mode === 'checkin' ? { from: date } : { to: date })
      },
      mode: mode === 'checkin' ? 'checkout' : 'off'
    }))
  }

  render () {
    const { calendarOpen, value, mode } = this.state
    return (
      <div className="dateInput">
        <span className="dateInput__label">Dates</span>
        <div className="dateInput__dates">
          <div className={`dateInput__check ${mode === 'checkin' && 'dateInput__check--checked'} button`} onClick={this.handleCheckInClick}>
            {
              (value.from) || 'Check In'
            }
          </div>
          <Arrow className="dateInput__arrow" color="#555555" direction="right" />
          <div className={`dateInput__check ${mode === 'checkout' && 'dateInput__check--checked'} button`} onClick={this.handleCheckOutClick}>
            {
              (value.to) || 'Check Out'
            }
          </div>
        </div>
        {
          mode !== 'off' && <Calendar onDayClick={this.handleDayClick} />
        }
      </div>
    )
  }
}

export default DateInput
