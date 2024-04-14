<script lang="ts">
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
	style="width: 200px; height: 200px;"
	on:dragover={(e) => e.preventDefault()}
	on:drop={onDrop}
	on:dragenter={onDragEnter}
	on:dragleave={onDragLeave}
>
	<input
		accept=".png, .jpg, .jpeg"
		bind:files
		bind:this={fileInput}
		id="recipeImage"
		name="recipeImage"
		type="file"
	/>
	<label for="recipeImage">Elige una imagen para la receta</label>
</button>
<button disabled={!files} on:click={resetFileInput}>Remover imagen</button>

<style lang="scss">
	@import '../../sass/colors.scss';

	button {
		border-radius: 7px;
		margin-right: 12px;
	}

	:global(.dragover) {
		outline: 1px solid $primaryColor;
		background-color: $lightestPrimaryColor;
	}
</style>
