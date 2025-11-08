import path from "path";
import Place from "../models/Places.js";
import Review from "../models/Review.js";
import { ensureDir, compressToWebp } from "../utils/fileHelper.js";

export const addPlace = async (req, res) => {
  try {
    const {
      name,
      city,
      state,
      country,
      description,
      entryFee,
      timings,
      location,
      tips,
      category,
    } = req.body;

    const placeDir = path.join(process.cwd(), "uploads", "places", name.replace(/\s+/g, "_"));
    const photosDir = path.join(placeDir, "photos");
    ensureDir(photosDir);

    let mainImagePath = "";
    let photosArray = [];

    // Handle main image
    if (req.files?.mainImage?.[0]) {
      const mainImgFile = req.files.mainImage[0];
      const mainOutput = path.join(placeDir, `main_${Date.now()}.webp`);
      await compressToWebp(mainImgFile.path, mainOutput);
      mainImagePath = `/uploads/places/${name.replace(/\s+/g, "_")}/${path.basename(mainOutput)}`;
    }

    // Handle multiple photos
    if (req.files?.photos) {
      for (const photo of req.files.photos) {
        const output = path.join(photosDir, `${Date.now()}_${photo.originalname.split('.')[0]}.webp`);
        await compressToWebp(photo.path, output);
        photosArray.push(`/uploads/places/${name.replace(/\s+/g, "_")}/photos/${path.basename(output)}`);
      }
    }

    const newPlace = new Place({
      name,
      city,
      state,
      country,
      description,
      entryFee,
      timings,
      location,
      mainImage: mainImagePath,
      photos: photosArray,
      tips,
      category,
    });

    await newPlace.save();

    res.status(201).json({
      success: true,
      message: "Place added successfully",
      data: newPlace,
    });
  } catch (error) {
    console.error("Add Place Error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while adding place",
      error: error.message,
    });
  }
};


export const getPlaces = async (req, res) => {
    try {
      const { search } = req.query;
  
      let filter = {};
  
      if (search && search.trim() !== "") {
        const regex = new RegExp(search, "i");
        filter = {
          $or: [
            { name: regex },
            { city: regex },
            { state: regex },
            { country: regex },
            { category: regex },
          ],
        };
      }
  
      const places = await Place.find(filter)
        .select("name city state country mainImage category entryFee")
        .sort({ createdAt: -1 });
  
      res.status(200).json({
        success: true,
        count: places.length,
        data: places,
      });
    } catch (error) {
      console.error("❌ Get Places Error:", error);
      res.status(500).json({
        success: false,
        message: "Something went wrong while fetching places",
        error: error.message,
      });
    }
  };
  
  export const getPlaceById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const place = await Place.findById(id)
        .populate("reviews") 
        .lean();
  
      if (!place) {
        return res.status(404).json({
          success: false,
          message: "Place not found",
        });
      }
  
      res.status(200).json({
        success: true,
        data: place,
      });
    } catch (error) {
      console.error("❌ Get Place By ID Error:", error);
      res.status(500).json({
        success: false,
        message: "Something went wrong while fetching place details",
        error: error.message,
      });
    }
  };