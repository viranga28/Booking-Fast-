const express = require('express');
const app = express();
const port = 3001;

const flightsData = [
    { id: 1, airline: "United", origin: "JFK", destination: "LAX", date: "2024-04-20", price: 300 },
    { id: 2, airline: "Delta", origin: "SFO", destination: "JFK", date: "2024-04-21", price: 250 },
    // Add more flight data as needed
];

app.get('/api/flights', (req, res) => {
    let results = [...flightsData];

    if (req.query.origin) {
        results = results.filter(flight => flight.origin.toLowerCase().includes(req.query.origin.toLowerCase()));
    }
    if (req.query.destination) {
        results = results.filter(flight => flight.destination.toLowerCase().includes(req.query.destination.toLowerCase()));
    }
    if (req.query.date) {
        results = results.filter(flight => flight.date === req.query.date);
    }

    res.json(results);
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
