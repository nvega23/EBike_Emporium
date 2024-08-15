const express = require('express');
const router = express.Router();

const { isProduction } = require('../../config/keys');

// Cross-site Request Forgery, csrf
if (!isProduction) {
  router.get("/restore", (req, res) => {
    console.log('generating csrf token')
    const csrfToken = req.csrfToken();
    res.status(200).json({
      'CSRF-Token': csrfToken
    });
  });
}

module.exports = router;
