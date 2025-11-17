const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import all models
const { Project, Skill, Profile } = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

const seedDatabase = async () => {
  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    await Project.insertMany([
      {
        title: "Portfolio Website",
        description: "A clean personal portfolio built with Angular.",
      },
      {
        title: "Tasks Dashboard",
        description: "Admin dashboard for managing tasks and projects.",      },
      {
        title: "API Explorer",
        description: "Simple REST client to explore APIs quickly.",

      },
    ]);
    console.log("Seeded projects collection");
  }

  const skillCount = await Skill.countDocuments();
  if (skillCount === 0) {
    await Skill.insertMany([
      { name: "Angular" },
      { name: "TypeScript" },
      { name: "Node.js" },
      { name: "MongoDB" },
      { name: "Tailwind CSS" },
    ]);
    console.log("Seeded skills collection");
  }

  const profile = await Profile.findOne();
  if (!profile) {
    await Profile.create({
      name: "Jane Doe",
      role: "Frontend Developer",
      about:
        "I craft delightful user interfaces and seamless experiences with Angular and modern web tooling.",
    });
    console.log("Seeded profile collection");
  }
};

// Connect MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/portfolio_simple")
  .then(async () => {
    console.log("MongoDB connected");
    await seedDatabase();
  })
  .catch((err) => console.log(err));


// Create project
app.post("/projects", async (req, res) => {
  const item = new Project(req.body);
  await item.save();
  res.send(item);
});

// Get all projects
// app.get('/api/items', async (req, res) => {
//   try {
//     const items = await Item.find(); // fetch all items
//     res.json(items);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// 
app.get("/projects", async (req, res) => {
  res.send(await Project.find());
});

app.put("/projects/:id", async (req, res) => {
  const item = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(item);
});


app.delete("/projects/:id", async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.send({ message: "Deleted" });
});


app.post("/skills", async (req, res) => {
  const item = new Skill(req.body);
  await item.save();
  res.send(item);
});

app.get("/skills", async (req, res) => {
  res.send(await Skill.find());
});

app.put("/skills/:id", async (req, res) => {
  res.send(await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

app.delete("/skills/:id", async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.send({ message: "Deleted" });
});


app.post("/profile", async (req, res) => {
  let profile = await Profile.findOne();

  if (!profile) {
    profile = new Profile(req.body);
    await profile.save();
  } else {
    profile = await Profile.findOneAndUpdate({}, req.body, { new: true });
  }

  res.send(profile);
});


app.get("/profile", async (req, res) => {
  res.send(await Profile.findOne());
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
