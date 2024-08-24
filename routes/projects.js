import express from 'express';
import multer from 'multer';
import { Project } from '../models/Projects.js';

const router = express.Router();

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set the destination for file uploads
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Set the file name
  }
});

const upload = multer({ storage: storage });
const uploadFields = [
  { name: 'projectimage', maxCount: 1 },
  { name: 'projectlogo', maxCount: 1 },
  { name: 'banner', maxCount: 1 },
  { name: 'image1', maxCount: 1 },
  // { name: 'image2', maxCount: 1 },
  // { name: 'image3', maxCount: 1 },
  // { name: 'image4', maxCount: 1 },
  // { name: 'image5', maxCount: 1 },
  // { name: 'image6', maxCount: 1 },
  // { name: 'image7', maxCount: 1 },
  { name: 'floorplan1', maxCount: 1 },
  { name: 'floorplan2', maxCount: 1 },
  { name: 'masterfloorplan', maxCount: 1 }
];

// Helper function to parse inputs correctly
const parseInputs = (input) => {
  if (typeof input === 'string') {
    try {
      return JSON.parse(input);
    } catch (e) {
      return [];
    }
  }
  return input || [];
};

// POST route to add or update project
router.post('/projects', upload.fields(uploadFields), async (req, res) => {
  try {
    const {
      projectname,
      projectlocation,
      projectbhk,
      projectprice,
      projectfloors,
      projectsquareyards,
      projectsquarefeet,
      reranumber,
      category,
      iframe,
      buildername,
      highlights,
      amenities,
      locationHighlights
    } = req.body;

    // Ensure all required fields are present
    if (!projectname || !projectlocation || !category) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    // Prepare file paths
    const getFilePath = (field) => req.files[field] ? `/uploads/${req.files[field][0].filename}` : null;

    // Check if the project already exists
    let project = await Project.findOne({ projectname });

    if (!project) {
      // Create new project
      project = new Project({
        projectname,
        projectlocation,
        projectprice,
        projectbhk,
        projectfloors,
        projectsquareyards,
        projectsquarefeet,
        reranumber,
        category,
        iframe,
        buildername,
        projectlogo : getFilePath('projectlogo'),
        projectimage: getFilePath('projectimage'),
        banner: getFilePath('banner'),
        image1: getFilePath('image1'),
        // image2: getFilePath('image2'),
        // image3: getFilePath('image3'),
        // image4: getFilePath('image4'),
        // image5: getFilePath('image5'),
        // image6: getFilePath('image6'),
        // image7: getFilePath('image7'),
        floorplan1: getFilePath('floorplan1'),
        floorplan2: getFilePath('floorplan2'),
        masterfloorplan: getFilePath('masterfloorplan'),
        highlights: Array(25).fill(''),
        amenities: Array(25).fill(''),
        locationHighlights: Array(25).fill(''),
        inputs: Array(75).fill(''),
      });
    } else {
      // Update existing project
      project.projectlocation = projectlocation || project.projectlocation;
      project.projectprice = projectprice || project.projectprice;
      project.projectbhk = projectbhk || project.projectbhk;
      project.projectfloors = projectfloors || project.projectfloors;
      project.projectsquareyards = projectsquareyards || project.projectsquareyards;
      project.projectsquarefeet = projectsquarefeet || project.projectsquarefeet;
      project.reranumber = reranumber || project.reranumber;
      project.category = category || project.category;
      project.iframe = iframe || project.iframe;
      project.buildername = buildername || project.buildername;
      project.projectlogo = getFilePath('projectlogo') || project.projectlogo;
      project.projectimage = getFilePath('projectimage') || project.projectimage;
      project.banner = getFilePath('banner') || project.banner;
      project.image1 = getFilePath('image1') || project.image1;
      // project.image2 = getFilePath('image2') || project.image2;
      // project.image3 = getFilePath('image3') || project.image3;
      // project.image4 = getFilePath('image4') || project.image4;
      // project.image5 = getFilePath('image5') || project.image5;
      // project.image6 = getFilePath('image6') || project.image6;
      // project.image7 = getFilePath('image7') || project.image7;
      project.floorplan1 = getFilePath('floorplan1') || project.floorplan1;
      project.floorplan2 = getFilePath('floorplan2') || project.floorplan2;
      project.masterfloorplan = getFilePath('masterfloorplan') || project.masterfloorplan;
    }

    // Update highlights, amenities, and location highlights in inputs array
    project.highlights = parseInputs(highlights);
    for (let i = 0; i < project.highlights.length; i++) {
      project.inputs[i] = project.highlights[i] || '';
    }

    project.amenities = parseInputs(amenities);
    for (let i = 0; i < project.amenities.length; i++) {
      project.inputs[i + 25] = project.amenities[i] || '';
    }

    project.locationHighlights = parseInputs(locationHighlights);
    for (let i = 0; i < project.locationHighlights.length; i++) {
      project.inputs[i + 50] = project.locationHighlights[i] || '';
    }

    await project.save();

    return res.status(201).json({ status: true, message: 'Project data saved successfully' });
  } catch (error) {
    console.error('Error saving project data:', error);
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

// GET route to fetch a specific project by projectname
router.get('/projects/:projectName', async (req, res) => {
  const { projectName } = req.params;

  try {
    const project = await Project.findOne({ projectname: projectName });
    if (!project) {
      return res.status(404).json({ message: 'No project found' });
    }
    return res.status(200).json(project);
  } catch (error) {
    console.error('Error fetching project by projectName:', error);
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

export { router as ProjectRouter };
