import PropTypes from 'prop-types'
import { Component } from 'react'
import clsx from 'clsx'
import styles from './button.module.scss'

export default class Button extends Component {
  componentDidMount() {
    PropTypes.checkPropTypes(Button.propTypes, this.props, 'prop', 'Button')
  }

  render() {
    const { label, type, outline, className } = this.props

    const buttonClass = clsx(
      styles.btn,
      outline ? styles[`btn-outline-${type}`] : styles[`btn-${type}`],
      className
    )

    return <div className={buttonClass}>{label}</div>
  }
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary', 'danger','warning']).isRequired,
  outline: PropTypes.bool,
  className: PropTypes.string,
}

Button.defaultProps = {
  label: 'test',
  type: 'primary',
  outline: false,
}