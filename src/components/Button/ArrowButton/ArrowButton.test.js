import React from 'react'
import { shallow, mount } from 'enzyme'

import ArrowButton from './ArrowButton'

const basicProps = {
  direction: 'left',
  disabled: false,
  onClick: () => {}
}

describe('ArrowButton', () => {
  it('renders without crashing', () => {
    shallow(<ArrowButton {...basicProps} />)
  })

  it('doesn\'t call onClick when disabled', () => {
    const mockFn = jest.fn()
    const wrapper = mount(<ArrowButton {...basicProps} disabled onClick={mockFn} />)
    wrapper.find('.arrowButton').simulate('click')
    expect(mockFn).toHaveBeenCalledTimes(0)
  })

  it('calls onClick when not disabled', () => {
    const mockFn = jest.fn()
    const wrapper = mount(<ArrowButton {...basicProps} onClick={mockFn} />)
    wrapper.find('.arrowButton').simulate('click')
    expect(mockFn).toHaveBeenCalledTimes(1)
  })
})