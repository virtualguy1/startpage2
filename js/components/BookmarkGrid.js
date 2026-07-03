// Each category window gets its own accent, like per-workspace colors.
const CATEGORY_ACCENTS = ['blue', 'peach', 'green', 'mauve'];

function renderBookmarks(containerId, bookmarks) {
    const container = document.getElementById(containerId);
    if (!container || typeof bookmarks === 'undefined') return;

    Object.entries(bookmarks).forEach(([category, linksObj], i) => {
        const win = document.createElement('section');
        win.className = 'window win-links stagger-in';
        win.id = `ws-${i + 1}`;
        win.style.setProperty('--accent', `var(--${CATEGORY_ACCENTS[i % CATEGORY_ACCENTS.length]})`);
        win.style.animationDelay = `${0.12 + i * 0.07}s`;

        const titlebar = document.createElement('div');
        titlebar.className = 'titlebar';

        const dots = document.createElement('span');
        dots.className = 'dots';
        dots.setAttribute('aria-hidden', 'true');
        for (let d = 0; d < 3; d++) dots.appendChild(document.createElement('i'));

        const title = document.createElement('span');
        title.className = 'win-title';
        title.textContent = `~/${category.toLowerCase()}`;

        const hint = document.createElement('span');
        hint.className = 'win-hint';
        hint.textContent = `[${i + 1}]`;

        titlebar.append(dots, title, hint);

        const body = document.createElement('div');
        body.className = 'win-body';

        for (const [name, data] of Object.entries(linksObj)) {
            const a = document.createElement('a');
            a.href = data.url;
            a.className = 'link-row';

            const iconTile = document.createElement('span');
            iconTile.className = 'link-icon';
            const icon = document.createElement('i');
            icon.className = data.logo;
            icon.setAttribute('aria-hidden', 'true');
            iconTile.appendChild(icon);

            const text = document.createElement('span');
            text.className = 'link-text';

            const nameSpan = document.createElement('span');
            nameSpan.className = 'link-name';
            nameSpan.textContent = name;

            const urlSpan = document.createElement('span');
            urlSpan.className = 'link-url';
            urlSpan.textContent = data.displayUrl;

            text.append(nameSpan, urlSpan);
            a.append(iconTile, text);
            body.appendChild(a);
        }

        win.append(titlebar, body);
        container.appendChild(win);
    });
}
