import ChipTextInput from './components/ChipTextInput.svelte';
import CircularLoading from './components/CircularLoading.svelte';
import CopyRecipeButton from './components/CopyRecipeButton.svelte';
import DownloadRecipeButton from './components/DownloadRecipeButton.svelte';
import Footer from './components/Footer.svelte';
import HomeSearch from './components/HomeSearch.svelte';
import Navbar from './components/Navbar.svelte';
import Pagination from './components/Pagination.svelte';
import RecipeCard from './components/RecipeCard.svelte';
import RecipesSearchForm from './components/RecipesSearchForm.svelte';
import SaveRecipeButton from './components/SaveRecipeButton.svelte';
import TextInput from './components/TextInput.svelte';

export {
	ChipTextInput,
	CircularLoading,
	CopyRecipeButton,
	DownloadRecipeButton,
	Footer,
	HomeSearch,
	Navbar,
	Pagination,
	RecipeCard,
	RecipesSearchForm,
	SaveRecipeButton,
	TextInput
};

// Icons
import Axe from './assets/icons/axe.svg';
import BookmarkEmpty from './assets/icons/bookmark_empty.svg';
import BookmarkFull from './assets/icons/bookmark_full.svg';
import Broccoli from './assets/icons/broccoli.svg';
import Burger from './assets/icons/burger.svg';
import Clock from './assets/icons/clock.svg';
import Cross from './assets/icons/cross.svg';
import Copy from './assets/icons/copy.svg';
import CopyFull from './assets/icons/copy_full.svg';
import Dish from './assets/icons/dish.svg';
import Download from './assets/icons/download.svg';
import Fire from './assets/icons/fire.svg';
import Fridge from './assets/icons/fridge.svg';
import Location from './assets/icons/location.svg';
import Mail from './assets/icons/mail.svg';
import Stove from './assets/icons/stove.svg';

export {
	Axe,
	BookmarkEmpty,
	BookmarkFull,
	Broccoli,
	Burger,
	Clock,
	Cross,
	Copy,
	CopyFull,
	Dish,
	Download,
	Fire,
	Fridge,
	Location,
	Mail,
	Stove
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
