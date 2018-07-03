import React from 'react'
import { shallow, mount } from 'enzyme'

import ColoredButton from './ColoredButton'

const basicProps = {
  label: 'CLICK ME!',
  onClick: () => {}
}

describe('ColoredButton', () => {
  it('renders without crashing', () => {
    shallow(<ColoredButton {...basicProps} />)
  })

  it('calls onClick correctly', () => {
    const mockFn = jest.fn()
    const wrapper = mount(<ColoredButton {...basicProps} onClick={mockFn} />)
    wrapper.find('.coloredButton').simulate('click')
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('has some default label',  () => {
    const wrapper = shallow(<ColoredButton />)
    expect(wrapper.find('.coloredButton').childAt(0).text().length).toBeGreaterThan(0)
  })

  it('has correct label (with prop label or passed as child)',  () => {
    const wrapper = shallow(<ColoredButton {...basicProps} />)
    expect(wrapper.find('.coloredButton').childAt(0).text()).toBe(basicProps.label)
    const wrapper2 = shallow(<ColoredButton>LABEL</ColoredButton>)
    expect(wrapper2.find('.coloredButton').childAt(0).text()).toBe('LABEL')
  })
})