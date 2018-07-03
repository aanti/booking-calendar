import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Dates, outsideClickable } from '../../utils'

import Section from '../Section/Section'
import ArrowButton from '../Button/ArrowButton/ArrowButton'
import Marker from '../Marker/Marker'

import CalendarMonth from './CalendarMonth/CalendarMonth'

import './Calendar.css'

const CalendarContent = ({
  month,
  year,
  footerComponent = null,
  onNextMonthClick,
  onPrevMonthClick,
  ...props
}) => {
  const prevButtonDisabled = Dates.isBefore(Dates.getDateString(year, month, 1))
  return (
    <div className="calendarContent">
      <div className="calendarContent__nav">
        <ArrowButton onClick={onPrevMonthClick} disabled={prevButtonDisabled} />
        <div className="calendarContent__nav__date">
          <span>{Dates.getMonthName(month)}</span>
          <span>{year}</span>
        </div>
        <ArrowButton direction="right" onClick={onNextMonthClick} />
      </div>
      <CalendarMonth
        year={year}
        month={month}
        n={Dates.getNumberOfDays(year, month)}
        startDay={Dates.getDayOfWeek(year, month, 1)}
        {...props}
      />
      {footerComponent}
    </div>
  )
}

const CalendarPaper = ({ markerPosition = 'left', markerOffset = 50, children }) => (
  <div className="calendarPaper">
    <div
      className="calendarPaper__marker"
      style={{ ...(markerPosition === 'left' ? { left: markerOffset } : { right: markerOffset }) }}
    >
      <Marker />
    </div>
    <div className="calendarPaper__content">
      {children}
    </div>
  </div>
)

class Calendar extends Component {
  constructor (props) {
    super(props)
    const { selection: { start } } = props
    const defaultDate = start ? Dates.stringToObject(start) : Dates.dateToObject(new Date())
    this.state = {
      date: {
        year: defaultDate.year,
        month: defaultDate.month
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
    const { forwardedRef, mode, ...props } = this.props
    return (
      <div className="calendar" ref={forwardedRef}>
        <CalendarPaper markerPosition={mode === 'checkin' ? 'left' : 'right'}>
          <CalendarContent
            {...this.state.date}
            {...props}
            mode={mode}
            onPrevMonthClick={this.handlePrevMonthClick}
            onNextMonthClick={this.handleNextMonthClick}
          />
        </CalendarPaper>
      </div>
    )
  }
}

Calendar.defaultProps = {
  onDayClick: () => {}
}

export default ({ onClickOutside, ...rest }) => (onClickOutside)
  ? React.createElement(
      outsideClickable(
        React.forwardRef((props, ref) => <Calendar forwardedRef={ref} {...props} />)),
        { onClickOutside, ...rest }
    )
  : <Calendar {...rest} />
