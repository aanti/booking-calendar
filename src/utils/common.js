import PropTypes from 'prop-types'

export const ModeType = {
  off: 'off',
  checkin: 'checkin',
  checkout: 'checkout'
}

export const DayType = {
  available: 'available',
  disabled: 'disabled',
  possible: 'possible',
  selected: 'selected'
}

export const Props = {
  dayTypes: PropTypes.arrayOf(PropTypes.oneOf([DayType.available, DayType.disabled, DayType.possible, DayType.selected])),
  mode: PropTypes.oneOf([ModeType.checkin, ModeType.checkout, ModeType.off]),
  selection: PropTypes.shape({
    start: PropTypes.string,
    n: PropTypes.number
  })
}