// Палитра цветов с названиями и соответствующими ANSI-кодами
const colorNames = {
    "#808080": { name: "Серый", fg: 30, bg: 40 },
    "#ff0000": { name: "Красный", fg: 31, bg: 41 },
    "#00ff00": { name: "Зеленый", fg: 32, bg: 42 },
    "#ffff00": { name: "Желтый", fg: 33, bg: 43 },
    "#0000ff": { name: "Синий", fg: 34, bg: 44 },
    "#ff00ff": { name: "Фиолетовый", fg: 35, bg: 45 },
    "#00ffff": { name: "Бирюзовый", fg: 36, bg: 46 },
    "#ffffff": { name: "Белый", fg: 37, bg: 47 },
    "#000000": { name: "Черный", fg: 30, bg: 40 },
    "#ff4500": { name: "Оранжево-красный", fg: 31, bg: 41 },
    "#1c2526": { name: "Темный серо-голубой", fg: 30, bg: 40 },
    "#4b0082": { name: "Индиго", fg: 35, bg: 45 },
    "#d3d3d3": { name: "Светло-серый", fg: 37, bg: 47 },
    "#f0f8ff": { name: "Алиса голубая", fg: 37, bg: 47 },
    "#40444b": { name: "Темно-серый", fg: 30, bg: 40 }
};

// Элементы DOM
const textEditor = document.getElementById("textEditor");
const randomFgColorBtn = document.getElementById("randomFgColorBtn");
const fgColorPicker = document.getElementById("fgColorPicker");
const fgColorName = document.getElementById("fgColorName");
const fgCustomColor = document.getElementById("fgCustomColor");
const applyFgColorBtn = document.getElementById("applyFgColorBtn");
const randomBgColorBtn = document.getElementById("randomBgColorBtn");
const bgColorPicker = document.getElementById("bgColorPicker");
const bgColorName = document.getElementById("bgColorName");
const bgCustomColor = document.getElementById("bgCustomColor");
const applyBgColorBtn = document.getElementById("applyBgColorBtn");
const copyBtn = document.getElementById("copyBtn");
const resetBtn = document.getElementById("resetBtn");
const discordCode = document.getElementById("discordCode");
const fgColorButtons = document.querySelectorAll(".fg-color");
const bgColorButtons = document.querySelectorAll(".bg-color");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const fgColorHelp = document.getElementById("fgColorHelp");
const bgColorHelp = document.getElementById("bgColorHelp");
const boldBtn = document.getElementById("boldBtn");
const underlineBtn = document.getElementById("underlineBtn");

// Переменные для хранения текущего цвета текста и фона
let currentFgColor = "#ffffff"; // Изначально белый
let currentBgColor = "#40444b"; // Изначально тёмно-серый

// Инициализация
fgColorPicker.value = "#ffffff"; // Синхронизация с палитрой
updateFgColorName();
bgColorPicker.value = "#40444b";
updateBgColorName();
updateDiscordCode();

// Инициализация темы при загрузке
if (localStorage.getItem("theme") === "light") {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
    themeToggleBtn.innerText = "☀️";
} else {
    document.body.classList.add("dark-theme");
    themeToggleBtn.innerText = "🌙";
}

// Обработчик переключения темы
themeToggleBtn.addEventListener("click", () => {
    if (document.body.classList.contains("dark-theme")) {
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
        themeToggleBtn.innerText = "☀️";
        localStorage.setItem("theme", "light");
    } else {
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");
        themeToggleBtn.innerText = "🌙";
        localStorage.setItem("theme", "dark");
    }
});

// Эффект движения фона при прокрутке
window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    document.body.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
});

// Обработка нажатия Enter для вставки <br>
document.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        document.execCommand('insertLineBreak');
        event.preventDefault();
    }
});

// Случайный цвет текста
randomFgColorBtn.addEventListener("click", () => {
    const colors = Object.keys(colorNames);
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    fgColorPicker.value = randomColor;
    updateFgColorName();
    currentFgColor = randomColor;
    applyStyle({ color: randomColor });
});

// Обновление названия цвета текста при выборе вручную
fgColorPicker.addEventListener("input", () => {
    updateFgColorName();
    currentFgColor = fgColorPicker.value;
    applyStyle({ color: currentFgColor });
});

// Пользовательский цвет текста
fgCustomColor.addEventListener("input", () => {
    const color = fgCustomColor.value;
    if (/^#[0-9A-F]{6}$/i.test(color)) {
        fgColorPicker.value = color;
        updateFgColorName();
        currentFgColor = color;
        applyStyle({ color: currentFgColor });
    }
});

// Применение цвета текста через кнопку
applyFgColorBtn.addEventListener("click", () => {
    currentFgColor = fgColorPicker.value;
    applyStyle({ color: fgColorPicker.value });
});

// Случайный цвет фона
randomBgColorBtn.addEventListener("click", () => {
    const colors = Object.keys(colorNames);
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    bgColorPicker.value = randomColor;
    updateBgColorName();
    currentBgColor = randomColor;
    applyStyle({ backgroundColor: randomColor });
});

// Обновление названия цвета фона при выборе вручную
bgColorPicker.addEventListener("input", () => {
    updateBgColorName();
    currentBgColor = bgColorPicker.value;
    applyStyle({ backgroundColor: currentBgColor });
});

// Пользовательский цвет фона
bgCustomColor.addEventListener("input", () => {
    const color = bgCustomColor.value;
    if (/^#[0-9A-F]{6}$/i.test(color)) {
        bgColorPicker.value = color;
        updateBgColorName();
        currentBgColor = color;
        applyStyle({ backgroundColor: currentBgColor });
    }
});

// Применение цвета текста (FG) через кнопки
fgColorButtons.forEach(button => {
    button.addEventListener("click", () => {
        const color = button.getAttribute("data-color");
        fgColorPicker.value = color;
        updateFgColorName();
        currentFgColor = color;
        applyStyle({ color });
    });
});

// Применение цвета фона (BG) через кнопки
bgColorButtons.forEach(button => {
    button.addEventListener("click", () => {
        const color = button.getAttribute("data-color");
        bgColorPicker.value = color;
        updateBgColorName();
        currentBgColor = color;
        applyStyle({ backgroundColor: color });
    });
});

// Применение жирного текста
boldBtn.addEventListener("click", () => {
    document.execCommand("bold", false, null);
    updateDiscordCode();
});

// Применение подчёркнутого текста
underlineBtn.addEventListener("click", () => {
    document.execCommand("underline", false, null);
    updateDiscordCode();
});

// Копирование текста для Discord
copyBtn.addEventListener("click", () => {
    discordCode.select();
    try {
        document.execCommand("copy");
        alert("Текст скопирован! Вставьте его в Discord.");
    } catch (err) {
        alert("Не удалось скопировать текст. Попробуйте скопировать его вручную из поля ниже.");
    }
});

// Сброс текста и цветов
resetBtn.addEventListener("click", () => {
    textEditor.innerHTML = "";
    currentFgColor = "#ffffff"; // Белый вместо красного
    fgColorPicker.value = "#ffffff";
    updateFgColorName();
    currentBgColor = "#40444b";
    bgColorPicker.value = "#40444b";
    updateBgColorName();
    updateDiscordCode();
});

// Обновление кода для Discord при изменении текста
textEditor.addEventListener("input", (event) => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        if (range.collapsed) {
            const parentNode = range.startContainer.parentNode;
            if (parentNode === textEditor || (parentNode.tagName === "SPAN" && range.startContainer.nodeType === Node.TEXT_NODE)) {
                if (currentFgColor || currentBgColor) {
                    const span = document.createElement("span");
                    if (currentFgColor) span.style.color = currentFgColor;
                    if (currentBgColor) span.style.backgroundColor = currentBgColor;
                    span.appendChild(document.createTextNode("\u200B"));
                    range.insertNode(span);
                    const newRange = document.createRange();
                    newRange.setStart(span.firstChild, 1);
                    newRange.collapse(true);
                    selection.removeAllRanges();
                    selection.addRange(newRange);
                }
            }
        }
    }
    updateDiscordCode();
});

// Горячие клавиши
document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && !e.shiftKey && e.key >= "1" && e.key <= "9") {
        e.preventDefault();
        const index = parseInt(e.key) - 1;
        const button = fgColorButtons[index];
        if (button) button.click();
    }
    if (e.ctrlKey && e.shiftKey && e.key >= "1" && e.key <= "7") {
        e.preventDefault();
        const index = parseInt(e.key) - 1;
        const button = bgColorButtons[index];
        if (button) button.click();
    }
    if (e.ctrlKey && e.key === "b") { // Ctrl+B для жирного
        e.preventDefault();
        document.execCommand("bold", false, null);
        updateDiscordCode();
    }
    if (e.ctrlKey && e.key === "u") { // Ctrl+U для подчёркнутого
        e.preventDefault();
        document.execCommand("underline", false, null);
        updateDiscordCode();
    }
});

// Обработчики для кнопок "?"
fgColorHelp.addEventListener("click", () => {
    window.open("https://colorscheme.ru/color-names.html", "_blank");
});

bgColorHelp.addEventListener("click", () => {
    window.open("https://colorscheme.ru/color-names.html", "_blank");
});

// Обновление названия цвета текста
function updateFgColorName() {
    const selectedColor = fgColorPicker.value.toLowerCase();
    fgColorName.textContent = colorNames[selectedColor]?.name || "Пользовательский";
}

// Обновление названия цвета фона
function updateBgColorName() {
    const selectedColor = bgColorPicker.value.toLowerCase();
    bgColorName.textContent = colorNames[selectedColor]?.name || "Пользовательский";
}

// Применение стилей
function applyStyle(styles) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    
    if (range.collapsed) {
        const span = document.createElement("span");
        Object.assign(span.style, styles);
        span.appendChild(document.createTextNode("\u200B"));
        range.insertNode(span);
        const newRange = document.createRange();
        newRange.setStart(span.firstChild, 1);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
    } else {
        const fragment = range.extractContents();
        const newSpan = document.createElement("span");
        Object.assign(newSpan.style, styles);
        newSpan.appendChild(fragment);
        range.insertNode(newSpan);
        const newRange = document.createRange();
        newRange.selectNodeContents(newSpan);
        selection.removeAllRanges();
        selection.addRange(newRange);
    }
    updateDiscordCode();
}

// Генерация кода для Discord
function updateDiscordCode() {
    if (!textEditor.innerText.trim()) {
        discordCode.value = "```ansi\nВведите текст выше\n```";
        return;
    }

    let formattedText = "```ansi\n";
    const esc = "\u001b";
    const defaultState = { fg: 2, bg: 2, bold: false, underline: false };
    const states = [defaultState];

    function nodesToANSI(nodes) {
        let text = "";
        for (const node of nodes) {
            if (node.nodeType === Node.TEXT_NODE) {
                const content = node.textContent.replace(/\u200B/g, "");
                if (content) {
                    const currentState = states[states.length - 1];
                    let ansiCode = "";
                    if (currentState.fg !== 2 || currentState.bg !== 2 || currentState.bold || currentState.underline) {
                        const codes = [];
                        if (currentState.fg !== 2) codes.push(currentState.fg);
                        if (currentState.bg !== 2) codes.push(currentState.bg);
                        if (currentState.bold) codes.push(1);
                        if (currentState.underline) codes.push(4);
                        ansiCode = `${esc}[${codes.join(";")}m`;
                    }
                    text += `${ansiCode}${content}${esc}[0m`;
                }
                continue;
            }
            if (node.nodeName === "BR") {
                text += "\n";
                continue;
            }
            if (node.nodeName === "DIV" && node !== textEditor) {
                for (const child of node.childNodes) {
                    text += nodesToANSI([child]);
                    text += "\n";
                }
                continue;
            }

            const newState = { ...states[states.length - 1] };
            const style = node.style;
            const computedStyle = window.getComputedStyle(node);

            if (style.color) {
                const hex = rgbToHex(style.color).toLowerCase();
                if (colorNames[hex]) {
                    newState.fg = colorNames[hex].fg;
                }
            }

            if (style.backgroundColor && style.backgroundColor !== "transparent") {
                const hex = rgbToHex(style.backgroundColor).toLowerCase();
                if (colorNames[hex]) {
                    newState.bg = colorNames[hex].bg;
                }
            }

            if (node.tagName === "B" || computedStyle.fontWeight === "bold" || computedStyle.fontWeight >= 700) {
                newState.bold = true;
            }

            if (node.tagName === "U" || computedStyle.textDecorationLine.includes("underline")) {
                newState.underline = true;
            }

            states.push(newState);
            let childText = nodesToANSI(node.childNodes);
            if (childText) {
                text += childText;
            }
            states.pop();

            const prevState = states[states.length - 1];
            if (prevState.fg !== 2 || prevState.bg !== 2 || prevState.bold || prevState.underline) {
                const codes = [];
                if (prevState.fg !== 2) codes.push(prevState.fg);
                if (prevState.bg !== 2) codes.push(prevState.bg);
                if (prevState.bold) codes.push(1);
                if (prevState.underline) codes.push(4);
                text += `${esc}[${codes.join(";")}m`;
            }
        }
        return text;
    }

    formattedText += nodesToANSI(textEditor.childNodes);
    formattedText += "\n```";
    discordCode.value = formattedText;
}

// Преобразование RGB в HEX
function rgbToHex(color) {
    if (color.startsWith("#")) return color;
    const tempElem = document.createElement("div");
    tempElem.style.color = color;
    document.body.appendChild(tempElem);
    const style = window.getComputedStyle(tempElem).color;
    document.body.removeChild(tempElem);
    const rgbMatch = style.match(/\d+/g);
    if (!rgbMatch) return "#000000";
    const [r, g, b] = rgbMatch.map(Number);
    return "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");
}