import React from 'react'
import { shallow, mount } from 'enzyme'

import DateInput, { CheckButton } from './DateInput'

const basicProps = {
  price: 150,
  rating: {
    rate: 4.5,
    numberOfRates: 189
  }
}

describe('Reservation', () => {
  it('renders without crashing', () => {
    shallow(<DateInput {...basicProps} />)
  })

  it('renders summary when complete reservation range is given', () => {
    const props = { renderSummary: () => <div className="summary"/> }
    const wrapper = shallow(<DateInput {...basicProps} {...props} />)
    wrapper.setState({ value: { from: '2018/08/01', to: '2018/08/04' } })
    expect(wrapper.find('.summary').length).toBe(1)
    //expect(wrapper.state().calendarOpen).toBe(true)
  })
})