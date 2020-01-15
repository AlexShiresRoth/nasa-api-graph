import { selectors } from '../model/selectors';
import { state } from '../index';

export const graphModule = () => {
	//must be same length as dates, (8 days)
	const bgColors = ['#5000ca', '#a2d9ff', '#0099ff', '#000b76', '#e7008a', '#ff5500', '#00cba9', '#ffd700'];
	const displayDates = () => {
		let datesArr = [];
		for (let date in state.data.near_earth_objects) {
			datesArr = [...datesArr, date];
		}
		const sortedDates = datesArr.sort((a, b) => a - b);

		const dateMap = sortedDates.map((date, i) => {
			const markdown = `<div class="date"><p style="color:${bgColors[i]};">${date}</p></div>`;
			return markdown;
		});
		if (datesArr.length > 0) {
			selectors.dateDisplay.innerHTML = dateMap.join(' ');
		}
	};

	const displayObjectAmt = () => {
		const earthObjs = state.data.near_earth_objects;
		let items = [];
		for (let item in earthObjs) {
			items = [...items, { item: earthObjs[item] }];
		}
		const sortedItems = items.sort((a, b) => a - b);
		const itemMap = sortedItems.map((data, i) => {
			const markup = `
            <div class="data--show" 
            style="background: ${bgColors[i]}; --h:${data.item.length}rem;">
            </div>`;
			return markup;
		});
		return (selectors.dataDisplay.innerHTML = itemMap.join(' '));
	};

	const displayAmtOnLeftSide = () => {
		const earthObjs = state.data.near_earth_objects;
		let total = [];

		for (let item in earthObjs) {
			total = [...total, { amt: earthObjs[item].length }];
		}
		//Get total in ascending order
		const sortedTotal = total.sort((a, b) => b.amt - a.amt);
		//remove any repeated numbers
		const dedupe = sortedTotal
			.map(num => num.amt)
			.filter((num, i) => (i < sortedTotal.length - 1 ? num !== sortedTotal[i + 1].amt : num !== sortedTotal[i]));

		const totalMap = dedupe.map((amt, i) => {
			const markup = `<div class="amount" style="position:absolute; bottom:${amt}rem;
						border-bottom: 1px solid ${bgColors[i]};">${amt}<p></div>`;
			return markup;
		});

		//render the markup as to not repeat if button is pressed multiple times
		return (selectors.amountDisplay.innerHTML = totalMap.join(' '));
	};

	const handleTotalDisplay = () => {
		console.log(state.data.element_count);
		const markup = `<p class="element-count">${state.data.element_count}</p>`;
		return selectors.totalDisplay.insertAdjacentHTML('afterbegin', markup);
	};
	return [displayDates, displayObjectAmt, displayAmtOnLeftSide, handleTotalDisplay];
};
