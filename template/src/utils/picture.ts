import imageCompression from "browser-image-compression";
import { instance } from "../state";

// Default Options to compress the images
const compressionOptions = {
  maxSizeMB: 0.5,
  maxWidthOrHeight: 700,
};

interface Compress {
  file: File,
  options?: {
    maxSizeMB?: number,
    maxWidthOrHeight?: number
  }
}

// Pass options object to override defaults
async function compressPhoto({ file, options }: Compress) {
  const compressedImg = await imageCompression(file, {
    ...compressionOptions,
    ...options,
  });
  console.log(
    `Compressed from: ${(file.size / 1048576).toFixed(2)}MB to ${(
      compressedImg.size / 1048576
    ).toFixed(2)}MB`
  );
  const preview = await imageCompression.getDataUrlFromFile(compressedImg);
  return { preview, file: compressedImg };
}


interface Upload {
  file: File,
  type: string  
}

function uploadPhoto({ file, type }: Upload): Promise<void | string> {
  if (!file) return Promise.reject("No file");
  else {
    return new Promise((resolve, reject) => {
      instance.api
        .post("picture", {
          type,
          fileType: file.type,
        })
        .then((res: any) => (res.data))
        .then(({ fileName, signedRequest, url }: any) => {
          const newfile = new File([file], fileName);
          fetch(signedRequest, { method: 'PUT', body: newfile, headers: { 'Content-Type': file.type, Origin: import.meta.env.VITE_APP_URL } })
            .then(res => {
              if (res.ok) resolve(url);
              else resolve();
            })
            .catch((err) => {
              console.log(err);
              resolve();
              //reject('Issue pushing image to S3');
            });
        })
        .catch((err: any) => {
          console.error(err);
          reject("Issue uploading picture");
        });
    });
  }
}

export { compressPhoto, uploadPhoto };
