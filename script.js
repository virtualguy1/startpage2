function updateTimeAndGreeting() {
    const clockElement = document.getElementById('clock');
    const greetingElement = document.getElementById('greeting');
    const now = new Date();

    // Update Clock
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    if (clockElement) clockElement.textContent = timeString;

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

    if (greetingElement) greetingElement.innerHTML = `GOOD<br>${greeting}`;
}

updateTimeAndGreeting();
setInterval(updateTimeAndGreeting, 1000);

function renderBookmarks() {
    const container = document.getElementById('categories-grid');
    if (!container || typeof bookmarks === 'undefined') return;

    let animationDelay = 0.1;

    for (const [category, linksObj] of Object.entries(bookmarks)) {
        // create wrapper for grid row spacing 
        const colDiv = document.createElement('div');
        colDiv.className = 'col-6 stagger-in';
        colDiv.style.animationDelay = `${animationDelay}s`;
        colDiv.style.marginBottom = '2.5rem';

        // Root card element (re-using Oat UI class conceptually)
        const article = document.createElement('article');
        article.className = 'card';

        // Custom Header element
        const header = document.createElement('header');
        const h3 = document.createElement('h3');
        h3.textContent = category;
        header.appendChild(h3);
        article.appendChild(header);

        // Container for link chips
        const chipContainer = document.createElement('div');
        chipContainer.className = 'chip-container';

        // Loop over the Object inside the category (iterating object keys)
        for (const [name, data] of Object.entries(linksObj)) {
            const a = document.createElement('a');
            a.href = data.url;
            a.className = 'link-chip'; // custom chip class overriding basic Oat UI ones

            // Build the string explicitly displaying the icon and textual representation
            a.innerHTML = `<i class="${data.logo}"></i> <span>${data.displayUrl}</span>`;

            chipContainer.appendChild(a);
        }

        article.appendChild(chipContainer);
        colDiv.appendChild(article);
        container.appendChild(colDiv);

        animationDelay += 0.15;
    }
}

renderBookmarks();
