const express = require('express')
const multer = require('multer')
const router = express.Router()
// to upload image on server we use multer
// this code is same can find via search
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name) // file is name key in postShare
  },
})
const upload = multer({ storage: storage })
// middleware
router.post(
  '/',
  upload.single('file'), (req, res) => {
    try {
      return res.status(200).json( 'File uploaded Successfully!!',
)
    } catch (err) {
      console.log(err)
    }
  })

module.exports = router
