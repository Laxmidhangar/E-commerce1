const express = require('express');
const router = express.Router();
const { createOrder, getUserOrders } = require('../controllers/orderController');

router.post('/', createOrder);
router.get('/:userId', getUserOrders);

module.exports = router;