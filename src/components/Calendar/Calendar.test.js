import React from 'react'
import { shallow, mount } from 'enzyme'

import Calendar, { CalendarPaper, CalendarContent } from './Calendar'
import { DayType, ModeType } from '../../utils/common'
import { Dates } from '../../utils'

const basicProps = {
  mode: ModeType.checkin,
  selection: { start: '2018/08/16', n: 2 },
  availableDates: [],
  reservation: [],
  onDayClick: () => {}
}

describe('Calendar', () => {
  it('renders without crashing', () => {
    shallow(<Calendar {...basicProps} />)
  })

  it('renders marker position depending on mode type', () => {
    const wrapper = mount(<Calendar {...basicProps} />)
    expect(wrapper.find(CalendarPaper).first().props().markerPosition).toEqual('left')
    wrapper.setProps({ mode: ModeType.checkout })
    expect(wrapper.find(CalendarPaper).first().props().markerPosition).toEqual('right')
  })
})

describe('CalendarPaper', () => {
  it('renders without crashing', () => {
    shallow(<CalendarPaper markerPosition = "left" markerOffset={50}>content</CalendarPaper>)
  })

  it('renders children', () => {
    const wrapper = shallow(
      <CalendarPaper markerPosition = "left" markerOffset={50}>
        <div className="testClass"/>
      </CalendarPaper>
    )
    expect(wrapper.find('.testClass').length).toBe(1)
  })
})


describe('CalendarContent', () => {
  const currentDate = Dates.dateToObject(new Date())
  const dateOb = Dates.getNextMonth(currentDate)
  const basicProps = {
    month: dateOb.month + 3,
    year: dateOb.year,
    mode: ModeType.checkin,
    footerComponent: <span className="footer">footer</span>,
    selection: {},
    reservation: [],
    availableDates: [],
    onNextMonthClick: () => {},
    onPrevMonthClick: () => {}
  }

  it('renders without crashing', () => {
    shallow(<CalendarContent {...basicProps} />)
  })

  it('calls onNextMonthClick and onPrevMonthClick', () => {
    const mockPrevClick = jest.fn()
    const mockNextClick = jest.fn()
    const wrapper = mount(
      <CalendarContent {...basicProps} onPrevMonthClick={mockPrevClick} onNextMonthClick={mockNextClick} />
    )
    wrapper.find('.arrowButton').first().simulate('click')
    expect(mockPrevClick).toHaveBeenCalledTimes(1)
    wrapper.find('.arrowButton').last().simulate('click')
    expect(mockNextClick).toHaveBeenCalledTimes(1)
  })

  it(`doesn't call onPrevMonthClick when previous month is in the past`, () => {
    const dateOb = Dates.dateToObject(new Date())
    const mockPrevClick = jest.fn()
    const wrapper = mount(
      <CalendarContent {...basicProps} year={dateOb.year} month={dateOb.month} onPrevMonthClick={mockPrevClick} />
    )
    wrapper.find('.arrowButton').first().simulate('click')
    expect(mockPrevClick).toHaveBeenCalledTimes(0)
  })

  it('renders footer', () => {
    const wrapper = shallow(
      <CalendarContent {...basicProps} year={dateOb.year} month={dateOb.month} />
    )
    const footer = wrapper.find('.footer')
    expect(footer.length).toBe(1)
  })
})

