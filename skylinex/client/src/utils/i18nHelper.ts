import { ServiceCategory, SubServiceSpec, Language } from '../types';

export const getCategoryTitle = (cat?: ServiceCategory | null, lang: Language = 'en'): string => {
  if (!cat) return '';
  if (lang === 'hi' && cat.nameHi) return cat.nameHi;
  if (lang === 'hinglish' && cat.nameHinglish) return cat.nameHinglish;
  if (lang === 'en' && cat.nameEn) return cat.nameEn;
  return cat.name;
};

export const getCategoryDesc = (cat?: ServiceCategory | null, lang: Language = 'en'): string => {
  if (!cat) return '';
  if (lang === 'hi' && cat.descHi) return cat.descHi;
  if (lang === 'hinglish' && cat.descHinglish) return cat.descHinglish;
  if (lang === 'en' && cat.descEn) return cat.descEn;
  return cat.description;
};

export const getSubServiceName = (sub?: SubServiceSpec | null, lang: Language = 'en'): string => {
  if (!sub) return '';
  if (lang === 'hi' && sub.nameHi) return sub.nameHi;
  if (lang === 'hinglish' && sub.nameHinglish) return sub.nameHinglish;
  if (lang === 'en' && sub.nameEn) return sub.nameEn;
  return sub.name;
};

export const getSubServiceSpecs = (sub?: SubServiceSpec | null, lang: Language = 'en'): string => {
  if (!sub) return '';
  if (lang === 'hi' && sub.specsHi) return sub.specsHi;
  if (lang === 'hinglish' && sub.specsHinglish) return sub.specsHinglish;
  if (lang === 'en' && sub.specsEn) return sub.specsEn;
  return sub.specs;
};
