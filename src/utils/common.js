import PropTypes from 'prop-types'

export const ModeType = {
  off: 'off',
  checkin: 'checkin',
  checkout: 'checkout'
}

export const Props = {
  mode: PropTypes.oneOf([ModeType.checkin, ModeType.checkout, ModeType.off]),
  selection: PropTypes.shape({
    start: PropTypes.string,
    n: PropTypes.number
  })
}