import { Internship } from "../models/internship.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// create new internship
const createInternship = asyncHandler(async (req, res) => {
  try {
    const newInternship = new Internship(req.body);
    const savedInternship = await newInternship.save();

    return res
      .status(200)
      .json(
        new ApiResponse(200, savedInternship, "Internship created successfully")
      );
  } catch (error) {
    throw new ApiError(500, error);
  }
});

// update internship information
const updateInternship = asyncHandler(async (req, res) => {
  try {
    const updatedInternship = await Internship.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedInternship,
          "Internship updated successfully"
        )
      );
  } catch (error) {
    throw new ApiError(500, error);
  }
});

// delete internship
const deleteInternship = asyncHandler(async (req, res) => {
  try {
    await Internship.findByIdAndDelete(req.params.id);

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Internship deleted successfully"));
  } catch (error) {
    throw new ApiError(500, error);
  }
});

// get internship details
const getInternshipDetails = asyncHandler(async (req, res) => {
    try {
        const internship = await Internship.findById(req.params.id);
        // console.log(req.params.id);

        return res
          .status(200)
          .json(new ApiResponse(200, internship, "Fetched internship details successfully"));
    } catch (error) {
        throw new ApiError(500, error);
    }
});

// get all internships
const getAllInternships = asyncHandler(async (req, res) => {
  try {
    let searchQuery = {};

    if (req.query.search) {
      searchQuery = {
        $or: [
          { role: { $regex: req.query.search, $options: "i" } },
          { companyName: { $regex: req.query.search, $options: "i" } },
          { location: { $regex: req.query.search, $options: "i" } },
        ],
      };
    }

    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 5;
    let skip = (page - 1) * limit;

    const totalCount = await Internship.countDocuments(searchQuery);

    const internships = await Internship.find(searchQuery)
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      status: 200,
      data: internships,
      totalCount,
      message: "Fetched all internships details successfully",
    });
  } catch (error) {
    console.error("Error fetching internships:", error.message);
    throw new ApiError(500, error.message);
  }
});




export {
  createInternship,
  updateInternship,
  deleteInternship,
  getInternshipDetails,
  getAllInternships,
};
