// Components
import BurgerMenu from './components/BurgerMenu.svelte';
import Button from './components/Button.svelte';
import ChipTextInput from './components/ChipTextInput.svelte';
import CircularLoading from './components/CircularLoading.svelte';
import CopyRecipeButton from './components/CopyRecipeButton.svelte';
import DownloadRecipeButton from './components/DownloadRecipeButton.svelte';
import Footer from './components/Footer.svelte';
import HomeSearch from './components/HomeSearch.svelte';
import Icon from './components/Icon.svelte';
import ImageUploadInput from './components/ImageUploadInput.svelte';
import Navbar from './components/Navbar.svelte';
import Pagination from './components/Pagination.svelte';
import RecipeCard from './components/RecipeCard.svelte';
import RecipeForm from './components/RecipeForm.svelte';
import RecipesSearchForm from './components/RecipesSearchForm.svelte';
import SaveRecipeButton from './components/SaveRecipeButton.svelte';
import TextInput from './components/TextInput.svelte';

export {
	BurgerMenu,
	Button,
	ChipTextInput,
	CircularLoading,
	CopyRecipeButton,
	DownloadRecipeButton,
	Footer,
	HomeSearch,
	Icon,
	ImageUploadInput,
	Navbar,
	Pagination,
	RecipeCard,
	RecipeForm,
	RecipesSearchForm,
	SaveRecipeButton,
	TextInput
};

// Scripts
import {
	capitalizeFirstLetter,
	formatRecipeForCopyOrDownload,
	mapRecipeDifficulty,
	slugify
} from './scripts/strings';
import { scaleIngredients } from './scripts/recipe';
import { buildRecipesApiUrl, buildRecipesBrowserUrl, updateURLSearchParams } from './scripts/urls';

export {
	capitalizeFirstLetter,
	formatRecipeForCopyOrDownload,
	mapRecipeDifficulty,
	slugify,
	scaleIngredients,
	buildRecipesApiUrl,
	buildRecipesBrowserUrl,
	updateURLSearchParams
};

// Images such as empty state, errors
import EmptyBox from './assets/empty_box.svg';
import GitHubMark from './assets/github-mark.svg';
import SearchEmpty from './assets/search_empty.svg';
import ServerError from './assets/server_error.svg';

export { EmptyBox, GitHubMark, SearchEmpty, ServerError };
