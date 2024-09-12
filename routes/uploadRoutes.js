const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadController");
const upload = require("../config/multerConfig");
const multer = require("multer");

const uploadFile = multer({ storage: multer.memoryStorage() });

// Define routes for file upload
router.post(
  "/v1/upload/local",
  upload.single("file"),
  uploadController.uploadLocal
);
router.post(
  "/v1/upload/firebase",
  uploadFile.single("file"),
  uploadController.uploadFirebase
);

router.post(
  "/v1/upload/cloudflare",
  uploadFile.single("file"),
  uploadController.uploadCloudflare
);

module.exports = router;
