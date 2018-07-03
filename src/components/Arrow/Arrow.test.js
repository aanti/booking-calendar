import React from 'react'
import { shallow } from 'enzyme'

import Arrow from './Arrow'

const basicProps = {
  color: 'blue',
  direction: 'left'
}

describe('Arrow', () => {
  it('renders without crashing', () => {
    shallow(<Arrow />)
  })

  it('has correct direction', () => {
    const wrapper = shallow(<Arrow {...basicProps} />)
    expect(wrapper.props().transform).toEqual('rotate(0)')
    wrapper.setProps({ direction: 'right' })
    expect(wrapper.props().transform).toEqual('rotate(180)')
  })

  it('has correct fill color', () => {
    const wrapper = shallow(<Arrow {...basicProps} />)
    expect(wrapper.props().fill).toEqual(basicProps.color)
  })
})