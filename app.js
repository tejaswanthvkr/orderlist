const express = require('express');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orderRoutes');

const authRoutes=require('./routes/authRoutes')
const app = express();
const PORT = 3000;


app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/orders', orderRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
