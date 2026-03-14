const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure Cloudinary
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
        console.error(`Error uploading ${filePath}:`, error);
        return null;
    }
};

const processDirectory = async () => {
    const assetsDir = path.join(__dirname, '..', 'src', 'assets');
    const directories = ['Chạm vào di sản', 'Có em', 'Giọt nắng bên thềm', 'Mùa trở về', '_'];

    const results = {};

    for (const dir of directories) {
        const dirPath = path.join(assetsDir, dir);
        if (!fs.existsSync(dirPath)) continue;

        const files = fs.readdirSync(dirPath);
        results[dir] = [];

        console.log(`Processing folder: ${dir}`);

        for (const file of files) {
            const filePath = path.join(dirPath, file);
            if (fs.statSync(filePath).isFile() && !file.startsWith('.')) {
                // Determine Cloudinary folder name
                let cloudFolder = dir;
                if (dir === '_') cloudFolder = 'other';
                // replace spaces with underscores for url friendliness
                cloudFolder = cloudFolder.replace(/\s+/g, '_');

                console.log(`Uploading ${file} to ${cloudFolder}...`);
                const url = await uploadToCloudinary(filePath, cloudFolder);
                if (url) {
                    results[dir].push(url);
                }
            }
        }
    }

    // Save results to a JSON file for easy copy-pasting
    fs.writeFileSync(path.join(__dirname, 'upload_results.json'), JSON.stringify(results, null, 2));
    console.log('Upload complete! Results saved to scripts/upload_results.json');
};

processDirectory();