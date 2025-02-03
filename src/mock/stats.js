// react icons
import { AiOutlineUsergroupAdd, AiOutlineBarChart } from 'react-icons/ai';
import { MdOutlineSpeakerPhone, MdOutlineMobileFriendly } from 'react-icons/md';

// stats images
import bagImage from '../assets/images/bag.svg';
import successImage from '../assets/images/success.png';
import phoneImage from '../assets/images/phone.svg';
import checkImage from '../assets/images/check.svg';

// how work images
import compImage from '../assets/images/comp.svg';
import magicImage from '../assets/images/magic.svg';
import ideaImage from '../assets/images/idea.svg';
import heartImage from '../assets/images/heart.svg';

// career images
import phoneImageCareer from '../assets/images/phone.png';
import educationImage from '../assets/images/education.png';
import signalImage from '../assets/images/signal.png';
import achievementImage from '../assets/images/grand.png';

// forWho images
import forWhoImage1 from '../assets/images/green-1.png';
import forWhoImage2 from '../assets/images/green-2.png';
import forWhoImage3 from '../assets/images/green-3.png';
import forWhoImage4 from '../assets/images/green-4.png';
import forWhoImage5 from '../assets/images/green-5.png';
import forWhoImage6 from '../assets/images/green-6.png';

// graduates images
import skLogo from '../assets/images/sk-logo.png';
import ideaLogo from '../assets/images/idea-logo.png';
import digitalLogo from '../assets/images/digital-logo.png';
import ardaLogo from '../assets/images/arda-logo.png';

// company projects
import projectLogo from '../assets/images/company-logo.png';

export const graduates = [
  {
    id: 1,
    imageSrc: skLogo,
    title: 'Сколково',
    description:
      'Школа стартапов - Акселератор для стартапов стадии Pre - Seed, Seed',
  },
  {
    id: 2,
    imageSrc: ideaLogo,
    title: 'ИДЕЯ',
    description:
      'Инфраструктурный, социально-ориентированный проект республиканского масштаба',
  },
  {
    id: 3,
    imageSrc: digitalLogo,
    title: 'DAN',
    description:
      'Агентство результативного маркетинга, которое уделяет приоритетное внимание устойчивому, долгосрочному росту',
  },
  {
    id: 4,
    imageSrc: ardaLogo,
    title: 'ARDA',
    description:
      'Ассоциация, миссией которой является повышение качества работы  digital-агентств, развитие рынка и технологий работы.',
  },
];

export const forWhoDatas = [
  {
    id: 1,
    imageSrc: forWhoImage1,
    textContent: 'Для предпринимателей',
    textDescription: 'которые хотят найти крутых специалистов',
  },
  {
    id: 2,
    imageSrc: forWhoImage2,
    textContent: 'Для владельцев бизнеса',
    textDescription:
      'которые хотят развить свой проект',
  },
  {
    id: 3,
    imageSrc: forWhoImage3,
    textContent: 'Для блогеров и фрилансеров',
    textDescription: 'которые хотят увеличить прибыль новыми инструментами',
  },
  {
    id: 4,
    imageSrc: forWhoImage4,
    textContent: 'Для специалистов',
    textDescription:
      'которые хотят узнать свежие функции и кейсы для продвижения',
  },
  {
    id: 5,
    imageSrc: forWhoImage5,
    textContent: 'Для студентов',
    textDescription: 'ищущих себя и всем, кто считает, что за IT будущее',
  },
  {
    id: 6,
    imageSrc: forWhoImage6,
    textContent: 'Для тех',
    textDescription:
      'кто хочет провести целый день в DIGITAL - тусовке, общаясь на одном языке',
  },
];

export const howWork = [
  {
    id: 1,
    imageSrc: compImage,
    imageAlt: 'Компьютер',
    textContent: 'Зарегистрируйтесь и заполните профиль в личном кабинете',
  },
  {
    id: 2,
    imageSrc: ideaImage,
    imageAlt: 'Компьютер',
    textContent: 'После проверки профиля размещайте свои проекты',
  },
  {
    id: 3,
    imageSrc: magicImage,
    imageAlt: 'Компьютер',
    textContent: 'Находите крутых специалистов',
  },
  {
    id: 3,
    imageSrc: heartImage,
    imageAlt: 'Компьютер',
    textContent: 'Реализовывайте свои идеи в команде с профессионалами ',
  },
];

export const careers = [
  {
    number: '01',
    title: 'Зарегистрируйся',
    description: 'Зарегистрируйся на платформе и укажи свои навыки',
    imageSrc: phoneImageCareer,
  },
  {
    number: '02',
    title: 'Найди проект',
    description:
      'Выбери свой проект и направление, по которому хочешь развиваться',
    imageSrc: educationImage,
  },
  {
    number: '03',
    title: 'Прояви себя! ',
    description: 'Раскрой свой потенциал и докажи всем на что ты способен',
    imageSrc: signalImage,
  },
  {
    number: '04',
    title: 'Получи должность',
    description: 'Займи достойное место в быстроразвивающихся проектах',
    imageSrc: achievementImage,
  },
];

export const stats = [
  {
    title: '42',
    subtitle: 'Лучших спикеров',
    image: bagImage,
    icon: MdOutlineSpeakerPhone,
    w: "[171px]",
    h: "[201px]",
  },
  {
    title: '60+',
    subtitle: 'Стартапов и инсайтов',
    image: successImage,
    icon: AiOutlineUsergroupAdd,
    w: "[201px]",
    h: "[201px]",
  },
  {
    title: '500+',
    subtitle: 'Полезных контактов',
    image: phoneImage,
    icon: MdOutlineMobileFriendly,
    w: "[176px]",
    h: "[176px]",
  },
  {
    title: '35',
    subtitle: 'Часов потока информации',
    image: checkImage,
    icon: AiOutlineBarChart,
    w: "[183px]",
    h: "[183px]",
  },
];

// admin
export const allProjectsData = [
  {
    id: 1,
    company: {
      logo: projectLogo,
      name: 'RegExp-IT',
    },
    technologies: ['React', 'TS', 'Redux', 'JS', 'CSS', 'HTML', 'SCSS'],
    dialogTitle: 'Front-End',
    description:
      'Компания занимается разработкой своего продукта, в том числе разработка цифровых систем для оплаты услуг',
    status: 'Middle',
  },
  {
    id: 2,
    company: {
      logo: projectLogo,
      name: 'RegExp-IT',
    },
    technologies: ['Java', 'Spring', 'Sql', 'Hibernate', 'MicroService'],
    dialogTitle: 'Java Developer',
    description:
      'Компания занимается разработкой своего продукта, в том числе разработка цифровых систем для оплаты услуг',
    status: 'Middle',
  },
];

// projects banner data
export const bannerData = [
  {
    id: 1,
    title: 'Для предпринимателей',
    subtitle: 'которые хотят найти крутых специалистов',
  },
  {
    id: 2,
    title: 'Для владельцев бизнеса',
    subtitle: 'которые хотят развить свой проект',
  },
  {
    id: 3,
    title: 'Для блогеров и фрилансеров',
    subtitle: 'которые хотят увеличить поток звонков новыми интсрументами',
  },
  {
    id: 4,
    title: 'Для специалистов',
    subtitle: 'которые хотят узнать свежие функции и кейсы для продвижения',
  },
  {
    id: 5,
    title: 'Для студентов',
    subtitle: 'ищуших себя и всем, кто считает, что за IT будущее',
  },
  {
    id: 6,
    title: 'Для тех',
    subtitle:
      'кто хочет провести целый день в DIGITAL - тусовке, общаясь на одном языке',
  },
];
