/**
 * Image storage is separate from MongoDB.
 * MongoDB stores URLs and metadata only. Binary files live in
 * local /public, Cloudinary, or Cloudflare R2.
 */

export type ImageProviderName = 'local' | 'cloudinary' | 'r2';

export interface ImageMetadata {
  url: string;
  provider: ImageProviderName;
  publicId?: string;
  width?: number;
  height?: number;
  alt: string;
  caption?: string;
}

export interface IImageStorageService {
  resolveUrl(imageRef: string): string;
}

class LocalStorageService implements IImageStorageService {
  resolveUrl(imageRef: string): string {
    if (imageRef.startsWith('http://') || imageRef.startsWith('https://') || imageRef.startsWith('/')) {
      return imageRef;
    }
    return `/images/${imageRef}`;
  }
}

class CloudinaryStorageService implements IImageStorageService {
  constructor(private readonly cloudName: string) {}

  resolveUrl(imageRef: string): string {
    if (imageRef.startsWith('http://') || imageRef.startsWith('https://') || imageRef.startsWith('/')) {
      return imageRef;
    }
    return `https://res.cloudinary.com/${this.cloudName}/image/upload/${imageRef}`;
  }
}

class R2StorageService implements IImageStorageService {
  constructor(private readonly publicBaseUrl: string) {}

  resolveUrl(imageRef: string): string {
    if (imageRef.startsWith('http://') || imageRef.startsWith('https://') || imageRef.startsWith('/')) {
      return imageRef;
    }
    return `${this.publicBaseUrl.replace(/\/$/, '')}/${imageRef}`;
  }
}

function createImageStorage(): IImageStorageService {
  const provider = (process.env.IMAGE_PROVIDER ?? 'local') as ImageProviderName;

  if (provider === 'cloudinary' && process.env.CLOUDINARY_CLOUD_NAME) {
    return new CloudinaryStorageService(process.env.CLOUDINARY_CLOUD_NAME);
  }

  if (provider === 'r2' && process.env.R2_PUBLIC_BASE_URL) {
    return new R2StorageService(process.env.R2_PUBLIC_BASE_URL);
  }

  return new LocalStorageService();
}

export const imageStorage: IImageStorageService = createImageStorage();
