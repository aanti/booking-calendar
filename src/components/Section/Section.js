import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Section.css'

const Section = ({ children }) => (
  <section className="section">
    {children}
  </section>
)

export default Section
