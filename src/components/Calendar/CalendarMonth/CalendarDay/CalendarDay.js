import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Dates, classes } from '../../../../utils'
import { DayType, Props } from '../../../../utils/common'

import './CalendarDay.css'

const isEmptyCell = (day, n) => {
  return (day <= 0 || day > n)
}

const getClasses = (types = []) => types.reduce((prev, curr) => prev.concat(`calendarMonth__day--${curr} `), '')

export const SingleDay = ({ number, onClick }) => (
  <div className={'singleDay'} onClick={onClick}>
    {number}
  </div>
)

SingleDay.defaultProps = {
  onClick: () => {}
}

SingleDay.propTypes = {
  number: PropTypes.number.isRequired,
  onClick: PropTypes.func
}

const ClickableDayType = {
  checkin: [DayType.available],
  checkout: [DayType.possible]
}

const CalendarDay = ({ month, year, day, n, types, mode, onDayClick }) => {
  const empty = isEmptyCell(day, n)
  const date = Dates.getDateString(year, month, day)
  return (
    <td className={classes(['calendarMonth__day', 'button', empty ? 'calendarMonth__day--empty' : getClasses(types)])}>
      {
        (!empty)
          ?
            <SingleDay
              number={day}
              types={types}
              {...(ClickableDayType[mode].every(type => types.includes(type)) && { onClick: () => onDayClick(date) } )}
            />
          :
            null
      }
    </td>
  )
}

CalendarDay.defaultProps = {
  types: [DayType.available],
  onDayClick: () => {}
}

CalendarDay.propTypes = {
  year: PropTypes.number,
  month: PropTypes.number,
  day: PropTypes.number,
  n: PropTypes.number,
  types: Props.dayTypes,
  mode: Props.mode,
  onDayClick: PropTypes.func
}

export default CalendarDay
