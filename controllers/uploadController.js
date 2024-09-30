// controllers/uploadController.js

const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const storage = require("../config/firebase");
const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const fs = require("fs");

// Upload file to local storage
exports.uploadLocal = (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .send("No files were uploaded. Please choose a file to upload!");
    }
    res
      .status(200)
      .send({ message: "File uploaded to local storage!", file: req.file });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
};

// Upload file to Firebase
exports.uploadFirebase = async (req, res) => {
  try {
    const file = fs.readFile("./uploads/100MB.pdf");
    // console.log(file);

    if (!file) {
      return res
        .status(400)
        .send("No files were uploaded. Please choose a file to upload!");
    }

    const fileRef = ref(storage, file.originalname);
    const uploadResult = await uploadBytes(fileRef, file.buffer);
    const url = await getDownloadURL(uploadResult.ref);
    res.status(200).send({ message: "File uploaded to Firebase!", url });
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
};
// Upload file to Cloudflare
exports.uploadCloudflare = async (req, res) => {
  const r2 = new S3Client({
    region: "auto",
    endpoint:
      "https://e3946219b1798670a9fee28610635a78.r2.cloudflarestorage.com",
    credentials: {
      accessKeyId: "cb7ce2c57e72b161868e844eaabb27cc",
      secretAccessKey:
        "ccc37df3492011118cf58cfc0c7a76a6b943b96502101b291b952d1c17ee33be",
    },
  });

  try {
    const file = fs.readFile("./uploads/100MB.pdf");

    const buffer = file.buffer;

    const objectKey = `file-upload-test/${file.originalname}`;

    const putObjectCommand = new PutObjectCommand({
      Bucket: "grade-calculator",
      Key: objectKey,
      Body: buffer,
      ContentType: file.mimetype,
    });
    const response = await r2.send(putObjectCommand);

    if (response) {
      const imageUrl = `https://cdn.onlinegradecalculator.io/${objectKey}`;
      res
        .status(200)
        .send({ message: "File uploaded to Cloudflare!", imageUrl });
    } else {
      res.status(500).send({ message: "Failed to upload file to Cloudflare" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error", error });
  }
};
