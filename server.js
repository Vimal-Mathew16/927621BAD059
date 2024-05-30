const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Authentication token obtained during registration
const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3MDQ3Mzk4LCJpYXQiOjE3MTcwNDcwOTgsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImExYjI2YWNkLTA3ZTQtNGZlNS1hYjI4LTdhNTVlYjcwMTcyNiIsInN1YiI6IjkyNzYyMWJhZDA1OUBta2NlLmFjLmluIn0sImNvbXBhbnlOYW1lIjoiTUtDRWthcnVyIiwiY2xpZW50SUQiOiJhMWIyNmFjZC0wN2U0LTRmZTUtYWIyOC03YTU1ZWI3MDE3MjYiLCJjbGllbnRTZWNyZXQiOiJ0a0dqbWlyb3F4YmZKZXRzIiwib3duZXJOYW1lIjoiVmltYWwgTWF0aGV3IEIiLCJvd25lckVtYWlsIjoiOTI3NjIxYmFkMDU5QG1rY2UuYWMuaW4iLCJyb2xsTm8iOiI5Mjc2MjFCQUQwNTkifQ.pTpZYvk8-hX8dUFD1ZLxuQM-I1Xnmiluy-LNzUm2Llk";

// Endpoint to fetch top products
app.get('/categories/:categoryName/products', async (req, res) => {
    const { categoryName } = req.params;
    const { top, minPrice, maxPrice } = req.query;

    try {
        const response = await axios.get(`http://20.244.56.144/test/companies/MKCEkarur/categories/${categoryName}/products`, {
            params: { top, minPrice, maxPrice },
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Failed to fetch top products:', error.message);
        res.status(500).json({ error: 'Failed to fetch top products' });
    }
});

// Endpoint to fetch product details
app.get('/categories/:categoryName/products/:productId', async (req, res) => {
    const { categoryName, productId } = req.params;

    try {
        const response = await axios.get(`http://20.244.56.144/test/companies/MKCEkarur/categories/${categoryName}/products/${productId}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Failed to fetch product details:', error.message);
        res.status(500).json({ error: 'Failed to fetch product details' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
