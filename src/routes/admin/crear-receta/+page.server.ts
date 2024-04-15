import type { Actions } from './$types';
import { env } from '$env/dynamic/private';
import { fail } from '@sveltejs/kit';
import {
	generateAccountSASQueryParameters,
	StorageSharedKeyCredential,
	AccountSASServices,
	AccountSASResourceTypes,
	AccountSASPermissions,
	SASProtocol,
	BlobServiceClient
} from '@azure/storage-blob';
import { slugify } from '$lib';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const recipeName = data.get('name');
		const slugifiedRecipeName = slugify(recipeName as string);
		const recipeImage = data.get('recipeImage') as File | null;

		const body = {
			name: recipeName,
			summary: data.get('summary') || null,
			ingredients: data.getAll('ingredients'),
			instructions: data.get('instructions'),
			preparationTime: data.get('preparationTime') || null,
			cookingTime: data.get('cookingTime') || null,
			servings: data.get('servings') || null,
			difficulty: data.get('difficulty'),
			vegetarian: Boolean(data.get('vegetarian')),
			pictures:
			recipeImage && recipeImage.size > 0
					? [
							`https://${env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/recipes/${slugifiedRecipeName}/1`
						]
					: null
		};

		const response = await fetch(`${env.API_URL}/recipes`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'x-api-key': env.API_KEY
			},
			body: JSON.stringify(body)
		});

		const responseJson = await response.json();
		if (response.status === 201) {

			if (recipeImage && recipeImage.size > 0) {
				await uploadImage(recipeImage, `${slugifiedRecipeName}/1`);
			}

			return { success: true, data: responseJson };
		}

		if (response.status === 409) {
			return fail(responseJson.status, {
				failure: true,
				message: `La receta con el nombre ${recipeName} ya existe`
			});
		}

		console.error(responseJson);
		return fail(response.status);
	}
} satisfies Actions;

async function uploadImage(recipeImage: File, blobName: string) {
	const sasToken = createSasToken();
	const blobServiceClient = new BlobServiceClient(
		`https://${env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net?${sasToken}`
	);
	const containerClient = blobServiceClient.getContainerClient('recipes');
	const blockBlobClient = containerClient.getBlockBlobClient(blobName);

	try {
		await blockBlobClient.uploadData(Buffer.from(await recipeImage.arrayBuffer()));
	} catch (error) {
		console.error(`An error happened while trying to upload the recipe image: ${error}`);
	}
}

function createSasToken() {
	const sasOptions = {
		services: AccountSASServices.parse('b').toString(),
		resourceTypes: AccountSASResourceTypes.parse('co').toString(),
		permissions: AccountSASPermissions.parse('w'),
		protocol: SASProtocol.Https,
		expiresOn: new Date(new Date().valueOf() + 3 * 60 * 1000) // 3 minutes
	};

	const constants = {
		accountName: env.AZURE_STORAGE_ACCOUNT_NAME,
		accountKey: env.AZURE_STORAGE_ACCOUNT_KEY
	};

	const sharedKeyCredential = new StorageSharedKeyCredential(
		constants.accountName,
		constants.accountKey
	);

	return generateAccountSASQueryParameters(sasOptions, sharedKeyCredential).toString();
}
