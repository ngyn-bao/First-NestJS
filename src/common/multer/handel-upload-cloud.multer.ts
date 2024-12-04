import * as multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
// Configuration
cloudinary.config({
  cloud_name: 'dy7e0w5bq',
  api_key: '638168749426376',
  api_secret: process.env.CLOUDINARY_SECRET, // Click 'View API Keys' above to copy your API secret
});

const storageCloud = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'images',
    // format: async (req, file) => "png", // supports promises as well
    // public_id: (req, file) => "computed-filename-using-request",
  } as any,
});

export default storageCloud;
