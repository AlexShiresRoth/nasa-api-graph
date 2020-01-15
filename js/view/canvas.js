import { selectors } from '../model/selectors';
import asteroid from '../../imgs/asteroid2.png';
import { state } from '../index';

export const canvas = () => {
	const canvasDimensions = selectors.canvas.getBoundingClientRect();
	const ctx = selectors.canvas.getContext('2d');
	let dpi = window.devicePixelRatio;
	let x = 0;
	let y = 0;
	let dx = 2;
	let dy = -2;
	//fix image scaling on canvas
	const fixDpi = () => {
		let style = {
			height() {
				return +getComputedStyle(selectors.canvas)
					.getPropertyValue('height')
					.slice(0, -2);
			},
			width() {
				return +getComputedStyle(selectors.canvas)
					.getPropertyValue('width')
					.slice(0, -2);
			},
		};
		selectors.canvas.setAttribute('width', style.width() * dpi);
		selectors.canvas.setAttribute('height', style.height() * dpi);
	};

	const handleSvgDisplay = () => {
		if (selectors.canvas.getContext) {
			fixDpi();

			let img = new Image();
			img.onload = function() {
				ctx.imageSmoothingEnabled = false;
				ctx.drawImage(img, x, y);
				if (y + dy < canvasDimensions.y) {
					dy = -dy;
				}
				if (y + dy > canvasDimensions.height) {
					dy = -dy;
				}
				if (x + dx > canvasDimensions.width) {
					dx = -dx;
				}
				if (x + dx < canvasDimensions.x) {
					dx = -dx;
				}
				x += dx;
				y += dy;
			};

			img.src = asteroid;
		}
	};
	setInterval(() => {
		handleSvgDisplay();
	}, 1000 / 60);
	console.log(canvasDimensions);
	return [handleSvgDisplay];
};
