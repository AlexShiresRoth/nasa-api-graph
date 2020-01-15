import axios from 'axios';
import { selectors } from '../model/selectors';
import { INVALID_SEARCH } from '../model/alerts';
export default class Search {
	constructor(query) {
		this.query = query;
	}
	async handleSearch(e) {
		e.preventDefault();
		const startDate = selectors.startDate.value !== undefined ? selectors.startDate.value : '';
		const endDate = selectors.endDate.value !== undefined ? selectors.endDate.value : '';
		try {
			//TODO add user query
			const api_key = 'PlkP3UndfYNCWDnVAiwuiSKB4zqPNf3q31tEaOI0';
			const res = await axios.get(
				`https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${api_key}`
			);

			this.data = res.data;
			return res.data;
		} catch (error) {
			//error handling for unacceptable date range params
			if (error.response.status === 400) {
				selectors.startDate.classList.add('border-alert');
				selectors.endDate.classList.add('border-alert');
				selectors.inputGrp.insertAdjacentHTML('beforebegin', INVALID_SEARCH);

				setTimeout(() => {
					document.querySelector('.invalid-search').classList.add('hide-alert');
					selectors.startDate.classList.remove('border-alert');
					selectors.endDate.classList.remove('border-alert');
				}, 5000);
				setTimeout(() => {
					document.querySelector('.invalid-search').remove();
				}, 5100);
			}
			console.error(error.response);
		}
	}
}
