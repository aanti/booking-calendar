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
  selected: 'selected'
}

const ClickableDayType = {
  checkin: [DayType.available],
  checkout: [DayType.possible]
}

const isEmptyCell = (day, n) => {
  return (day <= 0 || day > n)
}

const getTypes = (date, reservation, selection, availableDates) => {
  const selectionDates = Dates.getDaysArray(selection)
  return [
    (selectionDates.includes(date)) && DayType.selected,
    (availableDates.includes(date)) && DayType.possible,
    (reservation.includes(date) || Dates.isBefore(date)) ? DayType.disabled : DayType.available
  ].filter(v => v)
}

const getTypeClassNames = (types = []) => types.reduce((prev, curr) => prev.concat(`calendarMonth__day--${curr} `), '')

const DayTableCell = ({ month, year, day, n, types = ['available'], mode, onDayClick }) => {
  const isEmpty = isEmptyCell(day, n)
  const date = Dates.getDateString(year, month, day)
  return (
    <td
      className={`calendarMonth__day calendarMonth__day--${isEmpty ? 'empty' : 'nonEmpty'} ${getTypeClassNames(types)} button`}
    >
      {
        (isEmpty)
          ?
            <div style={{ height: 46, backgroundColor: '#fff' }} />
          :
            <SingleDay number={day} onClick={() => { ClickableDayType[mode].every(type => types.includes(type)) && onDayClick(date) }} types={types} />
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
                    types={getTypes(Dates.getDateString(year, month, day), reservation, selection, availableDates, mode)}
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
