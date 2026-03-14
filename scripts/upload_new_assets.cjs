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
            quality: 'auto',
            fetch_format: 'auto',
            width: 1920,
            crop: 'limit'
        });
        return result.secure_url;
    } catch (error) {
        console.error(`Error uploading ${filePath}:`, error.message || error);
        return null;
    }
};

const processDirectories = async () => {
    const assetsDir = path.join(__dirname, '..', 'src', 'assets');
    const directories = ['Chợ Hàn, Chút Tết', 'Giọt nắng bên thềm', 'Có em', 'Mùa trở về'];

    let results = {};
    const resultsFile = path.join(__dirname, 'upload_results.json');
    if (fs.existsSync(resultsFile)) {
        results = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
    }

    for (const dir of directories) {
        const dirPath = path.join(assetsDir, dir);
        if (!fs.existsSync(dirPath)) continue;

        const files = fs.readdirSync(dirPath);
        if (!results[dir]) results[dir] = [];

        console.log(`\nProcessing folder: ${dir}`);

        for (const file of files) {
            const filePath = path.join(dirPath, file);
            if (fs.statSync(filePath).isFile() && !file.startsWith('.')) {
                // Determine Cloudinary folder name
                let cloudFolder = dir.replace(/\s+/g, '_').replace(/,/g, '');

                // Skip if already in results (quick name check)
                const baseName = file.split('.')[0];
                if (results[dir].some(url => url.includes(encodeURIComponent(baseName)))) {
                    console.log(`Skipping ${file}, already uploaded.`);
                    continue;
                }

                console.log(`Uploading ${file}...`);
                const url = await uploadToCloudinary(filePath, cloudFolder);
                if (url) {
                    results[dir].push(url);
                    // Save incrementally
                    fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
                }
            }
        }
    }

    console.log('\nUpload complete! Results saved to scripts/upload_results.json');
};

processDirectories();