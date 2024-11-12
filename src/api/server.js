require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT =  5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

let db;

(async function initializeDB() {
    try {
        db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        });
        console.log("Connected to MySQL Database");
    } catch (err) {
        console.error("Database connection failed:", err);
        process.exit(1);
    }
})();


const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: "No token provided" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(500).json({ message: "Failed to authenticate token" });
        req.userId = decoded.id;
        next();
    });
};


app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const query = `SELECT * FROM Admin WHERE username = ?`;

    try {
        const [results] = await db.query(query, [username]);
        if (results.length === 0) return res.status(400).json({ message: "User not found" });

        const admin = results[0];
        if (password !== admin.password) {
            return res.status(400).json({ message: "Invalid Password" });
        }

        const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: process.env.NEXT_PUBLIC_TOKEN_COOKIE_MAX_AGE_IN_DAYS });
        res.json({ token });
    } catch (err) {
        console.error("Error logging in:", err);
        res.status(500).json({ message: "Database error" });
    }
});

app.get('/districts', async (req, res) => {
    try {
        const [districts] = await db.query("SELECT * FROM districts");
        res.json(districts);
    } catch (error) {
        console.error("Error fetching districts:", error);
        res.status(500).json({ message: "Failed to fetch districts" });
    }
});


app.post('/locations', async (req, res) => {
    const { location, history, description, map, tips, image, districts} = req.body;
    const sql = "INSERT INTO location (location, history, description, map, tips, image, districts ) VALUES (?, ?, ?, ?, ?, ?, ?)";

    try {
        await db.query(sql, [location, history, description, map, tips, image, districts]);
        res.status(200).json({ message: "Location added successfully!" });
    } catch (err) {
        console.error("Error inserting location:", err);
        res.status(500).json({ message: "Database error" });
    }
});

app.get('/location', async (req, res) => {
    try {
        const [location] = await db.query("SELECT * FROM location");
        res.json(location);
    } catch (error) {
        console.error("Error fetching locations:", error);
        res.status(500).json({ message: "Failed to fetch locations" });
    }
});

app.get('/loadLocation/:id', async (req, res) => {
    const { id } = req.params; 
    const query = `SELECT * FROM location WHERE id = ?`;
    
    try {
        const [results] = await db.query(query, [id]); 
        res.json(results);
    } catch (error) {
        console.error("Error fetching details:", error);
        res.status(500).json({ message: "Failed to fetch details" });
    }
});

app.get('/loadByDistrictsLocation/:districts/:locations', async (req, res) => {
    const { districts, locations } = req.params;
    const query = `SELECT * FROM location WHERE districts = ? AND location NOT LIKE ?`;

    try {
        const [data] = await db.query(query, [districts, `%${locations}%`]);
        res.json(data);
    } catch (error) {
        console.error("Error fetching details:", error);
        res.status(500).json({ message: "Failed to fetch details" });
    }
});


app.get('/admin', verifyToken, (req, res) => {
    res.json({ message: "Welcome to the Admin Panel" });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
