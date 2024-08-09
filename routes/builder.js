// import express from 'express';
// import multer from 'multer';
// import { Builder } from '../models/Builders.js';


// const router = express.Router();

// // Set up multer for file upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'builderslogo/'); // Specify the directory to save the uploaded files
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`); // Specify the file naming convention
//   }
// });

// const upload = multer({ storage: storage });


// // POST route to add a new builder
// router.post('/builders', upload.fields([
//     { name: 'logoImage', maxCount: 1 },
  
//   ]), async (req, res) => {
//     console.log('Request received:', req.body);
//     const { 
//         builderName, 
//         about, 
//         officeAddress
  
//     } = req.body;
  
//     const logoImage = req.files['logoImage'] ? req.files['logoImage'][0] : null;


//   try {
//     // Check if buildername already exists
//     const existingBuilder = await Builder.findOne({ builderName });
//     if (existingBuilder) {
//       return res.status(400).json({ message: 'Builder already exists' });
//     }

//     // Create a new builder instance
//     const newBuilder = new Builder({
//         builderName,
//         about,
//         officeAddress,
   

//         logoImage: logoImage ? `/builderslogo/${logoImage.filename}` : '',
  

//     });

//     // Save the new project to the database
//     await newBuilder.save();

//     return res.status(201).json({ status: true, message: 'Builder Added' });
//   } catch (error) {
//     console.error('Error Adding Builder:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }


// });

// // GET route to fetch all builders
// router.get('/builders', async (req, res) => {
//   try {
//     const builders = await Builder.find();
//     return res.status(200).json(builders);
//   } catch (error) {
//     console.error('Error fetching builders:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });



// router.get('/builders/:builderName', async (req, res) => {
//   const { builderName } = req.params;

//   try {
//     const builder = await Builder.findOne({ builderName });
//     if (!builder) {
//       return res.status(404).json({ message: 'No builder found' });
//     }
//     return res.status(200).json(builder);
//   } catch (error) {
//     console.error('Error fetching builder by builderName:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });

// export { router as BuilderRouter };

import express from 'express';
import multer from 'multer';
import { Builder } from '../models/Builders.js';


const router = express.Router();

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'builderslogo/'); // Specify the directory to save the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Specify the file naming convention
  }
});

const upload = multer({ storage: storage });


// POST route to add a new builder
router.post('/builders', upload.fields([
    { name: 'logoImage', maxCount: 1 },
  
  ]), async (req, res) => {
    console.log('Request received:', req.body);
    const { 
        builderName, 
        about, 
        officeAddress
  
    } = req.body;
  
    const logoImage = req.files['logoImage'] ? req.files['logoImage'][0] : null;


  try {
    // Check if buildername already exists
    const existingBuilder = await Builder.findOne({ builderName });
    if (existingBuilder) {
      return res.status(400).json({ message: 'Builder already exists' });
    }

    // Create a new builder instance
    const newBuilder = new Builder({
        builderName,
        about,
        officeAddress,
   

        logoImage: logoImage ? `/builderslogo/${logoImage.filename}` : '',
  

    });

    // Save the new project to the database
    await newBuilder.save();

    return res.status(201).json({ status: true, message: 'Builder Added' });
  } catch (error) {
    console.error('Error Adding Builder:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


// GET route to fetch all builders
router.get('/builders', async (req, res) => {
  try {
    const builders = await Builder.find();
    return res.status(200).json(builders);
  } catch (error) {
    console.error('Error fetching builders:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});



router.get('/builders/:builderName', async (req, res) => {
  const { builderName } = req.params;

  try {
    const builder = await Builder.findOne({ builderName });
    if (!builder) {
      return res.status(404).json({ message: 'No builder found' });
    }
    return res.status(200).json(builder);
  } catch (error) {
    console.error('Error fetching builder by builderName:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export { router as BuilderRouter };