// Record Type

type Page = 'home' | 'about' | 'contect';

type PageInfo = {
  title: string;
};

// Page를 키로 삼고 PageInfo를 value로 시용
const nav: Record<Page, PageInfo> = {
  home: { title: 'Home' },
  about: { title: 'About' },
  contect: { title: 'Contect' },
};
