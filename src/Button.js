import React from 'react'
import PropTypes from 'prop-types'

// Create functional component for buttons
const Button = props => {
  return (
        <div id={props.id} className={props.class} onClick={props.click}>
            {props.name}
        </div>
  )
}

Button.propTypes = {
  id: PropTypes.string.isRequired,
  class: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  click: PropTypes.func.isRequired
}

export default Button
