import React from 'react'
import PropTypes from 'prop-types'

import SingleDay from './SingleDay/SingleDay'

import * as Dates from '../../../utils/dates/dates'

import './CalendarMonth.css'

const Day = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const DayType = {
  available: 'available',
  disabled: 'disabled',
  reserved: 'reserved',
  selected: 'selected',
  today: 'today'
}

const isEmptyCell = (day, n) => {
  return (day <= 0 || day > n)
}

const DayTableCell = ({ month, year, day, n, type = 'available', onDayClick }) => {
  const isEmpty = isEmptyCell(day, n)
  const date = Dates.getDateString(year, month, day)
  return (
    <td
      className={`calendarMonth__day calendarMonth__day--${isEmpty ? 'empty' : 'nonEmpty'} calendarMonth__day--${type} button`}
    >
      {
        (isEmpty)
          ?
            <div style={{ height: 46, backgroundColor: '#fff' }} />
          :
            <SingleDay number={day} onClick={() => onDayClick(date)} type={Dates.isBefore(date) ? 'disabled' : undefined} />
      }
    </td>
  )
}

const CalendarMonth = ({ year, month, n = 28, startDay = 5, current, selected = 40, size = 46, onDayClick }) => (
  <div>
    <table className="calendarMonth">
      <tr className="calendarMonth__header">
        {
          Array.from(Array(7).keys()).map(day => (
            <td>{Day[day]}</td>
          ))
        }
      </tr>
      {
        Array.from(Array(6).keys()).map((week) => (
          <tr>
            {
              Array.from(Array(7).keys()).map(dayOfWeek => {
                const day = 7 * week + dayOfWeek + 1
                return (
                  <DayTableCell
                    day={day - startDay}
                    month={month}
                    year={year}
                    n={n}
                    onDayClick={onDayClick}
                  />
                )
              })
            }
          </tr>
        ))
      }
    </table>
  </div>
)

export default CalendarMonth
