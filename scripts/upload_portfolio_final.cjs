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
        // Log the message and continue
        console.error(`Error uploading ${path.basename(filePath)}:`, error.message);
        return null;
    }
};

const processDirectory = async () => {
    const assetsDir = path.join(__dirname, '..', 'src', 'assets');
    const directories = ['Chạm vào di sản', 'Có em', 'Giọt nắng bên thềm', 'Mùa trở về', '_'];

    // Read existing results to skip what we've already done
    let results = {};
    const resultsFile = path.join(__dirname, 'upload_results.json');
    if (fs.existsSync(resultsFile)) {
        try {
            results = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
        } catch (e) {
            console.error("Could not parse existing results file.", e.message);
        }
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

                // Get the base filename without extension to check results
                const baseName = file.substring(0, file.lastIndexOf('.')) || file;

                // Check if already uploaded (basic check if result contains filename)
                const alreadyUploaded = results[dir].some(url => url.includes(encodeURIComponent(baseName)));
                if (alreadyUploaded) {
                    continue;
                }

                // Cloudinary free tier has a 10MB limit. 
                // We'll skip large files in this automated script to avoid errors. 
                // The user can upload them manually with the widget later if needed or compress them.
                const stats = fs.statSync(filePath);
                const fileSizeInMegabytes = stats.size / (1024 * 1024);

                if (fileSizeInMegabytes > 10) {
                    console.log(`Skipping ${file} - over 10MB limit (${fileSizeInMegabytes.toFixed(2)}MB).`);
                    continue; // Skip
                }

                let cloudFolder = dir;
                if (dir === '_') cloudFolder = 'other';
                cloudFolder = cloudFolder.replace(/\s+/g, '_');

                console.log(`Uploading ${file} (${fileSizeInMegabytes.toFixed(2)}MB)...`);
                const url = await uploadToCloudinary(filePath, cloudFolder);
                if (url) {
                    results[dir].push(url);
                    // Save incrementally so we don't lose data on crash
                    fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
                }
            }
        }
    }

    console.log('\nUpload complete! Results saved to scripts/upload_results.json');
};

processDirectory();