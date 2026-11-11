const KEY = 'theme';

function systemPrefersDark() 
{
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function applyTheme(isDark) 
{
    document.documentElement.classList.toggle('dark', isDark);
}

function initThemeToggle() 
{
    const savedTheme = localStorage.getItem(KEY);

    const isDark = savedTheme !== null
        ? savedTheme === 'dark'
        : systemPrefersDark();

    applyTheme(isDark);

    const toggleButton = document.querySelector('#theme-toggle');

    if (!toggleButton) return;

    toggleButton.addEventListener('click', () => {
        const isCurrentlyDark = document.documentElement.classList.contains('dark');
        const newTheme = isCurrentlyDark ? 'light' : 'dark';

        localStorage.setItem(KEY, newTheme);
        applyTheme(newTheme === 'dark');
    });
}

export { initThemeToggle };