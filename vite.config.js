import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';

const siteConfig  = {
  mainPageName: 'Web-Програмування - Головна',
  siteName: 'Навчальний вебпроект',
  labName: 'Мій навчальний вебпроєкт',
  studentGroup: '6.1214-пі-1',
  studentEmail: 'bogdanshmatow@gmail.com'
};

const htmlResources = [
  { text: 'MDN Web Docs - HTML', url: 'https://developer.mozilla.org/uk/docs/Web/HTML' },
  { text: 'HTML Standard', url: 'https://html.spec.whatwg.org/' }
];

const rootDir = import.meta.dirname;

const htmlPages = {
  index: resolve(rootDir, 'index.html'),
  about: resolve(rootDir, 'about.html'),
  contact: resolve(rootDir, 'contacts.html'),
};

const pages = {
  '/index.html': {
    pageTitle: siteConfig.mainPageName,
    pageDescription: 'Навчальний вебпроєкт студента',
    currentPage: 'home', isHome: true,
    contentPartial: 'index-content',
    asideTitle: 'Корисні посилання',
    asideLinks: htmlResources
  },
  '/about.html': {
    pageTitle: 'Web-Програмування -  Про нас',
    pageDescription: 'Інформація про нашу команду',
    currentPage: 'about', isAbout: true,
    contentPartial: 'about-content',
    asideTitle: 'Корисні посилання',
    asideLinks: htmlResources
  },
  '/contacts.html': {
    pageTitle: 'Web-Програмування -  Контакти',
    pageDescription: 'Контактна форма навчального вебпроєкту',
    currentPage: 'contacts', isContacts: true,
    contentPartial: 'contacts-content',
    asideTitle: 'Соціальні мережі',
    asideLinks: htmlResources
  }
};

function getPageContext(pagePath) {
  const pageConfig = pages[pagePath] ?? pages['/index.html'];

  return {
    ...siteConfig,
    ...pageConfig,
  };
}

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: resolve(rootDir, 'src/partials'),
      context: getPageContext,
    }),
  ],

  input: htmlPages,
});