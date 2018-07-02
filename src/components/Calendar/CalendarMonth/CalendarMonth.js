import React from 'react'
import PropTypes from 'prop-types'

import SingleDay from './SingleDay/SingleDay'

import * as Dates from '../../../utils/dates/dates'

import './CalendarMonth.css'

const Day = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const DayType = {
  available: 'available',
  disabled: 'disabled',
  possible: 'possible',
  reserved: 'reserved',
  selected: 'selected',
  today: 'today'
}

const isEmptyCell = (day, n) => {
  return (day <= 0 || day > n)
}

const getType = (date, reservation, selection, availableDates) => {
  //console.log('getType', date, reservation, reservation.includes(date))
  let type = 'available'
  if (selection.start === date) {
    type = 'selected'
  } else if (availableDates.includes(date)) {
    type = 'possible'
  } else if (reservation.includes(date) || Dates.isBefore(date)) {
    type = 'disabled'
  }
  return type
}

const ClickableDayType = {
  checkin: ['available', 'possible'],
  checkout: ['possible']
}

const DayTableCell = ({ month, year, day, n, type = 'available', mode, onDayClick }) => {
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
            <SingleDay number={day} onClick={() => { ClickableDayType[mode].includes(type) && onDayClick(date) }} type={type} />
      }
    </td>
  )
}

const CalendarMonth = ({ year, month, n = 28, startDay = 5, current, mode, selection, reservation = [], selected = [], availableDates = [], size = 46, onDayClick }) => (
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
                    mode={mode}
                    type={getType(Dates.getDateString(year, month, day), reservation, selection, availableDates)}
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
