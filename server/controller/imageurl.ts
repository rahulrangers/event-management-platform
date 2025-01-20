import { v2 as cloudinary,UploadApiResponse  } from 'cloudinary';
import { Request, Response } from 'express';

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const imageurl = async (req: MulterRequest, res: Response):Promise<void> => {
    if (!req.file) {
    res.status(400).json({ message: 'No image file uploaded.' });
        return;
  }

  try {
    const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result as UploadApiResponse);
        }
      );
      uploadStream.end(req.file!.buffer);
    });

    res.json({ imageUrl: uploadResult.secure_url });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
};
