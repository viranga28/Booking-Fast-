document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchResultsDiv = document.getElementById('search-results');

    searchForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const origin = document.getElementById('origin').value.trim();
        const destination = document.getElementById('destination').value.trim();
        const departureDate = document.getElementById('departure-date').value;

        try {
            const response = await fetch(`/api/flights?origin=${origin}&destination=${destination}&date=${departureDate}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const flights = await response.json();

            searchResultsDiv.innerHTML = '';
            if (flights.length === 0) {
                searchResultsDiv.textContent = 'No flights found.';
            } else {
                flights.forEach(flight => {
                    const flightDiv = document.createElement('div');
                    flightDiv.className = 'flight-result';
                    flightDiv.textContent = `${flight.airline}: ${flight.origin} to ${flight.destination} on ${flight.date} - $${flight.price}`;
                    searchResultsDiv.appendChild(flightDiv);
                });
            }
        } catch (error) {
            console.error("Error fetching flights:", error);
            searchResultsDiv.textContent = 'An error occurred. Please try again.';
        }
    });
});
