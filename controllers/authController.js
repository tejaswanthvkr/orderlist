const pool = require('../models/orders');


const jwt = require('jsonwebtoken');

const signup = (req, res) => {
    const { username, password } = req.body;


    pool.query('SELECT * FROM login WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error('Error checking username:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }


        if (results.length > 0) {
            return res.status(400).json({ error: 'Username already exists' });
        }


        pool.query('INSERT INTO login (username, password) VALUES (?, ?)', [username, password], (err, result) => {
            if (err) {
                console.error('Error creating user:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }


            const userId = result.insertId;
            const token = jwt.sign({ userId, username }, 'teja');
            res.json({ token });
        });
    });
};

const login = (req, res) => {
    const { username, password } = req.body;


    pool.query('SELECT * FROM login WHERE username = ? AND password = ?', [username, password], (err, results) => {
        if (err) {
            console.error('Error checking user:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }


        if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }


        const user = results[0];
        const token = jwt.sign({ userId: user.id, username: user.username }, 'teja', { expiresIn: '1h' });
        res.json({ token });
    });
};

module.exports = {
    signup,
    login

}