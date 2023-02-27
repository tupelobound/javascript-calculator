import React from 'react'
import PropTypes from 'prop-types'

// Create functional component for the display
const Display = props => {
  return (
      <div id="screen">
        <div id="display">{props.current}</div>
        <div id="calculation">{props.calculation}</div>
      </div>
  )
}

Display.propTypes = {
  current: PropTypes.any.isRequired,
  calculation: PropTypes.any.isRequired
}

export default Display
