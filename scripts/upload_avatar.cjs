const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const path = require('path');

cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.VITE_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadAvatar = async () => {
  try {
    // Correct path: up one level from scripts folder
    const avatarPath = path.join(__dirname, '..', 'src', 'assets', 'avatar.jpg');
    console.log('Uploading avatar from:', avatarPath);
    
    const result = await cloudinary.uploader.upload(avatarPath, {
      folder: 'baohan_portfolio',
      public_id: 'avatar',
      overwrite: true,
    });
    
    console.log('--- Upload Success ---');
    console.log('Public ID:', result.public_id);
    console.log('Secure URL:', result.secure_url);
    console.log('-----------------------');
  } catch (error) {
    console.error('Upload failed:', error);
  }
};

uploadAvatar();
