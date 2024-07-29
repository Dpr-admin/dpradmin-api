import express from 'express';
import multer from 'multer';
import { Project } from '../models/Projects.js'; // Importing the Project model

const router = express.Router();

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory to save the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Specify the file naming convention
  }
});

const upload = multer({ storage: storage });

// POST route to add a new project
router.post('/projects', upload.fields([
  { name: 'banner', maxCount: 1 },
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 }, 
  { name: 'image3', maxCount: 1 },
  { name: 'image4', maxCount: 1 },
  { name: 'image5', maxCount: 1 },
  { name: 'image6', maxCount: 1 },
  { name: 'image7', maxCount: 1 },
  { name: 'floorplan1', maxCount: 1 },
  { name: 'floorplan2', maxCount: 1 },
  { name: 'masterfloorplan', maxCount: 1 }



]), async (req, res) => {
  console.log('Request received:', req.body);
  const { 
    projectname, 
    projectlocation, 
    projectbhk,
    projectfloors,
    projectsquareyards,
    projectsquarefeet,
    reranumber,
    category,
    iframe,
    input1,
    input2,
    input3,
    input4,
    input5,
    input6,
    input7,
    input8,
    input9,
    input10,
    input11,
    input12,
    input13,
    input14,
    input15,
    input16,
    input17,
    input18,
    input19,
    input20,
    input21,
    input22,
    input23,
    input24,
    input25,


  } = req.body;

  const banner = req.files['banner'] ? req.files['banner'][0] : null;
  const image1 = req.files['image1'] ? req.files['image1'][0] : null;
  const image2 = req.files['image2'] ? req.files['image2'][0] : null;
  const image3 = req.files['image3'] ? req.files['image3'][0] : null;
  const image4 = req.files['image4'] ? req.files['image4'][0] : null;
  const image5 = req.files['image5'] ? req.files['image5'][0] : null;
  const image6 = req.files['image6'] ? req.files['image6'][0] : null;
  const image7 = req.files['image7'] ? req.files['image7'][0] : null;

  const floorplan1 = req.files['floorplan1'] ? req.files['floorplan1'][0] : null;
  const floorplan2 = req.files['floorplan2'] ? req.files['floorplan2'][0] : null;
  const masterfloorplan = req.files['masterfloorplan'] ? req.files['masterfloorplan'][0] : null;





  try {
    // Check if projectname already exists
    const existingProject = await Project.findOne({ projectname });
    if (existingProject) {
      return res.status(400).json({ message: 'Projectname already exists' });
    }

    // Create a new project instance
    const newProject = new Project({
      projectname,
      projectlocation,
      projectbhk,
      projectfloors,
      projectsquareyards,
      projectsquarefeet,
      reranumber,
      category,
      iframe,
      input1,
      input2,
      input3,
      input4,
      input5,
      input6,
      input7,
      input8,
      input9,
      input10,
      input11,
      input12,
      input13,
      input14,
      input15,
      input16,
      input17,
      input18,
      input19,
      input20,
      input21,
      input22,
      input23,
      input24,
      input25,

      banner: banner ? `/uploads/${banner.filename}` : '',
      image1: image1 ? `/uploads/${image1.filename}` : '',
      image2: image2 ? `/uploads/${image2.filename}` : '',
      image3: image3 ? `/uploads/${image3.filename}` : '',
      image4: image4 ? `/uploads/${image4.filename}` : '',
      image5: image5 ? `/uploads/${image5.filename}` : '',
      image6: image6 ? `/uploads/${image6.filename}` : '',
      image7: image7 ? `/uploads/${image7.filename}` : '',
      floorplan1: floorplan1 ? `/uploads/${floorplan1.filename}` : '',
      floorplan2: floorplan2 ? `/uploads/${floorplan2.filename}` : '',
      masterfloorplan: masterfloorplan ? `/uploads/${masterfloorplan.filename}` : '',


    });

    // Save the new project to the database
    await newProject.save();

    return res.status(201).json({ status: true, message: 'Project registered' });
  } catch (error) {
    console.error('Error registering project:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// GET route to fetch all projects by projectName
router.get('/projects/:projectName', async (req, res) => {
  const { projectName } = req.params;

  try {
    const projects = await Project.find({ projectname: projectName });
    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: 'No projects found' });
    }
    return res.status(200).json(projects[0]); // Return the first project
  } catch (error) {
    console.error('Error fetching projects by projectName:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
// GET route to fetch all projects with specific fields
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find({}, 'projectname projectlocation category'); // Fetch only the required fields
    return res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});



// DELETE route to delete a project by projectId
router.delete('/projects/:projectId', async (req, res) => {
  const { projectId } = req.params;

  try {
    const deletedProject = await Project.findByIdAndDelete(projectId);
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    return res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


// PUT route to update a project by projectId
router.put('/projects/:projectId', upload.fields([
  { name: 'banner', maxCount: 1 },
  { name: 'image1', maxCount: 1 },
  { name: 'image2', maxCount: 1 },
  { name: 'image3', maxCount: 1 },
  { name: 'image4', maxCount: 1 },
  { name: 'image5', maxCount: 1 },
  { name: 'image6', maxCount: 1 },
  { name: 'image7', maxCount: 1 },
  { name: 'floorplan1', maxCount: 1 },
  { name: 'floorplan2', maxCount: 1 },
  { name: 'masterfloorplan', maxCount: 1 }
]), async (req, res) => {
  const { projectId } = req.params;
  const {
    projectname,
    projectlocation,
    projectbhk,
    projectfloors,
    projectsquareyards,
    projectsquarefeet,
    reranumber,
    category,
    iframe,
    input1,
    input2,
    input3,
    input4,
    input5,
    input6,
    input7,
    input8,
    input9,
    input10,
    input11,
    input12,
    input13,
    input14,
    input15,
    input16,
    input17,
    input18,
    input19,
    input20,
    input21,
    input22,
    input23,
    input24,
    input25,
  } = req.body;

  const banner = req.files['banner'] ? `/uploads/${req.files['banner'][0].filename}` : null;
  const image1 = req.files['image1'] ? `/uploads/${req.files['image1'][0].filename}` : null;
  const image2 = req.files['image2'] ? `/uploads/${req.files['image2'][0].filename}` : null;
  const image3 = req.files['image3'] ? `/uploads/${req.files['image3'][0].filename}` : null;
  const image4 = req.files['image4'] ? `/uploads/${req.files['image4'][0].filename}` : null;
  const image5 = req.files['image5'] ? `/uploads/${req.files['image5'][0].filename}` : null;
  const image6 = req.files['image6'] ? `/uploads/${req.files['image6'][0].filename}` : null;
  const image7 = req.files['image7'] ? `/uploads/${req.files['image7'][0].filename}` : null;
  const floorplan1 = req.files['floorplan1'] ? `/uploads/${req.files['floorplan1'][0].filename}` : null;
  const floorplan2 = req.files['floorplan2'] ? `/uploads/${req.files['floorplan2'][0].filename}` : null;
  const masterfloorplan = req.files['masterfloorplan'] ? `/uploads/${req.files['masterfloorplan'][0].filename}` : null;

  try {
    // Find the project by ID
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Update the project fields
    project.projectname = projectname || project.projectname;
    project.projectlocation = projectlocation || project.projectlocation;
    project.projectbhk = projectbhk || project.projectbhk;
    project.projectfloors = projectfloors || project.projectfloors;
    project.projectsquareyards = projectsquareyards || project.projectsquareyards;
    project.projectsquarefeet = projectsquarefeet || project.projectsquarefeet;
    project.reranumber = reranumber || project.reranumber;
    project.category = category || project.category;
    project.iframe = iframe || project.iframe;
    project.input1 = input1 || project.input1;
    project.input2 = input2 || project.input2;
    project.input3 = input3 || project.input3;
    project.input4 = input4 || project.input4;
    project.input5 = input5 || project.input5;
    project.input6 = input6 || project.input6;
    project.input7 = input7 || project.input7;
    project.input8 = input8 || project.input8;
    project.input9 = input9 || project.input9;
    project.input10 = input10 || project.input10;
    project.input11 = input11 || project.input11;
    project.input12 = input12 || project.input12;
    project.input13 = input13 || project.input13;
    project.input14 = input14 || project.input14;
    project.input15 = input15 || project.input15;
    project.input16 = input16 || project.input16;
    project.input17 = input17 || project.input17;
    project.input18 = input18 || project.input18;
    project.input19 = input19 || project.input19;
    project.input20 = input20 || project.input20;
    project.input21 = input21 || project.input21;
    project.input22 = input22 || project.input22;
    project.input23 = input23 || project.input23;
    project.input24 = input24 || project.input24;
    project.input25 = input25 || project.input25;

    project.banner = banner || project.banner;
    project.image1 = image1 || project.image1;
    project.image2 = image2 || project.image2;
    project.image3 = image3 || project.image3;
    project.image4 = image4 || project.image4;
    project.image5 = image5 || project.image5;
    project.image6 = image6 || project.image6;
    project.image7 = image7 || project.image7;
    project.floorplan1 = floorplan1 || project.floorplan1;
    project.floorplan2 = floorplan2 || project.floorplan2;
    project.masterfloorplan = masterfloorplan || project.masterfloorplan;

    // Save the updated project
    await project.save();

    return res.status(200).json({ message: 'Project updated successfully' });
  } catch (error) {
    console.error('Error updating project:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});



export { router as ProjectRouter };



// // GET route to fetch all projects by projectName
// router.get('/projects/:projectName', async (req, res) => {
//   const { projectName } = req.params;
  
//   try {
//     const projects = await Project.find({ projectName });
//     if (!projects || projects.length === 0) {
//       return res.status(404).json({ message: 'No projects found' });
//     }
//     return res.status(200).json(projects);
//   } catch (error) {
//     console.error('Error fetching projects by projectName:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });













