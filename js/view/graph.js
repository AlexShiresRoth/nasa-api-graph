import { selectors } from './selectors';
import Search from '../controller/search';

export const graphModule = () => {
	const handleSearchClick = e => {
		console.log(e.target);
		const search = new Search();
		return search.handleSearch();
	};
	console.log('loaded');
	selectors.searchBtn.addEventListener('click', e => handleSearchClick(e));
};
