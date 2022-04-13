import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

export default function StyledLink({ to, text }) {
	return (<Link className='styled-link' to={to}>{ text }</Link>)
}

StyledLink.propTypes = {
	to: PropTypes.string,
	text: PropTypes.string
}
