import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Dates, classes } from '../../../../utils'

import './CalendarDay.css'

const SingleDay = ({ number, active = true, selected, types, onClick }) => (
  <div className={'singleDay'} onClick={onClick}>
    {number}
  </div>
)

export const DayType = {
  available: 'available',
  disabled: 'disabled',
  possible: 'possible',
  selected: 'selected'
}

const ClickableDayType = {
  checkin: [DayType.available],
  checkout: [DayType.possible]
}

const isEmptyCell = (day, n) => {
  return (day <= 0 || day > n)
}

const getClasses = (types = []) => types.reduce((prev, curr) => prev.concat(`calendarMonth__day--${curr} `), '')

const CalendarDay = ({ month, year, day, n, types = ['available'], mode, onDayClick }) => {
  const empty = isEmptyCell(day, n)
  const date = Dates.getDateString(year, month, day)
  return (
    <td className={classes(['calendarMonth__day', 'button', empty ? 'calendarMonth__day--empty' : getClasses(types)])}>
      {
        (!empty)
          ?
          <SingleDay
            number={day}
            onClick={() => { ClickableDayType[mode].every(type => types.includes(type)) && onDayClick(date) }}
            types={types}
          />
          :
          null
      }
    </td>
  )
}

export default CalendarDay
