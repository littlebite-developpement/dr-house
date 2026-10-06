import type { IStoragePort } from '../../application/ports/storage-port.js';

export class StoragePort implements IStoragePort {
  async upload(file: Buffer, path: string): Promise<string> {
    // TODO: Intégrer un service de stockage (S3, GCS, etc.)
    console.log(`[STORAGE] Upload vers ${path} (${file.length} bytes)`);
    return path;
  }

  async download(path: string): Promise<Buffer> {
    // TODO: Intégrer un service de stockage
    console.log(`[STORAGE] Download depuis ${path}`);
    return Buffer.from('');
  }

  async delete(path: string): Promise<void> {
    // TODO: Intégrer un service de stockage
    console.log(`[STORAGE] Suppression de ${path}`);
  }
}
