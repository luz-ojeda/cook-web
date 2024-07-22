<script lang="ts">
    export let onClick: () => void;
    export let title: string = "";
    export let label: string;
</script>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="chip interactive-pointer-opacity" on:click={onClick} {title}>
	<span>
		{label}
	</span>
	<slot/>
</div>

<style lang="scss">
	@import '../../sass/colors.scss';

	.chip {
		align-items: center;
		background-color: var(--chip);
		border-radius: 12px;
		color: var(--grey300);
		display: flex;
		font-size: var(--text-xs);
		font-weight: bold;
		letter-spacing: 0.025rem;
		padding: 4px 8px;
		margin-right: 6px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: max-content;
	}
</style>