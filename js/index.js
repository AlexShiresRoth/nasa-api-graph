import { graphModule } from './view/graph';
import { selectors } from './model/selectors';
import Search from './controller/search';

const graphClosure = graphModule();
const displayDates = graphClosure[0];
const displayObjectAmt = graphClosure[1];
const displayAmtOnLeftSide = graphClosure[2];

export const state = {};

const controlSearch = async (e, query) => {
	//create new instance of Search class
	e.preventDefault();
	state.search = new Search(query);
	await state.search.handleSearch(e);
	//this references the search class
	state.data = state.search.data;
	//Show date parameters on UI
	displayDates();
	//Display amount of objects near earth per date
	displayObjectAmt();
	//Display the total object encounters on left of graph
	displayAmtOnLeftSide();
};

const runOnLoad = (() => {
	selectors.searchBtn.addEventListener('click', e => controlSearch(e));
	selectors.searchForm.addEventListener('submit', e => controlSearch(e));
})();
