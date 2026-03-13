import { Cloudinary } from '@cloudinary/url-gen';

const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  },
});

export const getCldImage = (publicId) => {
  return cld.image(publicId).format('auto').quality('auto').toURL();
};

export default cld;
