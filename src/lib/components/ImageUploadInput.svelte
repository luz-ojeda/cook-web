<script lang="ts">
	import { Icon } from '$lib';

	export let files: FileList | null;
	let fileInput: HTMLInputElement;

	function resetFileInput() {
		fileInput.value = '';
		files = null;
	}

	function onDragEnter(event: DragEvent) {
		if (event.target && event.target instanceof Element) {
			event.target.classList.add('dragover');
		}
	}

	function onDragLeave(event: DragEvent) {
		if (event.target && event.target instanceof Element) {
			event.target.classList.remove('dragover');
		}
	}

	function onDrop(event: DragEvent) {
		event.preventDefault();
		if (event.target && event.target instanceof Element) {
			event.target.classList.remove('dragover');
		}

		if (event.dataTransfer === null || event.dataTransfer.items[0].kind !== 'file') return;

		const file = event.dataTransfer.items[0].getAsFile();
		if (file !== null) {
			let list = new DataTransfer();
			let myFileList = list.files;
			list.items.add(file);

			fileInput.files = myFileList;
			files = myFileList;
		}
	}
</script>

<button
	class="dropzone-button"
	style="width: 200px; height: 200px;"
	type="button"
	on:dragover={(e) => e.preventDefault()}
	on:drop={onDrop}
	on:dragenter={onDragEnter}
	on:dragleave={onDragLeave}
>
	<label for="recipeImage"
		>Seleccionar o arrastrar una imagen
		<div class="icon">
			<Icon name="upload" width="32" height="32" />
		</div>
		<input
			accept=".png, .jpg, .jpeg"
			bind:files
			bind:this={fileInput}
			id="recipeImage"
			name="recipeImage"
			type="file"
		/>
	</label>
</button>
<button disabled={!files} on:click={resetFileInput}>Remover imagen</button>

<style lang="scss">
	@import '../../sass/colors.scss';

	.dropzone-button {
		border-radius: 7px;
		margin-right: 12px;
		border: 1px dashed $grey500;
		padding: 0;
		position: relative;
	}

	label {
		align-items: center;
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: center;
		cursor: pointer;
		width: 100%;
	}

	input {
		height: 100%;
		left: 0;
		position: absolute;
		top: 0;
		visibility: hidden;
		width: 100%;
	}

	:global(.dragover) {
		outline: 1px solid $primaryColor;
		background-color: $lightestPrimaryColor;
	}

	.icon {
		color: $grey500;
		margin-top: 12px;
	}
</style>
