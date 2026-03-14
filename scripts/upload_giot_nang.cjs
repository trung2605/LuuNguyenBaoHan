const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.VITE_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadToCloudinary = async (filePath, folder) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: `baohan_portfolio/${folder}`,
            use_filename: true,
            unique_filename: false,
            overwrite: true,
        });
        return result.secure_url;
    } catch (error) {
        console.error(`Error uploading ${filePath}:`, error.message || error);
        return null;
    }
};

const processGiotNang = async () => {
    const dirPath = path.join(__dirname, '..', 'src', 'assets', 'Giọt nắng bên thềm', 'compressed');
    const cloudFolder = 'Giot_nang_ben_them';
    const files = fs.readdirSync(dirPath);

    let results = {};
    const resultsFile = path.join(__dirname, 'upload_results.json');
    if (fs.existsSync(resultsFile)) {
        results = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
    }

    results['Giọt nắng bên thềm'] = [];

    console.log(`\nProcessing folder: Giọt nắng bên thềm (compressed)`);

    for (const file of files) {
        const filePath = path.join(dirPath, file);
        if (fs.statSync(filePath).isFile() && !file.startsWith('.')) {
            console.log(`Uploading ${file}...`);
            const url = await uploadToCloudinary(filePath, cloudFolder);
            if (url) {
                results['Giọt nắng bên thềm'].push(url);
                // Save incrementally
                fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
            }
        }
    }

    console.log('\nUpload complete! Results saved to scripts/upload_results.json');
};

processGiotNang();