const ok = (res, message, extra = {}) =>
  res.json({ success: true, message, ...extra });

const fail = (res, status, message) =>
  res.status(status).json({ success: false, message });

exports.uploadSingle = async (req, res) => {
  try {
    if (!req.file) return fail(res, 400, 'No file uploaded');

    return ok(res, 'File uploaded successfully', {
      url: `/uploads/${req.file.filename}`,
      filename: req.file.filename
    });
  } catch (err) {
    return fail(res, 500, err.message || 'Upload error');
  }
};

exports.uploadMultiple = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) return fail(res, 400, 'No files uploaded');

    const files = req.files.map(f => ({
      url: `/uploads/${f.filename}`,
      filename: f.filename
    }));

    return ok(res, 'Files uploaded successfully', { files });
  } catch (err) {
    return fail(res, 500, err.message || 'Upload error');
  }
};

// middleware lỗi multer (file too large, wrong type...)
exports.handleUploadError = (err, req, res, next) => {
  if (!err) return next();

  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ success: false, message: 'File size exceeds 5MB' });
  }
  return res.status(400).json({ success: false, message: err.message || 'Upload failed' });
};

