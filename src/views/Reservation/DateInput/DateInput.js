import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Arrow from '../../../components/Arrow/Arrow'
import Calendar from '../../../components/Calendar/Calendar'

import * as Dates from '../../../utils/dates/dates'

import './DateInput.css'

const ReservationDates = ['2018/07/08', '2018/07/09', '2018/07/12', '2018/07/19', '2018/07/20', '2018/07/21']

const CalendarFooter = ({ updateDate }) => (
  <div>
    <div>Minimum stay varies</div>
    {
      (updateDate) ? <div>Updated {updateDate} days ago</div> : null
    }
  </div>
)

const getAvailableEndDates = (selection, reservation = [], max = 14) => {
  if (!selection || !selection.start) return []
  let i = 0, day = Dates.getNextDay(selection.start)
  const result = []
  while (i < max && !reservation.includes(day)) {
    result.push(day)
    day = Dates.getNextDay(day)
    i++
  }
  result.push(day)
  return result
}

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
    const available = getAvailableEndDates({ start: date }, ReservationDates)
    console.log(available)
    this.setState(({ value, mode }) => ({
      value: {
        ...value,
        ...(mode === 'checkin' ? { from: date, ...(!available.includes(value.to) && { to: null }) } : { to: date })
      },
      mode: mode === 'checkin' ? 'checkout' : 'off'
    }))
  }

  render () {
    const { calendarOpen, value, mode } = this.state
    //console.log(getAvailableEndDates({ start: '2018/07/01' }, ReservationDates))
    //console.log(Dates.getNextDay("2018/07/07"))
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
          mode !== 'off' && (
            <Calendar
              selection={{ start: value.from, n: Dates.getDayDiff(value.from, value.to || value.from) }}
              availableDates={getAvailableEndDates({ start: value.from }, ReservationDates)}
              reservation={ReservationDates}
              mode={mode}
              footerComponent={<CalendarFooter />}
              onDayClick={this.handleDayClick}
            />
          )
        }
      </div>
    )
  }
}

export default DateInput
