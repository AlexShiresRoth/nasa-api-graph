import { selectors } from '../model/selectors';
import asteroid from '../../imgs/asteroid2.png';
import { state } from '../index';

export const canvas = () => {
	const canvasDimensions = selectors.canvas.getBoundingClientRect();
	const ctx = selectors.canvas.getContext('2d');
	let dpi = window.devicePixelRatio;
	let x = Math.random() * 100;
	let y = Math.random() * 100;
	let dx = 2;
	let dy = -2;
	let animationRef;
	//let img = new Image();
	let imgs = [];

	const createImgsArr = () => {
		let count = state.data.element_count;
		let newImg;
		while (count > 0) {
			newImg = new Image();
			imgs.push(newImg);
			count--;
		}
		console.log(imgs);
	};
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

	const animate = () => {
		handleSvgDisplay();
		fixDpi();
	};

	const handleSvgDisplay = () => {
		ctx.clearRect(0, 0, selectors.canvas.width, selectors.canvas.height);
		imgs.map(img => {
			if (selectors.canvas.getContext) {
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

				img.src = asteroid;
				console.log(x, y);
			}
		});
		requestAnimationFrame(handleSvgDisplay);
	};
	return [animate, createImgsArr];
};
