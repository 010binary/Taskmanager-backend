import { Request, Response, NextFunction } from "express";
import fs from "fs";
import multer from "multer";
import path from "path";

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../../uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(new Error("Only PNG and JPG files are allowed"));
  }
};

const upload = multer({ storage, fileFilter });

export const formdataMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (req.file) {
      const fileUrl = `/uploads/${req.file.filename}`;
      req.body.fileUrl = fileUrl;
    }
    next();
  });
};
