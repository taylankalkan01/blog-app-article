import multer, { FileFilterCallback } from 'multer';
import { Request, Response, NextFunction } from 'express';

// Set the destination and filename for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const date = new Date().toISOString().slice(0, 10);
    cb(null, `${date}-${file.originalname}`);
  },
});

// Define a function to filter the files to be uploaded
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  // Check if the file is an image
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed.'));
  }
};

// Set up multer middleware with the storage and filter functions
const upload = multer({ storage, fileFilter });

// Middleware function for uploading a single image
const uploadImage = (req: Request, res: Response<any, Record<string, any>>, next: NextFunction) => {
  upload.single('image')(req, res, (err: any) => {
    if (err instanceof multer.MulterError) {
      // A multer error
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: err.message });
    }
    next();
  });
};

export { uploadImage };
