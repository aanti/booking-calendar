import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'

export const outsideClickable =  (WrappedComponent) => (
  class extends Component {
    constructor () {
      super()
      this.element = createRef()
      this.handleMouseDown = this.handleMouseDown.bind(this)
    }

    componentDidMount(nextProps) {
      console.log('add down event')
      document.addEventListener('mousedown', this.handleMouseDown)
    }

    componentWillUnmount () {
      console.log('remove event')
      document.removeEventListener('mousedown', this.handleMouseDown)
    }

    handleMouseDown (e) {
      const { onClickOutside } = this.props
      console.log(e)
      console.log(this.element.current)
      if (this.element.current && !this.element.current.contains(e.target)) {
        onClickOutside && onClickOutside()
      }
    }

    render() {
      return <WrappedComponent ref={this.element} {...this.props} />
    }
  }
)