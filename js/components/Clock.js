function initClock(clockId, greetingId) {
    const clockElement = document.getElementById(clockId);
    const greetingElement = document.getElementById(greetingId);

    function updateTimeAndGreeting() {
        const now = new Date();

        // Update Clock
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
        if (clockElement) {
            clockElement.textContent = timeString;
        }

        // Update Greeting text for brutalist aesthetic
        const hour = now.getHours();
        let greeting = 'NIGHT';
        if (hour >= 5 && hour < 12) {
            greeting = 'MORNING';
        } else if (hour >= 12 && hour < 17) {
            greeting = 'AFTN';
        } else if (hour >= 17 && hour <= 23) {
            greeting = 'EVENING';
        }

        if (greetingElement) {
            // Using DOM methods instead of innerHTML for better LLD security
            greetingElement.textContent = '';
            greetingElement.appendChild(document.createTextNode('GOOD'));
            greetingElement.appendChild(document.createElement('br'));
            greetingElement.appendChild(document.createTextNode(greeting));
        }
    }

    updateTimeAndGreeting();
    setInterval(updateTimeAndGreeting, 1000);
}
