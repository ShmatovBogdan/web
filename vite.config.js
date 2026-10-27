import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

const __dirname = dirname(fileURLToPath(import.meta.url));

const pages = {
  '/index.html': {
    pageTitle: 'Web-Програмування - Головна',
    pageDescription: 'Навчальний вебпроєкт студента',
    labName: 'Мій навчальний вебпроєкт',
    currentPage: 'home', isHome: true,
    contentPartial: 'index-content',
    asideTitle: 'Корисні посилання',
    asideLinks: [
      { text: 'MDN Web Docs - HTML', url: 'https://developer.mozilla.org/uk/docs/Web/HTML' },
      { text: 'HTML Standard', url: 'https://html.spec.whatwg.org/' }
    ]
  },
  '/about.html': {
    pageTitle: 'Web-Програмування -  Про нас',
    pageDescription: 'Інформація про нашу команду',
    labName: 'Мій навчальний вебпроєкт',
    currentPage: 'about', isAbout: true,
    contentPartial: 'about-content',
    asideTitle: 'Корисні посилання',
    asideLinks: [
      { text: 'MDN Web Docs - HTML', url: 'https://developer.mozilla.org/uk/docs/Web/HTML' },
      { text: 'HTML Standard', url: 'https://html.spec.whatwg.org/' }
    ]
  },
  '/contacts.html': {
    pageTitle: 'Web-Програмування -  Контакти',
    pageDescription: 'Контактна форма навчального вебпроєкту',
    labName: 'Мій навчальний вебпроєкт',
    currentPage: 'contacts', isContacts: true,
    contentPartial: 'contacts-content',
    asideTitle: 'Соціальні мережі',
    asideLinks: [
      { text: 'GitHub', url: 'https://github.com/' },
      { text: 'LinkedIn', url: 'https://www.linkedin.com/' }
    ]
  }
};

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
      context(pagePath) {
        return {
          siteName: 'Навчальний вебпроєкт',
          labName: 'Мій навчальний вебпроєкт',
          studentGroup: '6.1214-пі-1',
          studentEmail: 'bogdanshmatow@gmail.com',
          ...(pages[pagePath] ?? pages['/index.html'])
        };
      }
    })
  ],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        contacts: resolve(__dirname, 'contacts.html')
      }
    }
  }
});
