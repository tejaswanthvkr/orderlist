const express = require('express');
const verifyToken = require('../middleware/verifyToken');
const orderController = require('../controllers/orderController');

const router = express.Router();


router.post('/', verifyToken, orderController.createOrder);
router.get('/', verifyToken, orderController.getAllOrders);
router.get('/:id', verifyToken, orderController.getOrderById);
router.put('/:id', verifyToken, orderController.updateOrder);
router.delete('/:id', verifyToken, orderController.deleteOrder);

module.exports = router;
