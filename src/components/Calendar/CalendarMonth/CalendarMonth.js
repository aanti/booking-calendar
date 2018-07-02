import React from 'react'
import PropTypes from 'prop-types'

import CalendarDay from './CalendarDay/CalendarDay'

import { Dates, classes, nArray } from '../../../utils'
import { DayType } from './CalendarDay/CalendarDay'

import './CalendarMonth.css'

const getTypes = (date, reservation, selection, availableDates) => {
  const selectionDates = Dates.getDaysArray(selection)
  return [
    (selectionDates.includes(date)) && DayType.selected,
    (availableDates.includes(date)) && DayType.possible,
    (reservation.includes(date) || Dates.isBefore(date)) ? DayType.disabled : DayType.available
  ].filter(v => v)
}

const CalendarMonth = ({
  year,
  month,
  n,
  startDay,
  current,
  mode,
  selection,
  reservation = [],
  availableDates = [],
  onDayClick
}) => (
  <div>
    <table className="calendarMonth">
      <tr className="calendarMonth__header">
        {
          nArray(7).map(day => (
            <td>{Dates.Day[day]}</td>
          ))
        }
      </tr>
      {
        nArray(6).map(week => (
          <tr>
            {
              Array.from(Array(7).keys()).map(dayOfWeek => {
                const day = 7 * week + dayOfWeek + 1 - startDay
                return (
                  <CalendarDay
                    day={day}
                    month={month}
                    year={year}
                    mode={mode}
                    types={getTypes(Dates.getDateString(year, month, day), reservation, selection, availableDates)}
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
