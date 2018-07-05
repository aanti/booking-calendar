import React from 'react'
import { shallow } from 'enzyme'

import Reservation from './Reservation'

const basicProps = {
  price: 150,
  rating: {
    rate: 4.5,
    numberOfRates: 189
  }
}

describe('Reservation', () => {
  it('renders without crashing', () => {
    shallow(<Reservation {...basicProps} />)
  })
})