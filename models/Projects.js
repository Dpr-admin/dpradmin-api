import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  banner: {
    type: String,
    required: true
  },
  image1: {
    type: String,
    required: true
  },
  projectname: {
    type: String,
    required: true,
    unique: true
  },
  projectlocation: {
    type: String,
    required: true
  },
  projectbhk: {
    type: String,
    required: true
  },
  projectfloors: {
    type: String,
    required: true
  },
  projectsquareyards: {
    type: String,
    required: true
  },
  projectsquarefeet: {
    type: String,
    required: true
  },
  reranumber: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  iframe: {
    type: String,
    required: true
  },

// project highlight schema

input1: {
  type: String,
  required: true
}, 
input2: {
  type: String,
  required: true
}, 
input3: {
  type: String,
  required: true
}, 
input4: {
  type: String,
  required: true
}, 
input5: {
  type: String,
  required: true
}, 
input6: {
  type: String,
  required: true
}, 
input7: {
  type: String,
  required: true
}, 
input8: {
  type: String,
  required: true
}, 
input9: {
  type: String,
  required: true
}, 
input10: {
  type: String,
  required: true
},
input11: {
  type: String,
  required: true
},
input12: {
  type: String,
  required: true
},
input13: {
  type: String,
  required: true
},
input14: {
  type: String,
  required: true
},
input15: {
  type: String,
  required: true
},
input16: {
  type: String,
  required: true
},
input17: {
  type: String,
  required: true
},
input18: {
  type: String,
  required: true
},
input19: {
  type: String,
  required: true
},
input20: {
  type: String,
  required: true
},
input21: {
  type: String,
  required: true
},
input22: {
  type: String,
  required: true
},
input23: {
  type: String,
  required: true
},
input24: {
  type: String,
  required: true
},
input25: {
  type: String,
  required: true
},
image2: {
  type: String,
  required: true
},
 image3: {
  type: String,
  required: true
},
 image4: {
  type: String,
  required: true
},
image5: {
  type: String,
  required: true
}, image6: {
  type: String,
  required: true
}, image7: {
  type: String,
  required: true
},
floorplan1: {
  type: String,
  required: true
},
floorplan2: {
  type: String,
  required: true
},
masterfloorplan: {
  type: String,
  required: true
}
});

const ProjectModel = mongoose.model("Project", ProjectSchema);

export { ProjectModel as Project };
