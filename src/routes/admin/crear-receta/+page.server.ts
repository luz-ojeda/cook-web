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

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const image = data.get('recipeImage');
		const recipeName = data.get('name');

		await uploadImage(image as File, recipeName as string);

		const body = {
			name: recipeName,
			summary: data.get('summary') || null,
			ingredients: data.getAll('ingredients'),
			instructions: data.get('instructions'),
			preparationTime: data.get('preparationTime') || null,
			cookingTime: data.get('cookingTime') || null,
			servings: data.get('servings') || null,
			difficulty: data.get('difficulty'),
			vegetarian: Boolean(data.get('vegetarian'))
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
			return { success: true, data: responseJson };
		}

		if (response.status === 409) {
			return fail(response.status, {
				failure: true,
				message: `La receta con el nombre ${recipeName} ya existe`
			});
		}

		return fail(response.status);
	}
} satisfies Actions;

async function uploadImage(recipeImage: File | null, recipeName: string) {
	if (recipeImage === null) return;

	const sasToken = createSasToken();
	const blobServiceClient = new BlobServiceClient(
		`https://cookapistorage.blob.core.windows.net?${sasToken}`,
		undefined
	);
	const containerClient = blobServiceClient.getContainerClient('recipes');
	const blockBlobClient = containerClient.getBlockBlobClient(recipeName);

	try {
		await blockBlobClient.uploadData(Buffer.from(await recipeImage.arrayBuffer()), {
			blobHTTPHeaders: { blobContentType: 'image/jpeg' }
		});
	} catch (error) {
		console.error(`An error happened while trying to upload the recipe image: ${error}`);
	}
}

function createSasToken() {
	const sasOptions = {
		services: AccountSASServices.parse('b').toString(),
		resourceTypes: AccountSASResourceTypes.parse('co').toString(),
		permissions: AccountSASPermissions.parse('rwl'),
		protocol: SASProtocol.HttpsAndHttp,
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
