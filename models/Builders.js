import mongoose from 'mongoose';

const BuilderSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },

  logoImage: {
    type: String,
    required: true
  },

  builderName: {
    type: String,
    required: true,
    unique: true
  },
  about: {
    type: String,
    required: true,
    unique: true
  },
  officeAddress: {
    type: String,
    required: true,
    unique: true
  },

});

const BuilderModel = mongoose.model("Builder", BuilderSchema);

export { BuilderModel as Builder };