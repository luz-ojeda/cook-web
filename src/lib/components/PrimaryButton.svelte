<script lang="ts">
	import type { MouseEventHandler } from "svelte/elements";

    export let width: string;
    export let onClick: MouseEventHandler<HTMLButtonElement>;
</script>

<button on:click={onClick} style="width: {width}">
    <slot></slot>
</button>

<style>
    button {
        padding: 8px 24px;
        text-transform: uppercase;
    }
</style>