// Components
import BurgerMenu from './components/BurgerMenu.svelte';
import ChipTextInput from './components/ChipTextInput.svelte';
import CircularLoading from './components/CircularLoading.svelte';
import CopyRecipeButton from './components/CopyRecipeButton.svelte';
import DownloadRecipeButton from './components/DownloadRecipeButton.svelte';
import Footer from './components/Footer.svelte';
import HomeSearch from './components/HomeSearch.svelte';
import Icon from './components/Icon.svelte';
import Navbar from './components/Navbar.svelte';
import Pagination from './components/Pagination.svelte';
import PrimaryButton from './components/PrimaryButton.svelte';
import RecipeCard from './components/RecipeCard.svelte';
import RecipesSearchForm from './components/RecipesSearchForm.svelte';
import SaveRecipeButton from './components/SaveRecipeButton.svelte';
import TextInput from './components/TextInput.svelte';

export {
	BurgerMenu,
	ChipTextInput,
	CircularLoading,
	CopyRecipeButton,
	DownloadRecipeButton,
	Footer,
	HomeSearch,
	Icon,
	Navbar,
	Pagination,
	PrimaryButton,
	RecipeCard,
	RecipesSearchForm,
	SaveRecipeButton,
	TextInput
};

// Scripts
import {
	capitalizeFirstLetter,
	formatRecipeForCopyOrDownload,
	mapRecipeDifficulty
} from './scripts/strings';
import { scaleServings } from './scripts/recipe';
import { buildRecipesApiUrl, buildRecipesBrowserUrl } from './scripts/urls';

export {
	capitalizeFirstLetter,
	formatRecipeForCopyOrDownload,
	mapRecipeDifficulty,
	scaleServings,
	buildRecipesApiUrl,
	buildRecipesBrowserUrl
};

// Images such as empty state, errors
import EmptyBox from './assets/empty_box.svg';
import GitHubMark from './assets/github-mark.svg';
import SearchEmpty from './assets/search_empty.svg';
import ServerError from './assets/server_error.svg';

export { EmptyBox, GitHubMark, SearchEmpty, ServerError };
