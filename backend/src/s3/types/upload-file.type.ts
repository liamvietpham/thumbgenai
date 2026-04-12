export type UploadFile = {
  fileName: string;
  contentType: string;
  file: Buffer;
  folderName?: string;
};
