<script>
	export let width = "50"
</script>

<svg class="spin-animation" width={width} height={width} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M50 25C50 38.8071 38.8071 50 25 50C11.1929 50 0 38.8071 0 25C0 11.1929 11.1929 0 25 0C38.8071 0 50 11.1929 50 25ZM5 25C5 36.0457 13.9543 45 25 45C36.0457 45 45 36.0457 45 25C45 13.9543 36.0457 5 25 5C13.9543 5 5 13.9543 5 25Z"
        fill="url(#paint0_linear_180_426)" />
    <defs>
        <linearGradient id="paint0_linear_180_426" x1="25" y1="0" x2="25" y2="50"
            gradientUnits="userSpaceOnUse">
            <stop stop-color="#C96845" />
            <stop offset="1" stop-color="#633322" stop-opacity="0" />
        </linearGradient>
    </defs>
</svg>

<style>
	.spin-animation {
		animation-duration: 1.5s;
		animation-name: rotate;
		animation-iteration-count: infinite;
		animation-timing-function: linear;
	}

	@keyframes rotate {
		0% {
			transform: rotate(0);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
