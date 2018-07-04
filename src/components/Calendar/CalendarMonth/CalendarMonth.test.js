import React from 'react'
import { shallow, mount } from 'enzyme'

import CalendarMonth, { getTypes } from './CalendarMonth'
import CalendarDay from './CalendarDay/CalendarDay'
import { DayType, ModeType } from '../../../utils/common'

const basicProps = {
  year: 2018,
  month: 8,
  mode: ModeType.checkin,
  selection: { start: null, n: null },
  n: 31,
  startDay: 3,
  reservation: [],
  availableDates: ['2018/08/16', '2018/08/17', '2018/08/18'],
  onDayClick: () => {}
}

describe('getTypes', () => {
  const reservation = ['2018/07/01', '2018/07/02', '2018/07/09', '2018/07/10', '2018/07/30']
  const selection = { start: '2018/07/04', n: 0 }
  const availableDates = ['2018/07/03', '2018/07/04', '2018/07/05', '2018/07/06', '2018/07/07']

  it('returns correct type (disabled) when chosen date is not available', () => {
    const result = getTypes('2018/07/01', reservation, selection, availableDates)
    const expected = [DayType.disabled]
    expect(result).toEqual(expect.arrayContaining(expected))

  })

  it('returns correct type (possible, available) when chosen date is available', () => {
    const result = getTypes('2018/07/05', reservation, selection, availableDates)
    const expected = [DayType.possible, DayType.available]
    expect(result).toEqual(expect.arrayContaining(expected))

  })

  it('returns correct type (possible, available and selected) when chosen date is available and in selection', () => {
    const result = getTypes('2018/07/05', reservation, {...selection, n: 3 }, availableDates)
    const expected = [DayType.possible, DayType.available, DayType.selected]
    expect(result).toEqual(expect.arrayContaining(expected))
  })
})

describe('CalendarMonth', () => {
  it('renders without crashing', () => {
    shallow(<CalendarMonth {...basicProps} />)
  })

  it('renders 42 day slots', () => {
    const wrapper = shallow(<CalendarMonth {...basicProps} />)
    expect(wrapper.find(CalendarDay).length).toBe(42)
  })
})