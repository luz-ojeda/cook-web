<script lang="ts">
	import { CircularLoading, Icon } from '$lib';

	export let files: FileList | null;
	export let recipeImage: string | undefined = undefined;
	export let validateImage: (file: Blob) => boolean;

	let fileInput: HTMLInputElement;
	let imgPreview: HTMLImageElement;
	let fileReader: FileReader;

	function resetFileInput() {
		fileInput.value = '';
		files = null;
		imgPreview.setAttribute('src', '#');
		imgPreview.style.zIndex = '-1';
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
			previewPicture();
		}
	}

	function previewPicture() {
		const file = fileInput.files;
		if (file) {
			if (validateImage(file[0])) {
				fileReader = new FileReader();
				fileReader.onload = (event) => {
					imgPreview.setAttribute('src', event.target?.result as string);
					imgPreview.style.zIndex = '1';
				};
				fileReader.readAsDataURL(file[0]);
			}
		}
	}

	function onButtonKeyDown(e: MouseEvent | KeyboardEvent) {
		if (e instanceof KeyboardEvent && e.key !== 'Enter') return;

		fileInput.click();
	}

	$: {
		if (recipeImage && imgPreview) imgPreview.style.zIndex = '1';
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
	on:keydown={onButtonKeyDown}
>
	<label for="recipeImage">
		{#if fileReader?.readyState != 1}
			<div>
				Seleccionar o arrastrar una imagen
				<div class="icon">
					<Icon name="upload" width="32" height="32" />
				</div>
			</div>
		{/if}
		<img bind:this={imgPreview} crossorigin="anonymous" src={recipeImage ?? '#'} alt="" />
		<input
			accept=".png, .jpg, .jpeg"
			bind:files
			bind:this={fileInput}
			id="recipeImage"
			on:input={previewPicture}
			name="recipeImage"
			type="file"
		/>
		{#if fileReader?.readyState == 1}
			<!-- 1 = 'LOADING' -->
			<CircularLoading width="64" />
		{/if}
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
		cursor: pointer;
		display: flex;
		flex-direction: column;
		height: 100%;
		justify-content: center;
		position: relative;
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

	img {
		border-radius: 7px;
		height: 100%;
		object-fit: cover;
		position: absolute;
		width: 100%;
		z-index: -1;
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
