<script lang="ts">
    export let width: string;
</script>

<button style="width: {width}">
    <slot></slot>
</button>

<style>
    button {
        padding: 8px 24px;
        text-transform: uppercase;
    }
</style>