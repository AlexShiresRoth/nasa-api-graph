import axios from 'axios';

export default class Search {
	constructor(query) {
		this.query = query;
	}
	async handleSearch() {
		try {
			const api_key = 'PlkP3UndfYNCWDnVAiwuiSKB4zqPNf3q31tEaOI0';
			const res = await axios.get(
				`https://api.nasa.gov/neo/rest/v1/feed?start_date=2015-01-01&end_date=2015-01-08&api_key=${api_key}`
			);
			console.log(res.data);
		} catch (error) {
			console.error(error);
		}
	}
}
