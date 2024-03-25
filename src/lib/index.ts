import ChipTextInput from './components/ChipTextInput.svelte';
import CircularLoading from './components/CircularLoading.svelte';
import CopyRecipeButton from './components/CopyRecipeButton.svelte';
import DownloadRecipeButton from './components/DownloadRecipeButton.svelte';
import Footer from './components/Footer.svelte';
import HomeSearch from './components/HomeSearch.svelte';
import Navbar from './components/Navbar.svelte';
import Pagination from './components/Pagination.svelte';
import RecipeCard from './components/RecipeCard.svelte';
import RecipesAside from './components/RecipesAside.svelte';
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
	RecipesAside,
	SaveRecipeButton,
	TextInput
};

// Icons
import Axe from './assets/icons/axe.svg';
import BookmarkEmpty from './assets/icons/bookmark_empty.svg';
import BookmarkFull from './assets/icons/bookmark_full.svg';
import Broccoli from './assets/icons/broccoli.svg';
import Clock from './assets/icons/clock.svg';
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
	Clock,
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

export { capitalizeFirstLetter, formatRecipeForCopyOrDownload, mapRecipeDifficulty, scaleServings };
