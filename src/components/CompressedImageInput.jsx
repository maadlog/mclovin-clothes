import { useRef, useState } from 'react'
import PropTypes from 'prop-types'

async function compressImageFileToSizeAndSet (event, canvas, setter, setState) {
	setState('loading')
	try {
		const file = event.target.files[0]
		const objectURL = URL.createObjectURL(file)
		const ctx = canvas.getContext('2d')

		const img = new Image()
		img.onload = function(){
			const hRatio = canvas.width / img.width
			const vRatio = canvas.height / img.height
			const ratio = Math.min(hRatio, vRatio)
			const centerShift_x = (canvas.width - img.width * ratio) / 2
			const centerShift_y = (canvas.height - img.height * ratio) / 2
			ctx.clearRect(0,0,canvas.width, canvas.height)
			ctx.drawImage(img, 0,0, img.width, img.height, centerShift_x,centerShift_y,img.width*ratio, img.height*ratio)

			canvas.toBlob((blobCompressed) => {
				if (blobCompressed) {
					setter(blobCompressed)
					setState('loaded')
				}
			},'image/png', 0.7)
		}
		img.src = objectURL
	} catch (e) {
		setState('error')
	}
}

export default function CompressedImageInput({ id, setPictureFile }) {
	const [state, setState] = useState('none')
	const canvasRef = useRef(null)

	return (
		<div style={{ display: 'flex', flexDirection: 'row' }}>
			<input type='file' id={ id } accept='image/*' multiple={false} capture='user' onChange={ (event) => {
				compressImageFileToSizeAndSet(event, canvasRef.current, setPictureFile, setState)
			} }/>
			{ state === 'loading' && <p>⏳</p> }
			{ state === 'loaded' && <p>✅</p> }
			{ state === 'error' && <p>❌</p> }
			<canvas ref={canvasRef}
				style={{ display: 'none' }}
				width={500}
				height={500} />
		</div>
	)
}

CompressedImageInput.propTypes = {
	id: PropTypes.string,
	setPictureFile: PropTypes.func
}
