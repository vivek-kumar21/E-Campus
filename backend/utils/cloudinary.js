import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// const uploadOnCloudinary = async (localFilePath) => {
//   try {
//     if (!localFilePath) return null;
//     // upload the file on cloudinary
//     const response = await cloudinary.uploader.upload(localFilePath, {
//       // by using this step we can upload our desired file in cloudinary
//       resource_type: "auto",
//       secure: true,
//     });

//     // file has been uploaded successfully
//     // console.log("File is uploaded successfully on cloudinary", response.url);
//     fs.unlinkSync(localFilePath);

//     return response;
//   } catch (error) {
//     fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed
//   }
// };

const uploadOnCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream((error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export { uploadOnCloudinary };
