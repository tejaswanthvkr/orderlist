const pool = require('../models/orders');

const createOrder = (req, res) => {
    const { ordername, orderitem, quantity } = req.body;
    pool.query(
        'INSERT INTO orders (ordername, orderitem, quantity) VALUES (?, ?, ?)',
        [ordername, orderitem, quantity],
        (err, result) => {
            if (err) {
                console.error('Error creating order:', err);
                res.status(500).json({ error: 'Error creating order' });
                return;
            }
            res.status(201).json({ id: result.insertId, ordername, orderitem, quantity });
        }
    );
};

const getAllOrders = (req, res) => {
    pool.query('SELECT id, ordername, orderitem, quantity FROM orders', (err, results) => {
        if (err) {
            console.error('Error fetching orders:', err);
            res.status(500).json({ error: 'Error fetching orders' });
            return;
        }
        res.json(results);
    });
};

const getOrderById = (req, res) => {
    const orderId = parseInt(req.params.id);
    pool.query(
        'SELECT id, ordername, orderitem, quantity FROM orders WHERE id = ?',
        [orderId],
        (err, results) => {
            if (err) {
                console.error('Error fetching order by ID:', err);
                res.status(500).json({ error: 'Error fetching order by ID' });
                return;
            }
            if (results.length === 0) {
                res.status(404).send('Order not found');
            } else {
                res.json(results[0]);
            }
        }
    );
};

const updateOrder = (req, res) => {
    const orderId = parseInt(req.params.id);
    const { ordername, orderitem, quantity } = req.body;
    pool.query(
        'UPDATE orders SET ordername = ?, orderitem = ?, quantity = ? WHERE id = ?',
        [ordername, orderitem, quantity, orderId],
        (err, result) => {
            if (err) {
                console.error('Error updating order:', err);
                res.status(500).json({ error: 'Error updating order' });
                return;
            }
            if (result.affectedRows === 0) {
                res.status(404).send('Order not found');
            } else {
                res.json({ id: orderId, ordername, orderitem, quantity });
            }
        }
    );
};

const deleteOrder = (req, res) => {
    const orderId = parseInt(req.params.id);
    pool.query('DELETE FROM orders WHERE id = ?', [orderId], (err, result) => {
        if (err) {
            console.error('Error deleting order:', err);
            res.status(500).json({ error: 'Error deleting order' });
            return;
        }
        if (result.affectedRows === 0) {
            res.status(404).send('Order not found');
        } else {
            res.sendStatus(204);
        }
    });
};

module.exports = {
    deleteOrder,
    updateOrder,
    getAllOrders,
    getOrderById,
    createOrder
};
