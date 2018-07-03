import React from 'react'
import { shallow, mount } from 'enzyme'

import CalendarDay, { SingleDay, isEmptyCell, getClasses } from './CalendarDay'
import { DayType, ModeType } from '../../../../utils/common'

const basicProps = {
  year: 2018,
  month: 8,
  day: -1,
  n: 30,
  types: [DayType.available],
  mode: ModeType.checkin
}

describe('CalendarDay', () => {
  it('renders without crashing', () => {
    shallow(<CalendarDay {...basicProps} />)
  })

  it('renders null when it\'s empty calendar day', () => {
    const wrapper = shallow(<CalendarDay {...basicProps} />)
    expect(wrapper.find(SingleDay).exists()).toBe(false)
  })

  it('renders SingleDay component when it\'s non-empty calendar day', () => {
    const wrapper = shallow(<CalendarDay {...basicProps} day={5} />)
    expect(wrapper.find(SingleDay).exists()).toBe(true)
  })

  it('calls onDayClick when it\'s correct mode', () => {
    const mockFn = jest.fn()
    const wrapper = mount(<CalendarDay {...basicProps} day={5} mode={ModeType.checkin} types={[DayType.available]} onDayClick={mockFn} />)
    wrapper.find(SingleDay).simulate('click')
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('doens\'t call onDayClick when it\'s not in correct mode', () => {
    const mockFn = jest.fn()
    const wrapper = mount(<CalendarDay {...basicProps} day={5} mode={ModeType.checkout} types={[DayType.available]} onDayClick={mockFn} />)
    wrapper.find(SingleDay).simulate('click')
    expect(mockFn).toHaveBeenCalledTimes(0)
  })
})

describe('SingleDay', () => {
  it('renders without crashing', () => {
    shallow(<SingleDay number={24} onClick={() => {}} />)
  })

  it('calls onClick', () => {
    const mockFn = jest.fn()
    const wrapper = shallow(<SingleDay number={24} onClick={mockFn} />)
    wrapper.find('.singleDay').simulate('click')
    expect(mockFn).toHaveBeenCalledTimes(1)
  })
})

describe('isEmptyCell', () => {
  it('returns false when day index is lower than calendar month start or greater than number of days in month', () => {
    const isEmpty = isEmptyCell(-2, 31)
    expect(isEmpty).toBe(true)
    const isEmpty2 = isEmptyCell(35, 31)
    expect(isEmpty).toBe(true)
  })

  it('returns true when day index is in range (1 -- days in month)', () => {
    const isEmpty = isEmptyCell(1, 31)
    expect(isEmpty).toBe(false)
    const isEmpty2 = isEmptyCell(18, 31)
    expect(isEmpty).toBe(false)
  })
})

describe('getClasses', () => {
  it('returns correct classes array', () => {
    const types = [DayType.available, DayType.possible]
    const result = getClasses(types)
    expect(result).toBe('calendarMonth__day--available calendarMonth__day--possible ')
  })

  it('returns empty string when types array is empty', () => {
    const types = []
    const result = getClasses(types)
    expect(result).toBe('')
  })
})