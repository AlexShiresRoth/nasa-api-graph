import { selectors } from '../model/selectors';
import { state } from '../index';

export const graphModule = () => {
	const displayDates = () => {
		let datesArr = [];
		for (let date in state.data.near_earth_objects) {
			let dataPiece = document.createElement('div');
			dataPiece.classList.add('data');
			dataPiece.innerHTML = `<p>${date}</p>`;
			datesArr = [...datesArr, dataPiece];
		}
		if (datesArr.length > 0) {
			selectors.dateDisplay.insertAdjacentHTML('afterbegin', datesArr.map((item, i) => item).join(' '));
		}
	};

	return [displayDates];
};
