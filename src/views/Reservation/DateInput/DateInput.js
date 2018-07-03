import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Arrow from '../../../components/Arrow/Arrow'
import Calendar from '../../../components/Calendar/Calendar'

import { Dates, classes } from '../../../utils'

import './DateInput.css'

const ReservationDates = ['2018/07/08', '2018/07/09', '2018/07/12', '2018/07/19', '2018/07/20', '2018/07/21']

const ModeType = {
  off: 'off',
  checkin: 'checkin',
  checkout: 'checkout'
}

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

const CheckButton = ({ value, label, disabled, checked, onClick }) => {
  const classnames = [
    'dateInput__check',
    'button',
    checked && 'dateInput__check--checked',
    disabled && 'dateInput__check--disabled'
  ].filter(v => v)
  return (
    <div className={classes(classnames)} onClick={!disabled && onClick}>
      {value || label}
    </div>
  )
}

class DateInput extends Component {
  constructor () {
    super()

    this.state = {
      mode: ModeType.off,
      value: {
        from: null,
        to: null
      }
    }

    this.handleOutsideClick = this.handleOutsideClick.bind(this)
  }

  handleOutsideClick = () => {
    this.setState({ mode: ModeType.off })
  }

  handleCheckInClick = () => {
    this.setState(({ mode }) => ({ mode: mode === ModeType.checkin ? ModeType.off : ModeType.checkin }))
  }

  handleCheckOutClick = () => {
    this.setState(({ mode }) => ({ mode: mode === ModeType.checkout ? ModeType.off : ModeType.checkout }))
  }

  handleDayClick = (date) => {
    const available = getAvailableEndDates({ start: date }, ReservationDates)
    console.log(available)
    this.setState(({ value, mode }) => ({
      value: {
        ...value,
        ...(mode === ModeType.checkin ? { from: date, ...(!available.includes(value.to) && { to: null }) } : { to: date })
      },
      mode: mode === ModeType.checkin ? ModeType.checkout : ModeType.off
    }))
  }

  render () {
    const { calendarOpen, value, mode } = this.state
    return (
      <div className="dateInput">
        <span className="dateInput__label">Dates</span>
        <div className="dateInput__dates">
          <CheckButton
            label="Check In"
            value={value.from}
            checked={mode === ModeType.checkin}
            onClick={this.handleCheckInClick}
          />
          <Arrow className="dateInput__arrow" color="#555555" direction="right" />
          <CheckButton
            label="Check Out"
            value={value.to}
            checked={mode === ModeType.checkout}
            disabled={!value.from}
            onClick={this.handleCheckOutClick}
          />
        </div>
        {
          (mode !== ModeType.off) && (
            <Calendar
              selection={{ start: value.from, n: Dates.getDayDiff(value.from, value.to || value.from) }}
              availableDates={getAvailableEndDates({ start: value.from }, ReservationDates)}
              reservation={ReservationDates}
              mode={mode}
              footerComponent={<CalendarFooter />}
              onDayClick={this.handleDayClick}
              onClickOutside={this.handleOutsideClick}
            />
          )
        }
      </div>
    )
  }
}

export default DateInput
