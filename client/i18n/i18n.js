// TODO: switch between different languages
import NLnl from './NL-nl.json';
import ENen from './EN-en.json';

const locales = {
  'NL-nl': NLnl,
  'EN-en': ENen
};

const languageStrings = {};
export default languageStrings;

//Object.assign(languageStrings, locales['NL-nl']);
Object.assign(languageStrings, locales['EN-en']);

export function changeLanguage (locale) {
  if (!locales[locale]) {
    throw('locale not found: ' + locale);
  }

  // clear existing strings
  Object(languageStrings).forEach(key => {
    delete languageStrings[key];
  });

  Object.assign(languageStrings, locales[locale]);
};
