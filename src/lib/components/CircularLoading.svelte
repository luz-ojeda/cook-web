<div class="circle spin-animation"></div>

<style>
	.circle {
		width: var(--circle-width);
		height: var(--circle-width);
		background: conic-gradient(gray 90deg, lightgray 0deg);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.circle::before {
		content: '';
		position: absolute;
		width: 70%;
		height: 70%;
		background: rgb(233, 233, 237);
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
