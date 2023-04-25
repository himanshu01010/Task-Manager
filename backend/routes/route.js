const express = require('express');
const New = require('../model/mongoose');

const {getD,postD,deleteD, putD,getDo} = require('../controllers/controller');
const router = express.Router();

// router.get('/',getD);
// router.post('/',postD);
// router.delete('/:id',deleteD);
// router.put('/:id',putD);
// router.get('/:id',getDo);
router.route('/').get(getD).post(postD);
router.route('/:id').delete(deleteD).put(putD).get(getDo);
// router.route('/:id').get(getDo);

module.exports = router;