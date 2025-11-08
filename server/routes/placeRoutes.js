import express from "express";
import { addPlace, getPlaceById, getPlaces,  } from "../controllers/placeController.js";
import { uploadPlaceImages } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/add-place", uploadPlaceImages, addPlace);
router.get("/get-places",getPlaces)
router.get("/get-place/:id",getPlaceById)


export default router;
