import { useRef, useState } from 'react'
import PropTypes from 'prop-types'

async function compressImageFileToSizeAndSet (event: React.ChangeEvent<HTMLInputElement>, canvas: HTMLCanvasElement, setter: (blob: Blob) => void, setState: (state: string) => void) {
	setState('loading')
	try {
		const file = event.target?.files?.item(0)
		if (!file) {
			setState('error')
			return
		}
		const objectURL = URL.createObjectURL(file)
		const ctx = canvas.getContext('2d')
		if (!ctx) {
			setState('error')
			return
		}

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
interface CompressedImageInputProps {
	id: string
	setPictureFile: (file: Blob) => void
}
export default function CompressedImageInput({ id, setPictureFile }: CompressedImageInputProps) {
	const [state, setState] = useState('none')
	const [pictureFileInternal, setInternalPictureFile] = useState<Blob|null>(null)
	const canvasRef = useRef(null)

	return (
		<div className='compressed-image-input'>
			<label htmlFor={ id }>
				{ state === 'loaded' && pictureFileInternal && <img src={URL.createObjectURL(pictureFileInternal)} alt='Foto para subir' width={250} height={250}/> }
				{ state === 'loading' && <p>⏳</p> }
				{ state === 'error' && <p>❌</p> }
				{ state === 'none' && <>
					<div className='add-button-all'>
						<span className='material-icons-round'>add</span>
					</div>
					<p>Cargar foto</p>
				</>
				}
			</label>
			<input style={{ display: 'none' }} type='file' id={ id } accept='image/*' multiple={false} capture='user' onChange={ (event) => {
				if (!canvasRef.current) { return }
				compressImageFileToSizeAndSet(event, canvasRef.current, (file) => {
					setInternalPictureFile(file)
					setPictureFile(file)
				}, setState)
			} }/>
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
