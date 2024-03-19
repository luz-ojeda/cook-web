<script lang="ts">
	export let label: string;
	export let placeholder = '';
	export let id = '';
	export let name = '';
	export let inputValue = '';
</script>

<div class="flex-column">
	<label for={id}>{label}</label>
	<input on:keydown {placeholder} type="text" {id} {name} bind:value={inputValue} />
</div>

<style lang="scss">
	@import '../../sass/variables.scss';

	label {
		margin-bottom: 6px;
	}

	input {
		border-radius: 5px;
		border: 1px solid #cccccc;
		padding: 6px 8px;
	}
</style>
