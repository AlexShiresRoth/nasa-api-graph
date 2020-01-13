import { graphModule } from './view/graph';
import { selectors } from './model/selectors';
import Search from './controller/search';

const graphClosure = graphModule();
const getStateData = graphClosure[0];

export const state = {};

const controlSearch = async query => {
	if (query) {
		//create new instance of Search class
		state.search = new Search(query);

		await state.search.handleSearch();

		//this references the search class
		state.data = state.search.data;

		getStateData();
	}
};

const runOnLoad = (() => {
	selectors.searchBtn.addEventListener('click', controlSearch);
})();
