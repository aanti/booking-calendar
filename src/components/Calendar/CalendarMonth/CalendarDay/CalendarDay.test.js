import React from 'react'
import { shallow, mount } from 'enzyme'

import CalendarDay, { SingleDay } from './CalendarDay'
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