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

function testLongitudeLogic() {
    console.log("--- Longitude Time Table (Logic Test) ---");
    for (let deg = 0; deg <= 350; deg += 10) {
        const time = calculateTimeForLongitude(deg);
        console.log(`${deg}°: ${time}`);
    }
}

testLongitudeLogic();
