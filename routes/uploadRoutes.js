const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadController");
const upload = require("../config/multerConfig");
const multer = require("multer");
const fs = require("fs");
const uploadFile = multer({ storage: multer.memoryStorage() });
const path = require('path');

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

router.get('/v1/read-file', (req, res)=>{
  fs.readFile("./uploads/100MB.pdf", (err, data)=>{
    res.setHeader('Content-Type', 'application/pdf');
    res.end(data);
    data = null; 
    
  })
})

router.get('/v1/read-file-stream', (req, res)=>{
  const stream = fs.createReadStream("./uploads/100MB.pdf");
  stream.on("data", (chunk)=> res.write(chunk));
  stream.on("end", ()=>res.end());
})

module.exports = router;
