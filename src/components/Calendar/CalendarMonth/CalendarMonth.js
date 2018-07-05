import React from 'react'
import PropTypes from 'prop-types'

import CalendarDay from './CalendarDay/CalendarDay'

import { Dates, nArray } from '../../../utils'
import { Props, DayType } from '../../../utils/common'

import './CalendarMonth.css'

export const getTypes = (date, reservation, selection, availableDates, disablePast) => {
  const selectionDates = Dates.getDaysArray(selection)
  const shouldBeDisabed = disablePast && Dates.isBefore(date)
  return [
    (selectionDates.includes(date)) && DayType.selected,
    (availableDates.includes(date)) && DayType.possible,
    (reservation.includes(date) || shouldBeDisabed) ? DayType.disabled : DayType.available
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
  reservation,
  availableDates,
  onDayClick
}) => (
  <div>
    <table className="calendarMonth">
      <thead>
        <tr className="calendarMonth__header">
          {
            nArray(7).map(day => (
              <td key={day}>{Dates.Day[day]}</td>
            ))
          }
        </tr>
      </thead>
      <tbody>
        {
          nArray(6).map(week => (
            <tr key={week}>
              {
                Array.from(Array(7).keys()).map(dayOfWeek => {
                  const day = 7 * week + dayOfWeek + 1 - startDay
                  const dateString = Dates.getDateString(year, month, day)
                  return (
                    <CalendarDay
                      key={day}
                      day={day}
                      month={month}
                      year={year}
                      mode={mode}
                      types={getTypes(dateString, reservation, selection, availableDates, true)}
                      n={n}
                      onDayClick={onDayClick}
                    />
                  )
                })
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
)

CalendarDay.defaultProps = {
  reservation: [],
  availableDates: [],
  onDayClick: () => {}
}

CalendarMonth.propTypes = {
  mode: Props.mode,
  selection: Props.selection,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  n: PropTypes.number.isRequired,
  startDay: PropTypes.number.isRequired,
  reservation: PropTypes.arrayOf(PropTypes.string),
  availableDates: PropTypes.arrayOf(PropTypes.string),
  onDayClick: PropTypes.func
}

export default CalendarMonth
