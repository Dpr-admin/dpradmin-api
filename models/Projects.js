import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  projectname: { type: String, required: true, unique: true },
  projectlocation: String,
  projectprice: Number,
  projectbhk: String,
  projectfloors: String,
  projectsquareyards: String,
  projectsquarefeet: String,
  reranumber: String,
  category: String,
  buildername: String,
  projectlogo: String,
  projectimage: String,
  banner: String,
  image1: String,
  // image2: String,
  // image3: String,
  // image4: String,
  // image5: String,
  // image6: String,
  // image7: String,
  floorplan1: String,
  floorplan2: String,
  masterfloorplan: String,
  iframe: String,
  inputs: [String]
}, { timestamps: true });

const ProjectModel = mongoose.model('Project', ProjectSchema);

export { ProjectModel as Project };
