import React, { Component, createRef } from 'react'

export const outsideClickable = (WrappedComponent) => (
  class extends Component {
    constructor () {
      super()
      this.element = createRef()
      this.handleMouseDown = this.handleMouseDown.bind(this)
    }

    componentDidMount(nextProps) {
      document.addEventListener('mousedown', this.handleMouseDown)
    }

    componentWillUnmount () {
      document.removeEventListener('mousedown', this.handleMouseDown)
    }

    handleMouseDown (e) {
      const { onClickOutside } = this.props
      if (this.element.current && !this.element.current.contains(e.target)) {
        onClickOutside && onClickOutside()
      }
    }

    render() {
      return <WrappedComponent ref={this.element} {...this.props} />
    }
  }
)