
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
const uploadFields = [
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
];

router.post('/projects', upload.fields(uploadFields), async (req, res) => {
  try {
    const { batch, projectname } = req.body;

    if (!projectname) {
      return res.status(400).json({ message: 'Project name is required' });
    }

    let project = await Project.findOne({ projectname });

    if (!project) {
      project = new Project({ projectname, inputs: Array(25).fill('') });
    }

    const updateProjectData = async (batch) => {
      switch (batch) {
        case '1':
          project.projectlocation = req.body.projectlocation || project.projectlocation;
          project.projectbhk = req.body.projectbhk || project.projectbhk;
          project.projectfloors = req.body.projectfloors || project.projectfloors;
          project.projectsquareyards = req.body.projectsquareyards || project.projectsquareyards;
          project.projectsquarefeet = req.body.projectsquarefeet || project.projectsquarefeet;
          project.reranumber = req.body.reranumber || project.reranumber;
          project.category = req.body.category || project.category;
          project.banner = req.files['banner'] ? `/uploads/${req.files['banner'][0].filename}` : project.banner;
          project.image1 = req.files['image1'] ? `/uploads/${req.files['image1'][0].filename}` : project.image1;
          project.floorplan1 = req.files['floorplan1'] ? `/uploads/${req.files['floorplan1'][0].filename}` : project.floorplan1;
          project.floorplan2 = req.files['floorplan2'] ? `/uploads/${req.files['floorplan2'][0].filename}` : project.floorplan2;
          project.masterfloorplan = req.files['masterfloorplan'] ? `/uploads/${req.files['masterfloorplan'][0].filename}` : project.masterfloorplan;
          break;

        case '2':
          for (let i = 0; i < 10; i++) {
            project.inputs[i] = req.body[`input${i + 1}`] || project.inputs[i];
          }
          project.image2 = req.files['image2'] ? `/uploads/${req.files['image2'][0].filename}` : project.image2;
          project.image3 = req.files['image3'] ? `/uploads/${req.files['image3'][0].filename}` : project.image3;
          project.image4 = req.files['image4'] ? `/uploads/${req.files['image4'][0].filename}` : project.image4;
          break;

        case '3':
          for (let i = 10; i < 20; i++) {
            project.inputs[i] = req.body[`input${i + 1}`] || project.inputs[i];
          }
          project.image5 = req.files['image5'] ? `/uploads/${req.files['image5'][0].filename}` : project.image5;
          project.image6 = req.files['image6'] ? `/uploads/${req.files['image6'][0].filename}` : project.image6;
          project.image7 = req.files['image7'] ? `/uploads/${req.files['image7'][0].filename}` : project.image7;
          break;

        case '4':
          for (let i = 20; i < 25; i++) {
            project.inputs[i] = req.body[`input${i + 1}`] || project.inputs[i];
          }
          project.iframe = req.body.iframe || project.iframe;
          break;

        default:
          throw new Error('Invalid batch number');
      }
    };

    await updateProjectData(batch);
    await project.save();

    return res.status(201).json({ status: true, message: 'Project data updated successfully' });
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

export { router as ProjectRouter };
