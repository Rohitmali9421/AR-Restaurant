const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

function uploadMiddleware(req, res, next) {
  
  const uploadMultiple = upload.fields([
    { name: "image", maxCount: 1 }, // Normal image
    { name: "image3d", maxCount: 1 }, // 3D image
  ]);

  uploadMultiple(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    if (!req.files || !req.files.image || !req.files.image3d) {
      return res
        .status(400)
        .json({ error: "Both image and image3d are required" });
    }

    // Attach file paths to request body for MongoDB insertion
    req.body.imagePath = req.files.image[0].path;
    req.body.image3dPath = req.files.image3d[0].path;

    next();
  });
}


module.exports = uploadMiddleware;
