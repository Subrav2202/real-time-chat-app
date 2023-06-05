const multer = require('multer');

module.exports = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});
