<script lang="ts">
	export let label: string;
	export let placeholder = '';
	export let id = '';
	export let name = '';
	export let inputValue = '';
</script>

<div class="flex-column">
	<label class="margin-bottom--xs" for={id}>{label}</label>
	<input on:keydown {placeholder} type="text" {id} {name} bind:value={inputValue} />
</div>
