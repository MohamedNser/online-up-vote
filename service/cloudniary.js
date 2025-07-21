import cloudinary from 'cloudinary'

cloudinary.v2.config({ 
  cloud_name: 'dh6yudfgj', 
  api_key: parseInt(process.env.APIKEY), 
  api_secret: process.env.SECRETCLOUDINARYKEY
});

export default cloudinary.v2