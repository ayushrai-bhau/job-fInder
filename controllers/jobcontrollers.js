const jobs = require("../models/jobs");

const createJobDetail = async (req, res, next) => {
  try {
    const {
      companyName,
      logoUrl,
      title,
      description,
      salary,
      location,
      duration,
      locationType,
      skills,
    } = req.body;

    if (
      !companyName ||
      !logoUrl ||
      !title ||
      !description ||
      !salary ||
      !location ||
      !duration ||
      !locationType ||
      !skills
    ) {
      return res.status(404).json({
        err: "bad request",
      });
    }
    const userIsExist = await jobs.findOne({
      companyName: companyName,
      logoUrl: logoUrl,
      title: title,
    });
    if (userIsExist) {
      return res.status(409).json({ err: "jobDetails is already exist" });
    }
    const jobDetails = new jobs({
      companyName,
      logoUrl,
      title,
      description,
      salary,
      location,
      duration,
      locationType,
      skills,
    });
    await jobDetails.save();
    res.status(201).json({ message: "jobDetails created successfully" });
  } catch (error) {
    next(error);
  }
};

const getJobDetailsById = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    if (!jobId) {
      return res.status(404).json({
        err: "bad request",
      });
    }
    const jobDetails = await jobs.findById(jobId);
    res.status(200).json({ data: jobDetails });
  } catch (error) {
    next(error);
  }
};

const getAllJobDetails = async (req, res, next) => {
  try {
    const title = req.query.title || "";
    const skills = req.query.skills;
    let skillsChangeToArray;
    if (skills) {
      skillsChangeToArray = skills.split(",");
    }

    const jobDetails = await jobs.find(
      {
        title: { $regex: title, $options: "i" },
        skills: { $in: skillsChangeToArray,$regex: skills,$options: "i" },
      },
      { title: 1, salary: 1, logoUrl: 1, location: 1, skills: 1 }
    );
    res.status(200).json({ data: jobDetails });
  } catch (error) {
    next(error);
  }
};

const editJobDetailByID = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    if (!jobId) {
      return res.status(400).json({
        errorMessage: "BAD REQUEST",
      });
    }

    const {
      companyName,
      logoUrl,
      title,
      description,
      salary,
      location,
      duration,
      locationType,
      skills,
    } = req.body;
    if (
      !companyName ||
      !logoUrl ||
      !title ||
      !description ||
      !salary ||
      !location ||
      !duration ||
      !locationType ||
      !skills
    ) {
      return res.status(404).json({
        err: "bad request",
      });
    }
    await jobs.updateOne(
      { _id: jobId },
      {
        $set: {
          companyName,
          logoUrl,
          title,
          description,
          salary,
          location,
          duration,
          locationType,
          skills,
        },
      }
    );

    res.json({ message: "Job details updated succesfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createJobDetail,
  getJobDetailsById,
  getAllJobDetails,
  editJobDetailByID,
};
