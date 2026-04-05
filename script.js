let currentFormat = '0-360'; // '0-360' or '180-180'

function calculateTimeForLongitude(longitude, baseTime = new Date()) {
    let normalizedLong = longitude;
    
    // Logic for -180 to 180 format
    if (currentFormat === '180-180') {
        if (longitude > 180) normalizedLong = longitude - 360;
    }

    const hourOffset = normalizedLong / 15;
    const utcTime = baseTime.getTime() + (baseTime.getTimezoneOffset() * 60000);
    const targetTime = new Date(utcTime + (3600000 * hourOffset));
    
    const timeString = targetTime.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
    });

    // Add E/W notation for -180 to 180
    let label = `${longitude}°`;
    if (currentFormat === '180-180') {
        if (normalizedLong > 0) label = `${normalizedLong}°E`;
        else if (normalizedLong < 0) label = `${Math.abs(normalizedLong)}°W`;
        else label = `0°`;
    }

    return { time: timeString, label, offset: (hourOffset >= 0 ? '+' : '') + hourOffset.toFixed(1) };
}

function renderTable() {
    const container = document.getElementById('time-table');
    container.innerHTML = '';

    for (let deg = 0; deg <= 350; deg += 10) {
        const { time, label, offset } = calculateTimeForLongitude(deg);
        
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="degree">${label}</div>
            <div class="time">${time}</div>
            <div class="offset">UTC ${offset}</div>
        `;
        
        container.appendChild(card);
    }
}

function setFormat(format) {
    currentFormat = format;
    document.querySelectorAll('.btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.format === format);
    });
    renderTable();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', () => setFormat(btn.dataset.format));
    });
    renderTable();
});
