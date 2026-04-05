function calculateTimeForLongitude(longitude, baseTime = new Date()) {
    const hourOffset = longitude / 15;
    const utcTime = baseTime.getTime() + (baseTime.getTimezoneOffset() * 60000);
    const targetTime = new Date(utcTime + (3600000 * hourOffset));
    
    return targetTime.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
    });
}

function renderTable() {
    const container = document.getElementById('time-table');
    container.innerHTML = ''; // Clear the "Loading..." message

    for (let deg = 0; deg <= 350; deg += 10) {
        const time = calculateTimeForLongitude(deg);
        
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="degree">${deg}°</div>
            <div class="time">${time}</div>
        `;
        
        container.appendChild(card);
    }
}

// Render the UI immediately
renderTable();
