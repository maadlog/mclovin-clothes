import PropTypes from 'prop-types'

export default function StyledButton({ className, text, icon, onClick }) {
	const klass = (className ? className : '') + ' styled-button'
	return (
		<button className={ klass.trim() } onClick={onClick}>
			{ icon && <span className='material-icons-round'>{icon}</span> }
			<p>{text}</p>
		</button>
	)
}

StyledButton.propTypes = {
	className: PropTypes.string,
	text: PropTypes.string,
	icon: PropTypes.string,
	onClick: PropTypes.func
}
