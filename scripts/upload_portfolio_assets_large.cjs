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
            // Cloudinary free tier has a 10MB limit for images. Auto-compressing and resizing them to fix the upload error.
            quality: 'auto',
            fetch_format: 'auto',
            width: 1920, // Max width standard
            crop: 'limit'
        });
        return result.secure_url;
    } catch (error) {
        console.error(`Error uploading ${filePath}:`, error.message || error);
        return null; // Return null so we can skip
    }
};

const processDirectory = async () => {
    // We already uploaded Chạm vào di sản. So just start from Có em over to others.
    const assetsDir = path.join(__dirname, '..', 'src', 'assets');
    const directories = ['Có em', 'Giọt nắng bên thềm', 'Mùa trở về', '_'];

    // Load previously saved results if exists to merge with it
    let results = {};
    const resultsFile = path.join(__dirname, 'upload_results.json');
    if (fs.existsSync(resultsFile)) {
        try {
            results = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
        } catch (e) {
            console.error("Could not parse existing results file, starting fresh.");
        }
    }

    for (const dir of directories) {
        const dirPath = path.join(assetsDir, dir);
        if (!fs.existsSync(dirPath)) continue;

        const files = fs.readdirSync(dirPath);
        if (!results[dir]) results[dir] = []; // Initialize array if it doesn't exist

        console.log(`\nProcessing folder: ${dir}`);

        for (const file of files) {
            const filePath = path.join(dirPath, file);
            if (fs.statSync(filePath).isFile() && !file.startsWith('.')) {
                // Determine Cloudinary folder name
                let cloudFolder = dir;
                if (dir === '_') cloudFolder = 'other';
                cloudFolder = cloudFolder.replace(/\s+/g, '_'); // Replace spaces for URLs

                // Check if already in results
                const prevEntry = results[dir].find(v => v.includes(encodeURIComponent(file.split('.')[0])));
                if (prevEntry) {
                    console.log(`Skipping ${file}, already uploaded.`);
                    continue;
                }

                console.log(`Uploading ${file} to ${cloudFolder}...`);
                const url = await uploadToCloudinary(filePath, cloudFolder);
                if (url) {
                    results[dir].push(url);
                }
            }
        }
    }

    fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
    console.log('\nUpload complete! Results saved to scripts/upload_results.json');
};

processDirectory();