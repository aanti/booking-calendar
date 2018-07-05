import React from 'react'
import { shallow } from 'enzyme'

import BasicInfo from './BasicInfo'

const basicProps = {
  price: 150,
  rating: {
    rate: 4.5,
    numberOfRates: 189
  }
}

describe('BasicInfo', () => {
  it('renders without crashing', () => {
    shallow(<BasicInfo {...basicProps} />)
  })
})