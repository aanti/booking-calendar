import React, { Component } from 'react'
import PropTypes from 'prop-types'

import * as Dates from '../../utils/dates/dates'

import Section from '../Section/Section'
import ArrowButton from '../Button/ArrowButton/ArrowButton'
import Marker from '../Marker/Marker'

import CalendarMonth from './CalendarMonth/CalendarMonth'

const CalendarContent = ({ month, year, onNextMonthClick, onPrevMonthClick, onDayClick }) => {
  const prevButtonDisabled = Dates.isBefore(Dates.getDateString(year, month, 1))
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 5 }}>
        <ArrowButton onClick={onPrevMonthClick} disabled={prevButtonDisabled} />
        <div style={{ fontWeight: 900, fontSize: 22, color: "#333" }}>
          <span style={{ paddingRight: 10 }}>{Dates.getMonthName(month)}</span>
          <span>{year}</span>
        </div>
        <ArrowButton direction="right" onClick={onNextMonthClick} />
      </div>
      <CalendarMonth year={year} month={month} n={Dates.getNumberOfDays(year, month)} startDay={Dates.getDayOfWeek(year, month, 1)} onDayClick={onDayClick} />
    </div>
  )
}

const CalendarPaper = ({ markerPosition = 'left', markerOffset = 50, children }) => (
  <div style={{ position: 'relative', width: 380 }}>
    <div style={{ width: 26, height: 26, position: 'absolute', top: -12, ...(markerPosition === 'left' ? { left: markerOffset } : { right: markerOffset }) }}>
      <Marker />
    </div>
    <div style={{ border: '1px solid #c8c8c8', borderRadius: 4, padding: 20 }}>
      {children}
    </div>
  </div>
)

class Calendar extends Component {
  constructor () {
    super()
    const currentDate = new Date()
    this.state = {
      date: {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1
      }
    }
  }

  handleNextMonthClick = () => {
    this.setState(({ date }) => ({ date: Dates.getNextMonth(date) }))
  }

  handlePrevMonthClick = () => {
    this.setState(({ date }) => ({ date: Dates.getPrevMonth(date) }))
  }

  render () {
    const { onDayClick } = this.props
    return (
      <div style={{ padding: 20 }}>
        <CalendarPaper markerPosition="right">
          <CalendarContent {...this.state.date} onPrevMonthClick={this.handlePrevMonthClick} onNextMonthClick={this.handleNextMonthClick} onDayClick={onDayClick} />
        </CalendarPaper>
      </div>
    )
  }
}

Calendar.defaultProps = {
  onDayClick: () => {}
}

export default Calendar
