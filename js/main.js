document.addEventListener('DOMContentLoaded', () => {
    initClock('bar-clock', 'bar-date', 'ascii-greeting', 'greet-line');
    renderBookmarks('categories-grid', bookmarks);
    initAnilist('anilist-container');

    const search = document.getElementById('search');

    // WM-style keyboard navigation
    document.addEventListener('keydown', (e) => {
        const active = document.activeElement;
        const typing = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA');

        if (e.key === 'Escape' && typing) {
            active.blur();
            return;
        }
        if (typing || e.metaKey || e.ctrlKey || e.altKey) return;

        if (e.key === '/') {
            e.preventDefault();
            if (search) {
                search.focus();
                search.select();
            }
        } else if (/^[1-4]$/.test(e.key)) {
            focusWorkspace(e.key);
        }
    });

    document.querySelectorAll('.ws').forEach((btn) => {
        btn.addEventListener('click', () => focusWorkspace(btn.dataset.ws));
    });
});

function focusWorkspace(n) {
    const win = document.getElementById(`ws-${n}`);
    if (!win) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    win.scrollIntoView({ block: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
    const firstLink = win.querySelector('a');
    if (firstLink) firstLink.focus({ preventScroll: true });
}
