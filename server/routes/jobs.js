const express = require("express");
const router = express.Router();
const { Job, validateJob } = require("../models/job");

// Create a new job
router.post("/", async (req, res) => {
  try {
    const { error } = validateJob(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const newJob = new Job(req.body);
    await newJob.save();
    res.status(201).send({ data: newJob, message: "Job created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Get all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).send({ data: jobs });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Get a single job by ID
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).send({ message: "Job not found" });
    res.status(200).send({ data: job });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Update a job by ID
router.put("/:id", async (req, res) => {
  try {
    const { error } = validateJob(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedJob) return res.status(404).send({ message: "Job not found" });
    res.status(200).send({ data: updatedJob, message: "Job updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Delete a job by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) return res.status(404).send({ message: "Job not found" });
    res.status(200).send({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;