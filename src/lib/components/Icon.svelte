<script lang="ts">
	export let focusable: string | number | null | undefined = undefined;
	export let fill: string | null = null;
	export let height = '1rem';
	export let name: keyof typeof icons;
	export let stroke: string | null = null;
	export let title = '';
	export let width = '1rem';

	let icons = {
		axe: {
			box: 32,
			svg: `<path
					d="M10.6367 21.1166L13.6773 24.1572L7.45476 30.3797C7.07969 30.7548 6.57098 30.9655 6.04055 30.9655C5.51011 30.9655 5.00141 30.7548 4.62633 30.3797L4.4849 30.2383C4.10983 29.8632 3.89911 29.3545 3.89911 28.8241C3.89911 28.2937 4.10983 27.785 4.4849 27.4099L10.7074 21.1874L10.6367 21.1166Z"
					stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					<path
					d="M25.6692 5.59619L28.9219 8.84889L13.7191 24.0517L5.8702 16.2028L16.4768 5.59619C17.6958 4.37721 19.3491 3.69239 21.073 3.69239C22.7969 3.69239 24.4502 4.37721 25.6692 5.59619Z"
					fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
					<path d="M18.9923 12.6223L13.8923 17.6223" stroke="currentColor" stroke-width="2"
					stroke-linecap="round" stroke-linejoin="round" />`
		},
		bookmark_full: {
			box: 48,
			svg: `<path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 14C8.5 8.75329 12.7533 4.5 18 4.5H30C35.2467 4.5 39.5 8.75329 39.5 14V40.3367C39.5 43.1058 36.4366 44.7782 34.1073 43.2808L25.3519 37.6523C24.5284 37.1229 23.4716 37.1229 22.6481 37.6523L13.8927 43.2808C11.5634 44.7782 8.5 43.1058 8.5 40.3367V14ZM18 15.5C17.1716 15.5 16.5 16.1716 16.5 17C16.5 17.8284 17.1716 18.5 18 18.5H30C30.8284 18.5 31.5 17.8284 31.5 17C31.5 16.1716 30.8284 15.5 30 15.5H18Z" />`
		},
		bookmark_empty: {
			box: 48,
			svg: `<path d="M10 14C10 9.58172 13.5817 6 18 6H30C34.4183 6 38 9.58172 38 14V40.3367C38 41.919 36.2495 42.8747 34.9185 42.019L26.163 36.3905C24.8454 35.5435 23.1546 35.5435 21.837 36.3905L13.0815 42.019C11.7505 42.8747 10 41.919 10 40.3367V14Z" stroke="currentColor" stroke-width="3"/>
                    <path d="M18 17H30" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`
		},
		broccoli: {
			box: 24,
			svg: `<path fill="none" d="M22.2753 9.2675C22.2753 10.3814 21.8328 11.4497 21.0451 12.2373C20.2575 13.025 19.1892 13.4675 18.0753 13.4675C17.052 13.4738 16.063 13.0996 15.3003 12.4175C14.8261 13.3054 14.1131 14.0431 13.2418 14.5474C12.3706 15.0516 11.3758 15.3022 10.3696 15.271C9.36348 15.2398 8.38609 14.928 7.54776 14.3708C6.70943 13.8136 6.04355 13.0331 5.62527 12.1175C5.21273 12.4202 4.71183 12.5784 4.20025 12.5675C3.84568 12.5675 3.49459 12.4977 3.16701 12.362C2.83943 12.2263 2.5418 12.0274 2.29108 11.7767C2.04036 11.526 1.84147 11.2283 1.70578 10.9007C1.5701 10.5732 1.50027 10.2221 1.50027 9.8675C1.49265 9.33647 1.64628 8.81562 1.94087 8.37373C2.23546 7.93184 2.65714 7.5897 3.15026 7.3925C3.02263 6.98026 2.9718 6.5481 3.00027 6.1175C3.00689 5.1709 3.30224 4.24886 3.84688 3.47461C4.39153 2.70036 5.15952 2.11078 6.0482 1.78466C6.93687 1.45854 7.9039 1.41141 8.82007 1.64958C9.73625 1.88775 10.5579 2.39987 11.1753 3.1175C12.0471 2.48363 13.0974 2.1423 14.1753 2.1425C15.1191 2.14197 16.0408 2.42869 16.8178 2.96456C17.5948 3.50042 18.1904 4.26005 18.5253 5.1425C19.5531 5.23631 20.5083 5.71199 21.2026 6.47564C21.8968 7.2393 22.2796 8.23545 22.2753 9.2675Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> <path fill="none" d="M18.0753 13.4675C18.0753 13.4675 14.4003 14.1425 14.4003 22.4675H10.5753C10.5753 22.4675 10.8003 16.6925 7.05029 13.9175" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />`
		},
		burger: {
			box: 24,
			svg: `<path d="M20 6L4 6" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" /> <path d="M20 12L4 12" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" /> <path d="M20 18H4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" />`
		},
		clock: {
			box: 24,
			svg: `<circle fill="none" cx="12" cy="14" r="9" stroke="currentColor" stroke-width="1.5" /> <path d="M10 2H14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /> <path d="M12 2L12 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /> <path d="M12 14L15 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /> <path d="M18.5 7L19 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />`
		},
		cross: {
			box: 14,
			svg: `<g clip-path="url(#clip0_121_329)"> <path d="M13.5 0.5L0.5 13.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> <path d="M0.5 0.5L13.5 13.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> </g> <defs> <clipPath id="clip0_121_329"> <rect width="14" height="14" fill="white" /> </clipPath> </defs>`
		},
		copy_empty: {
			box: 24,
			svg: `<rect fill="none" x="5" y="3" width="10" height="14" rx="3" stroke="currentColor" stroke-width="1.5" /> <path fill="none" d="M17.5 7.40137C18.3967 7.92008 19 8.8896 19 10V18C19 19.6569 17.6569 21 16 21H12C10.8896 21 9.92008 20.3967 9.40137 19.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />`
		},
		copy_full: {
			box: 24,
			svg: `<path d="M8.38481 19C8.82243 20.5856 10.2752 21.75 12 21.75H16C18.0711 21.75 19.75 20.0711 19.75 18V10C19.75 8.27523 18.5856 6.82243 17 6.38481V14C17 16.7614 14.7614 19 12 19H8.38481Z" fill="currentColor" /> <path d="M8 2.25C5.92893 2.25 4.25 3.92893 4.25 6V14C4.25 16.0711 5.92893 17.75 8 17.75H12C14.0711 17.75 15.75 16.0711 15.75 14V6C15.75 3.92893 14.0711 2.25 12 2.25H8Z" fill="currentColor" />`
		},
		dish: {
			box: 26,
			svg: `<path d="M0.804199 17H24.362" stroke="currentColor" stroke-width="1.60804" stroke-linecap="round" stroke-linejoin="round" /> <path fill="none" d="M2.1709 14.1055C2.60345 11.6415 3.8862 9.40717 5.79595 7.79123C7.7057 6.17529 10.1216 5.28004 12.6232 5.26129C15.1197 5.26712 17.533 6.15956 19.4326 7.77942C21.3323 9.39929 22.5948 11.6413 22.995 14.1055" fill="currentColor" /> <path d="M2.1709 14.1055C2.60345 11.6415 3.8862 9.40717 5.79595 7.79123C7.7057 6.17529 10.1216 5.28004 12.6232 5.26129C15.1197 5.26712 17.533 6.15956 19.4326 7.77942C21.3323 9.39929 22.5948 11.6413 22.995 14.1055" fill="none" stroke="currentColor" stroke-width="1.60804" stroke-linecap="round" stroke-linejoin="round" /> <path d="M12.6232 5.18092C13.7777 5.18092 14.7136 4.24498 14.7136 3.09046C14.7136 1.93593 13.7777 1 12.6232 1C11.4686 1 10.5327 1.93593 10.5327 3.09046C10.5327 4.24498 11.4686 5.18092 12.6232 5.18092Z" fill="none" stroke="currentColor" stroke-width="1.60804" stroke-linecap="round" stroke-linejoin="round" />`
		},
		download: {
			box: 24,
			svg: `<path fill="none" d="M9 8L7 8C4.79086 8 3 9.79086 3 12L3 17C3 19.2091 4.79086 21 7 21L19 21C21.2091 21 23 19.2091 23 17L23 12C23 9.79086 21.2091 8 19 8L17 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /> <path fill="none" d="M10 13L12.2929 15.2929C12.6834 15.6834 13.3166 15.6834 13.7071 15.2929L16 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /> <path fill="none" d="M13 15L13 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />`
		},
		location: {
			box: 24,
			svg: `<path fill="none" d="M20 10.4167C20 15.8445 13.6 21.5 12 21.5C10.4 21.5 4 15.8445 4 10.4167C4 6.04441 7.58172 2.5 12 2.5C16.4183 2.5 20 6.04441 20 10.4167Z" stroke="currentColor" stroke-width="1.5" /> <circle fill="none" cx="3" cy="3" r="3" transform="matrix(-1 0 0 1 15 7)" stroke="currentColor" stroke-width="1.5" />`
		},
		mail: {
			box: 24,
			svg: `<rect fill="none" x="2" y="4" width="20" height="16" rx="5" stroke="currentColor" stroke-width="1.5" /> <path d="M6 9L10.8 12.6C11.5111 13.1333 12.4889 13.1333 13.2 12.6L18 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none" />`
		},
		fire: {
			box: 22,
			svg: `<path d="M13.7524 3.17224C13.7502 3.09602 13.6671 3.04639 13.6016 3.0855C10.1363 5.15576 10.2004 10.3491 10.2418 11.2901C10.2449 11.3611 10.1778 11.4112 10.1135 11.3809C9.71316 11.1924 8.5661 10.4823 8.50273 8.51531C8.50028 8.43898 8.41792 8.38991 8.35223 8.42885C6.34578 9.61803 5 11.8144 5 14.25C5 17.9779 8.134 21 12 21C15.866 21 19 17.9779 19 14.25C19 8.83413 13.8803 7.6694 13.7524 3.17224Z" fill="currentColor" stroke="currentColor" stroke-width="1.5" />`
		},
		fridge: {
			box: 24,
			svg: `<path fill="none" d="M20.85 1.5H3.75V22.41H20.85V1.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> <path d="M3.75 9.97501H20.85" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> <path d="M6.75 4.72501V7.2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /> <path d="M6.75 12.375V16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />`
		},
		stove: {
			box: 24,
			svg: `<path fill="none" d="M22.65 3H1.5V21.255H22.65V3Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /> <path fill="none" d="M6.3 18.45C7.70832 18.45 8.84999 17.3083 8.84999 15.9C8.84999 14.4917 7.70832 13.35 6.3 13.35C4.89167 13.35 3.75 14.4917 3.75 15.9C3.75 17.3083 4.89167 18.45 6.3 18.45Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /> <path fill="none" d="M13.8752 18.45C15.2835 18.45 16.4252 17.3083 16.4252 15.9C16.4252 14.4917 15.2835 13.35 13.8752 13.35C12.4669 13.35 11.3252 14.4917 11.3252 15.9C11.3252 17.3083 12.4669 18.45 13.8752 18.45Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /> <path fill="none" d="M18.75 14.4H20.175" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /> <path fill="none" d="M18.75 17.4H20.175" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /> <path fill="none" d="M6.3 10.95C7.70832 10.95 8.84999 9.80833 8.84999 8.4C8.84999 6.99168 7.70832 5.85001 6.3 5.85001C4.89167 5.85001 3.75 6.99168 3.75 8.4C3.75 9.80833 4.89167 10.95 6.3 10.95Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /> <path fill="none" d="M13.8752 10.95C15.2835 10.95 16.4252 9.80833 16.4252 8.4C16.4252 6.99168 15.2835 5.85001 13.8752 5.85001C12.4669 5.85001 11.3252 6.99168 11.3252 8.4C11.3252 9.80833 12.4669 10.95 13.8752 10.95Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /> <path d="M18.75 6.89999H20.175" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /> <path d="M18.75 9.89999H20.175" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />`
		}
	} as const;

	let displayIcon = icons[name];
</script>

<svg
	class={$$props.class}
	fill={fill ?? 'currentColor'}
	stroke={stroke ?? 'currentColor'}
	{focusable}
	{width}
	{height}
	viewBox="0 0 {displayIcon.box} {displayIcon.box}"
>
	{#if title}<title>{title}</title>{/if}
	{@html displayIcon.svg}
</svg>
