const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploadController");
const upload = require("../config/multerConfig");
const multer = require("multer");
const fs = require("fs");
const uploadFile = multer({ storage: multer.memoryStorage() });
const path = require("path");
const zlib = require("zlib");
const workerpool = require('workerpool');
const pool = workerpool.pool();
console.log(pool.stats());


const { exec } = require('child_process');
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

router.get("/v1/read-file", (req, res) => {
  fs.readFile("./uploads/100MB.pdf", (err, data) => {
    res.setHeader("Content-Type", "application/pdf");
    res.end(data);
    data = null;
  });
});

router.get("/v1/read-file-stream", (req, res) => {
  const stream = fs.createReadStream("./uploads/100MB.pdf");
  stream.on("data", (chunk) => res.write(chunk));
  stream.on("end", () => res.end());
});

router.get("/v1/create-zip-stream", (req, res) => {
  fs.createReadStream("./uploads/60MB.pdf").pipe(
    zlib.createGzip().pipe(fs.createWriteStream("./uploads/60MB-zip.zip"))
  );
  // res.setHeader("Content-Type", "application/zip");
  res.json({message: "success"});
});

// const upload = multer({ dest: 'uploads/' });
router.post('/compress', upload.single('pdf'), (req, res) => {
  const inputFilePath = req.file.path;
  const outputFilePath = `compressed_${Date.now()}.pdf`;

  // Command to compress the PDF using Ghostscript
  const compressCommand = `gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/screen -dNOPAUSE -dQUIET -dBATCH -sOutputFile=${outputFilePath} ${inputFilePath}`;

  // Execute Ghostscript command to compress the PDF
  exec(compressCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error compressing PDF: ${error.message}`);
      return res.status(500).json({ message: 'Failed to compress PDF' });
    }

    // Send the compressed PDF file as a download
    res.download(outputFilePath, 'compressed.pdf', (err) => {
      // Clean up temporary files after sending
      fs.unlinkSync(inputFilePath);
      fs.unlinkSync(outputFilePath);

      if (err) {
        console.error('Error sending file:', err);
      }
    });
  });
});


module.exports = router;
