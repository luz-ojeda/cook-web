<div class="circle spin-animation"></div>

<style lang="scss">
	@import '../../sass/variables.scss';

	.circle {
		width: var(--circle-width);
		height: var(--circle-width);
		background: conic-gradient(darkgray 90deg, ghostwhite 0deg);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.circle::before {
		background-color: var(--background, $bgColor);
		content: '';
		position: absolute;
		width: 80%;
		height: 80%;
		border-radius: 50%;
	}

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
