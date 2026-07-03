// Figlet-style block font for the big clock. Each glyph is 5 rows;
// '#' is a filled cell rendered as '██'.
const ASCII_GLYPHS = {
    '0': [' ### ', '#   #', '#   #', '#   #', ' ### '],
    '1': ['  #  ', ' ##  ', '  #  ', '  #  ', ' ### '],
    '2': [' ### ', '#   #', '  ## ', ' #   ', '#####'],
    '3': ['#### ', '    #', ' ### ', '    #', '#### '],
    '4': ['#   #', '#   #', '#####', '    #', '    #'],
    '5': ['#####', '#    ', '#### ', '    #', '#### '],
    '6': [' ### ', '#    ', '#### ', '#   #', ' ### '],
    '7': ['#####', '    #', '   # ', '  #  ', '  #  '],
    '8': [' ### ', '#   #', ' ### ', '#   #', ' ### '],
    '9': [' ### ', '#   #', ' ####', '    #', ' ### '],
    ':': ['   ', ' # ', '   ', ' # ', '   '],
};

// One color per row — the lolcat gradient.
const ASCII_ROW_COLORS = ['var(--red)', 'var(--peach)', 'var(--yellow)', 'var(--green)', 'var(--blue)'];

function renderAsciiWord(word, el) {
    el.textContent = '';
    let cols = 0;

    for (let row = 0; row < 5; row++) {
        const raw = word
            .split('')
            .map((ch) => (ASCII_GLYPHS[ch] || ASCII_GLYPHS['0'])[row])
            .join(' ');
        const line = raw
            .split('')
            .map((c) => (c === '#' ? '██' : '  '))
            .join('');
        cols = Math.max(cols, line.length);

        const span = document.createElement('span');
        span.style.color = ASCII_ROW_COLORS[row];
        span.textContent = line;
        el.appendChild(span);
    }

    el.dataset.cols = cols;
    fitAscii(el);
}

// Scale the clock so it always fits its window.
function fitAscii(el) {
    const cols = Number(el.dataset.cols);
    const parent = el.parentElement;
    if (!cols || !parent) return;

    const style = getComputedStyle(parent);
    const width = parent.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    // JetBrains Mono advance width ≈ 0.6em
    let size = Math.max(6, Math.min(34, width / cols / 0.6));

    // On desktop the tile height is viewport-driven, so also fit the 5 rows
    // vertically. On mobile the container height follows the font size, so
    // capping there would feed back on itself.
    if (window.matchMedia('(min-width: 981px)').matches) {
        const maxRowHeight = el.clientHeight / (5 * 1.05);
        if (maxRowHeight > 6) size = Math.min(size, maxRowHeight);
    }

    el.style.fontSize = `${size}px`;
}

function initClock(clockId, dateId, asciiId, greetLineId) {
    const clockElement = document.getElementById(clockId);
    const dateElement = document.getElementById(dateId);
    const asciiElement = document.getElementById(asciiId);
    const greetElement = document.getElementById(greetLineId);

    let currentTime = '';

    function update() {
        const now = new Date();

        if (clockElement) {
            clockElement.textContent = now.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
            });
        }

        if (dateElement) {
            dateElement.textContent = now
                .toLocaleDateString([], { weekday: 'short', day: '2-digit', month: 'short' })
                .toLowerCase();
        }

        // Big ASCII clock re-renders once a minute
        const hhmm = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
        if (asciiElement && hhmm !== currentTime) {
            currentTime = hhmm;
            renderAsciiWord(hhmm, asciiElement);
        }

        // Greeting drives the theme: Latte by day, Mocha by night
        const hour = now.getHours();
        let word = 'night';
        let theme = 'dark';
        if (hour >= 5 && hour < 12) {
            word = 'morning';
            theme = 'light';
        } else if (hour >= 12 && hour < 17) {
            word = 'afternoon';
            theme = 'light';
        } else if (hour >= 17 && hour <= 23) {
            word = 'evening';
            theme = 'dark';
        }

        document.documentElement.setAttribute('data-theme', theme);

        if (greetElement) {
            greetElement.textContent = `good ${word}, abhinav`;
        }
    }

    update();
    setInterval(update, 1000);

    if (asciiElement) {
        window.addEventListener('resize', () => fitAscii(asciiElement));
    }
}
