const express = require('express');
const New = require('../model/mongoose');

const {getD,postD,deleteD, putD,getDo} = require('../controllers/controller');
const router = express.Router();

router.route('/').get(getD).post(postD);
router.route('/:id').delete(deleteD).put(putD).get(getDo);

module.exports = router;