import { env } from '$env/dynamic/private';
import {
	BlobServiceClient,
	AccountSASServices,
	AccountSASResourceTypes,
	AccountSASPermissions,
	SASProtocol,
	StorageSharedKeyCredential,
	generateAccountSASQueryParameters
} from '@azure/storage-blob';

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

export { uploadImage };
