const mongoose = require("mongoose");


const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  link: String,
});


const skillSchema = new mongoose.Schema({
  name: String,
});


const profileSchema = new mongoose.Schema({
  name: String,
  role: String,
  about: String,
});

module.exports = {
  Project: mongoose.model("Project", projectSchema),
  Skill: mongoose.model("Skill", skillSchema),
  Profile: mongoose.model("Profile", profileSchema),
};
