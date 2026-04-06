'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState, type RefObject } from 'react';
import { useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import 'katex/dist/katex.min.css';
import TeX from '@matejmazur/react-katex';

type Lang = 'en' | 'it';
type SectionId = 'Experience' | 'CertificationsSkills' | 'ResearchPublication';

type LocalizedText = {
  en: string;
  it: string;
};

type ExperienceItem = {
  years: LocalizedText;
  title: LocalizedText;
  subtitle?: LocalizedText;
  body: {
    en: string[];
    it: string[];
  };
  company: string;
  logo: string;
};

type SkillTag = {
  id: string;
  label: LocalizedText;
};

type CertificationCategory =
  | 'all'
  | 'project-management'
  | 'service-management'
  | 'database'
  | 'agile'
  | 'cloud-platform'
  | 'ux-design'
  | 'languages';

type CertificationCard = {
  id: string;
  category: Exclude<CertificationCategory, 'all'>;
  title: LocalizedText;
  subtitle?: LocalizedText;
  description: LocalizedText;
  badgeLabel: LocalizedText;
  badgeUrl: string;
  badgeImage?: string;
};

type ResearchItem = {
  year: string;
  title: string;
  venue: string;
  latex: string;
  note?: LocalizedText;
  url: string;
};

type CopyDictionary = {
  roleLine: string;
  heroText: string;
  heroButton: string;
  stepLabels: Record<SectionId, string>;
  experienceTitle: string;
  certificationsTitle: string;
  researchTitle: string;
  scholarUrl: string;
  scholarButton: string;
  scholarProfileTitle: string;
  scholarProfileText: string;
  footer: {
    rights: string;
    contacts: string;
    navigation: string;
    contactPage: string;
    top: string;
  };
  skillsTitle: string;
  skillsSubtitle: string;
  certificationsExplorerTitle: string;
  certificationsExplorerText: string;
  certificationsCategoryLabel: string;
  certificationsQueryLabel: string;
  certificationsRunButton: string;
  certificationsResetButton: string;
  certificationsResultsTitle: string;
  certificationsResultsCount: string;
  certificationsEmpty: string;
  certificationsOpenBadge: string;
  categories: Record<CertificationCategory, string>;
  oracleQueriesByCategory: Record<CertificationCategory, string>;
};

const rotatingRoles: Record<Lang, string[]> = {
  en: [
    'IT Project Manager',
    'IT Business Analyst',
    'IT Delivery Manager',
    'IT Technical Project Manager',
    'Independent mathematics researcher',
  ],
  it: [
    'IT Project Manager',
    'IT Business Analyst',
    'IT Delivery Manager',
    'IT Technical Project Manager',
    'Ricercatore indipendente in matematica',
  ],
};

const skillTags: SkillTag[] = [
  { id: 's1', label: { en: 'Team Working', it: 'Lavoro di squadra' } },
  { id: 's2', label: { en: 'Problem Solving', it: 'Problem Solving' } },
  {
    id: 's3',
    label: { en: 'Strong Decision-Making', it: 'Capacità decisionale' },
  },
  { id: 's4', label: { en: 'Creativity', it: 'Creatività' } },
  {
    id: 's5',
    label: { en: 'Intellectual Curiosity', it: 'Curiosità intellettuale' },
  },
  {
    id: 's6',
    label: { en: 'Attention to Detail', it: 'Attenzione ai dettagli' },
  },
  {
    id: 's7',
    label: { en: 'Stakeholder Management', it: 'Gestione degli stakeholder' },
  },
  {
    id: 's8',
    label: { en: 'Vendor Management', it: 'Gestione dei fornitori' },
  },
  { id: 's9', label: { en: 'Data Analysis', it: 'Analisi dati' } },
  { id: 's10', label: { en: 'Project Management', it: 'Project Management' } },
  {
    id: 's11',
    label: { en: 'Requirements Analysis', it: 'Analisi requisiti' },
  },
  { id: 's12', label: { en: 'Scrum Master', it: 'Scrum Master' } },
  { id: 's13', label: { en: 'System Testing', it: 'System Testing' } },
  {
    id: 's14',
    label: { en: 'Service Management', it: 'Service Management' },
  },
  { id: 's15', label: { en: 'Microsoft Excel', it: 'Microsoft Excel' } },
  { id: 's16', label: { en: 'LaTeX', it: 'LaTeX' } },
  { id: 's17', label: { en: 'AWS Cloud', it: 'AWS Cloud' } },
  { id: 's18', label: { en: 'Python', it: 'Python' } },
  { id: 's19', label: { en: 'C++', it: 'C++' } },
  { id: 's20', label: { en: 'Fortran', it: 'Fortran' } },
  { id: 's21', label: { en: 'SQL', it: 'SQL' } },
  { id: 's22', label: { en: 'PL/SQL', it: 'PL/SQL' } },
  { id: 's23', label: { en: 'MongoDB', it: 'MongoDB' } },
  { id: 's24', label: { en: 'UX Design', it: 'UX Design' } },
  { id: 's25', label: { en: 'MATLAB', it: 'MATLAB' } },
  { id: 's26', label: { en: 'PowerPoint', it: 'Microsoft PowerPoint' } },
];

const experienceItems: ExperienceItem[] = [
  {
    years: { en: '2022 — PRESENT', it: '2022 — PRESENTE' },
    title: { en: 'IT Project Manager', it: 'IT Project Manager' },
    subtitle: {
      en: 'Cloudify NoiPA Program',
      it: 'Programma Cloudify NoiPA',
    },
    body: {
      en: [
        'Delivered more than 30 software development objectives in the payroll domain, ensuring project deadlines within the Cloudify NoiPA program while managing a multi-million-euro budget.',
        'Managed the project using a hybrid Agile/Waterfall delivery approach.',
        'Coordinate a multi-company team (internal analysts, external developers) and institutional stakeholders (MEF – DAG – DSII) through structured project planning, periodic meetings, and progress reporting.',
        'Oversee the execution of hundreds of weekly system tests, monitoring progress, results, and critical issues.',
        'Defined and applied as-is / to-be analysis procedures, collaborating with stakeholders to define functional requirements and manage priorities.',
        'Ensure alignment between strategic objectives and operational activities by working with stakeholders and teams to clarify priorities and key decisions across the program.',
      ],
      it: [
        'Ho portato a termine oltre 30 obiettivi di sviluppo software in ambito stipendiale, garantendo il rispetto delle scadenze progettuali nel programma Cloudify NoiPA e gestendo un budget multimilionario.',
        'Ho gestito il progetto con approccio ibrido Agile/Waterfall.',
        'Coordino un team multi-aziendale (analisti interni, sviluppatori esterni) e stakeholder istituzionali MEF – DAG – DSII attraverso un piano di progetto strutturato, incontri periodici e documentazione di avanzamento.',
        'Supervisiono l’esecuzione di centinaia di test di sistema settimanali, monitorando avanzamento, esiti e criticità.',
        'Ho definito e applicato procedure di confronto as-is / to-be, collaborando con gli stakeholder per la definizione dei requisiti funzionali e la gestione delle priorità.',
        'Assicuro l’allineamento tra obiettivi strategici e attività operative, lavorando con stakeholder e team per chiarire priorità e decisioni lungo tutto il programma.',
      ],
    },
    company: 'Sogei',
    logo: '/logos/sogei_logo.jpg',
  },
  {
    years: { en: '2018 — 2022', it: '2018 — 2022' },
    title: { en: 'Product Owner', it: 'Product Owner' },
    subtitle: {
      en: 'NoiPA Operations and Support Service',
      it: 'Servizio di Assistenza e Conduzione di NoiPA',
    },
    body: {
      en: [
        'Managed maintenance and evolution developments for NoiPA, a mission-critical payroll system generating around 2 million payslips per month, ensuring operational continuity and release quality.',
        'Translated administrative requirements into IT functional requirements using use cases, scenario categorization, and feature prioritization.',
        'Coordinated the onboarding of a public administration entity with specific requirements, identifying functional gaps and supporting the correct system configuration.',
        'Coordinated specialized support activities, reporting for end users, and defined validation procedures for system outputs.',
      ],
      it: [
        'Ho gestito sviluppi di manutenzione ed evoluzione di NoiPA, sistema mission-critical che produce circa 2 milioni di cedolini mensili, garantendo continuità operativa e qualità delle release.',
        'Ho tradotto i requisiti amministrativi in requisiti funzionali IT, utilizzando casi d’uso, categorizzazione delle casistiche e prioritizzazione delle funzionalità.',
        'Ho coordinato l’onboarding di un ente pubblico con esigenze specifiche, individuando i gap funzionali e supportando la corretta configurazione del sistema.',
        'Ho coordinato attività di supporto specialistico, reportistica per utenti finali e definito procedure di validazione degli output di sistema.',
      ],
    },
    company: 'Sogei',
    logo: '/logos/sogei_logo.jpg',
  },
  {
    years: { en: '2016 — 2020', it: '2016 — 2020' },
    title: {
      en: 'Master’s Degree in Mathematics',
      it: 'Laurea Magistrale in Matematica',
    },
    body: {
      en: [
        'Thesis: On the regularizing effect of the lower order terms in some elliptic problems',
        'Final grade: 110/110 with honors',
        'Degree completed while working full-time',
      ],
      it: [
        'Tesi: Effetto regolarizzante dei termini di ordine inferiore in alcuni problemi ellittici',
        'Voto finale: 110/110 cum laude',
        'Titolo conseguito lavorando a tempo pieno',
      ],
    },
    company: 'La Sapienza Università di Roma',
    logo: '/logos/sapienza.png',
  },
  {
    years: { en: '2013 — 2016', it: '2013 — 2016' },
    title: {
      en: 'Bachelor’s Degree in Mathematics',
      it: 'Laurea Triennale in Matematica',
    },
    body: {
      en: [
        'Thesis: Elliptic equation in R^n',
        'Final grade: 110/110 with honors',
      ],
      it: [
        'Tesi: Equazioni ellittiche in R^n',
        'Voto finale: 110/110 cum laude',
      ],
    },
    company: 'La Sapienza Università di Roma',
    logo: '/logos/sapienza.png',
  },
];

const researchItems: ResearchItem[] = [
  {
    year: '2026',
    title:
      'Finite energy weak solutions to some Dirichlet problems with very singular drifts and nonlinear advection terms',
    venue:
      'Annals Academy of Romanian Scientists Series on Mathematics and Its Application',
    latex: String.raw`\begin{cases}  -\hbox{div} (M(x){D} u)+E(x)\cdot{D} H(u)+ \,u
          =    f(x)
          \ \ \ \hbox{ in } \Omega ,  \\  
          u =0
          \ \ \ \hbox{ on }
          \partial\Omega,   
        \end{cases}`,
    url: 'https://aos.ro/wp-content/anale/MVol18Nr1Art.17.pdf',
  },
  {
    year: '2025',
    title:
      'The classical linear duality method in some semilinear and noncoercive Dirichlet problems',
    venue: 'Electronic Research Archive',
    latex: String.raw`\begin{cases}
          u\in W_0^{1,2}:\;
          -\hbox{div}(M(x)\,{D} u) + u   =\theta\; \psi|\psi|^{p'-2} +f (x);  \\ 
          \psi\in W_0^{1,2}:\;-\hbox{div}(M(x)\,{D}\psi) + \psi= u|u|^{p-2}
          \end{cases}`,
    url: 'https://www.aimspress.com/aimspress-data/era/2026/1/PDF/era-34-01-003.pdf',
  },
  {
    year: '2024',
    title:
      'A Simple Approach to a Dirichlet Problem Related to the Kardar-Parisi-Zhang Equation with Singular Coefficients',
    venue: 'Milan Journal of Mathematics',
    latex: String.raw`-\hbox{div} (M(x)\nabla u )
          +a(x)\,u 
          =
          \sqrt{\;[b(x)]^2+  |E\cdot\nabla u|^2  \;}+f  (x), \ \ \ \hbox{with zero boundary condition}`,
    url: 'https://link.springer.com/article/10.1007/s00032-024-00400-0',
  },
  {
    year: '2023',
    title:
      'Saddle Points of some Integral Functionals and Solutions of Elliptic Systems',
    venue: 'Minimax Theory And Its Applications',
    latex: String.raw`\begin{cases}
          u \in W_0^{1,2}:\ -\hbox{div}(a(x)\,\nabla u) = -\hbox{div}(\psi\,E(x))\,, \\
          \psi \in W_0^{1,p}:\ \ -\hbox{div}(a(x)\,|\nabla\psi|^{p-2}\,\nabla\psi) + E(x) \cdot \nabla u = f(x)\,, \\
          \end{cases}`,
    url: 'https://journalmta.com/index.php/jmta/article/view/157/151',
  },
  {
    year: '2022',
    title: 'Nonlinear weighted elliptic equations with Sobolev weights',
    venue: "Bollettino dell'Unione Matematica Italiana",
    latex: String.raw`-\hbox{div} (s (x)|\nabla u|^{p-2}\nabla u)= f (x) \ \  \hbox{in} \ \Omega \ \ \ \hbox{with zero boundary condition}`,
    url: 'https://iris.uniroma1.it/bitstream/11573/1641196/3/Boccardo_preprint_Nonlinear_2022.pdf',
  },
];

const certificationCards: CertificationCard[] = [
  {
    id: 'c1',
    category: 'project-management',
    title: {
      en: 'PMP® – Project Management Professional',
      it: 'PMP® – Project Management Professional',
    },
    subtitle: { en: 'PMI', it: 'PMI' },
    description: {
      en: 'Professional certification focused on governance, scope, planning, schedule, budget, and stakeholder coordination.',
      it: 'Certificazione professionale focalizzata su governance, ambito, pianificazione, schedule, budget e coordinamento degli stakeholder.',
    },
    badgeLabel: { en: 'Credly Badge', it: 'Badge Credly' },
    badgeUrl:
      'https://www.credly.com/badges/aaefe9cf-1ed5-4df3-8c90-eab68fdfddb1',
    badgeImage: '/badges/project-management-professional-pmp.png',
  },
  {
    id: 'c2',
    category: 'agile',
    title: {
      en: 'Scrum Master Certified',
      it: 'Scrum Master Certified',
    },
    subtitle: { en: 'Scrum Alliance', it: 'Scrum Alliance' },
    description: {
      en: 'Knowledge of iterative planning, sprint delivery, backlog refinement, and hybrid Agile/Waterfall operating models.',
      it: 'Conoscenza di pianificazione iterativa, sprint delivery, backlog refinement e modelli operativi ibridi Agile/Waterfall.',
    },
    badgeLabel: { en: 'View Badge', it: 'Visualizza badge' },
    badgeUrl:
      'https://www.dropbox.com/scl/fi/91y5lynwqix3tyb1h3ubw/Pasquale-Imparato-ScrumAlliance_CSM_Certificate.pdf?dl=0',
    badgeImage: '/badges/sa-csm-600.png',
  },
  {
    id: 'c3',
    category: 'service-management',
    title: {
      en: 'ITIL v4 Foundation',
      it: 'ITIL v4 Foundation',
    },
    subtitle: { en: 'PeopleCert', it: 'PeopleCert' },
    description: {
      en: 'Competence in service lifecycle, support streams, service quality, and operational governance.',
      it: 'Competenze sul ciclo di vita del servizio, sui flussi di supporto, sulla qualità del servizio e sulla governance operativa.',
    },
    badgeLabel: { en: 'View Badge', it: 'Visualizza badge' },
    badgeUrl:
      'https://www.dropbox.com/scl/fi/uhmr4gmzjraoi2hsusn4b/ITIL-Foundation_e-cert.pdf?dl=0',
    badgeImage: '/badges/itil-v4-foundation.png',
  },
  {
    id: 'c4',
    category: 'project-management',
    title: {
      en: 'ISIPM®-Base',
      it: 'ISIPM®-Base',
    },
    subtitle: {
      en: 'Italian Institute of Project Management',
      it: 'Istituto Italiano di Project Management',
    },
    description: {
      en: 'Certificate released by the Italian Institute of Project Management.',
      it: 'Certificato rilasciato dall’Istituto Italiano di Project Management.',
    },
    badgeLabel: { en: 'Open Badge', it: 'Open Badge' },
    badgeUrl:
      'https://app.open-badge.eu/public/badges/14483eab-4661-4f4d-b1f5-b66caca963c2',
    badgeImage: '/badges/Qualificazione ISIPM-Base®.png',
  },
  {
    id: 'c5',
    category: 'project-management',
    title: {
      en: 'Google Project Management',
      it: 'Google Project Management',
    },
    subtitle: { en: 'Google & Coursera', it: 'Google & Coursera' },
    description: {
      en: 'Professional certification covering project planning, execution, risk management, stakeholder communication, and delivery fundamentals.',
      it: 'Certificazione professionale su pianificazione di progetto, esecuzione, gestione dei rischi, comunicazione con gli stakeholder e fondamenti di delivery.',
    },
    badgeLabel: { en: 'Credly Badge', it: 'Badge Credly' },
    badgeUrl:
      'https://www.credly.com/badges/7fc3cd08-548c-46ad-b475-efd4bb458e47/public_url',
    badgeImage: '/badges/google-project-management.png',
  },
  {
    id: 'c6',
    category: 'agile',
    title: { en: 'Improvement', it: 'Improvement' },
    subtitle: { en: 'Agile Made in Italy', it: 'Agile Made in Italy' },
    description: {
      en: 'Certificate awarded following a workshop on Agile retrospectives.',
      it: 'Certificato rilasciato a seguito di un workshop sui temi della retrospettiva Agile.',
    },
    badgeLabel: { en: 'Credly Badge', it: 'Badge Credly' },
    badgeUrl:
      'https://credsverse.com/credentials/dfd2cfc8-a3a8-4380-91b9-c1d7cd31f089?preview=1',
    badgeImage: '/badges/dfd2cfc8-a3a8-4380-91b9-c1d7cd31f089.png',
  },
  {
    id: 'c7',
    category: 'ux-design',
    title: {
      en: 'Google UX Design',
      it: 'Google UX Design',
    },
    subtitle: { en: 'Google & Coursera', it: 'Google & Coursera' },
    description: {
      en: 'Professional certification focused on user-centered design, wireframing, prototyping, usability testing, and design processes.',
      it: 'Certificazione professionale focalizzata su progettazione centrata sull’utente, wireframing, prototipazione, usability testing e processi di design.',
    },
    badgeLabel: { en: 'Credly Badge', it: 'Badge Credly' },
    badgeUrl:
      'https://www.credly.com/badges/ad0dc4f1-8714-4cd5-aa06-00dc03f0381a/public_url',
    badgeImage: '/badges/google-ux-design-certificate.2.png',
  },
  {
    id: 'c8',
    category: 'cloud-platform',
    title: {
      en: 'AWS Cloud Practitioner',
      it: 'AWS Cloud Practitioner',
    },
    subtitle: { en: 'AWS', it: 'AWS' },
    description: {
      en: 'Certification validating foundational knowledge of AWS cloud services, architecture, pricing, and security.',
      it: 'Certificazione che valida la conoscenza dei concetti fondamentali del cloud AWS, dei servizi, dell’architettura, della sicurezza e del modello di pricing.',
    },
    badgeLabel: { en: 'Credly Badge', it: 'Badge Credly' },
    badgeUrl:
      'https://www.credly.com/badges/931cd547-7c42-438c-b023-c8cc92f0e130/public_url',
    badgeImage: '/badges/aws-certified-cloud-practitioner.png',
  },
  {
    id: 'c9',
    category: 'database',
    title: {
      en: 'Oracle Database SQL Associate',
      it: 'Oracle Database SQL Associate',
    },
    subtitle: { en: 'Oracle', it: 'Oracle' },
    description: {
      en: 'Foundation in relational models, SQL querying, and data structures used in enterprise systems.',
      it: 'Fondamenti sui modelli relazionali, interrogazioni SQL e strutture dati utilizzate nei sistemi enterprise.',
    },
    badgeLabel: { en: 'View Badge', it: 'Visualizza badge' },
    badgeUrl:
      'https://www.dropbox.com/scl/fi/qvh6dnw7zm6d6o9z0747v/eCertificate-OCA-SQL.pdf?dl=0',
    badgeImage: '/badges/1_27FZZjeNhzMI4MYNsHY4PA.png',
  },
  {
    id: 'c10',
    category: 'database',
    title: {
      en: 'MongoDB Skills: From Relational to Documental',
      it: 'MongoDB Skills: From Relational to Documental',
    },
    subtitle: { en: 'MongoDB University', it: 'MongoDB University' },
    description: {
      en: 'Workshop certificate on transitioning from relational databases to MongoDB document model.',
      it: 'Certificato ottenuto al completamento di un workshop sulla transizione dai database relazionali al modello documentale di MongoDB.',
    },
    badgeLabel: { en: 'Credly Badge', it: 'Badge Credly' },
    badgeUrl:
      'https://www.credly.com/badges/9f3ba4f7-05bd-4397-aa9f-c7050e7e975f/public_url',
    badgeImage: '/badges/b37f011476d35f5b34364a7fc5377c528b081cb4.png',
  },
  {
    id: 'c11',
    category: 'database',
    title: {
      en: 'MongoDB for SQL Experts',
      it: 'MongoDB for SQL Experts',
    },
    subtitle: { en: 'MongoDB University', it: 'MongoDB University' },
    description: {
      en: 'Certificate on the main features of MongoDB for professionals with SQL background.',
      it: 'Certificato sulle principali funzionalità di MongoDB per professionisti con background SQL.',
    },
    badgeLabel: { en: 'View Badge', it: 'Visualizza badge' },
    badgeUrl:
      'https://www.dropbox.com/scl/fi/ftn49czxx88ykveg82g6x/pasquale-imparato-48854017-4b28-4f1a-9ef0-ca9d501b3cea-certificate.pdf?dl=0',
    badgeImage: '/badges/b37f011476d35f5b34364a7fc5377c528b081cb4.png',
  },
  {
    id: 'c12',
    category: 'languages',
    title: {
      en: 'First Certificate in English (B2)',
      it: 'First Certificate in English (B2)',
    },
    subtitle: {
      en: 'Cambridge Assessment English',
      it: 'Cambridge Assessment English',
    },
    description: {
      en: 'Certification demonstrating upper-intermediate proficiency in written and spoken English.',
      it: 'Certificazione Cambridge che attesta una conoscenza della lingua inglese di livello B2.',
    },
    badgeLabel: { en: 'View Certificate', it: 'Visualizza certificato' },
    badgeUrl:
      'https://www.dropbox.com/scl/fi/ftn49czxx88ykveg82g6x/pasquale-imparato-48854017-4b28-4f1a-9ef0-ca9d501b3cea-certificate.pdf?dl=0',
    badgeImage:
      '/badges/cambridge-assessment-international-education-vector-logo.png',
  },
];

const copy: Record<Lang, CopyDictionary> = {
  en: {
    roleLine:
      'Project Management • Stakeholder Management • Team Coordination • Budget & Timeline Control • Agile & Waterfall Methodologies • Requirements Analysis',
    heroText:
      'IT Project Manager (PMP®) at Sogei working on Public Administration digital programs. I manage end-to-end software delivery: planning, coordination of stakeholders and vendors, quality assurance, and go-live activities. I work on mission-critical systems (NoiPA, serving millions of users every month). My approach combines Agile and Waterfall methodologies, with strong attention to risks, requirements, and operational impacts.',
    heroButton: 'Download CV',
    stepLabels: {
      Experience: 'Experience & Education',
      CertificationsSkills: 'Certifications & Skills',
      ResearchPublication: 'Research Publications',
    },
    experienceTitle: 'Experience & Education',
    certificationsTitle: 'Certifications & Skills',
    researchTitle: 'Research Publications',
    scholarUrl:
      'https://scholar.google.com/citations?view_op=list_works&hl=en&user=YOUR_ID',
    scholarButton: 'View Google Scholar',
    scholarProfileTitle: 'Google Scholar Profile',
    scholarProfileText:
      'Full publications, citations, and profile metrics are available on Google Scholar.',
    footer: {
      rights: 'All rights reserved.',
      contacts: 'Contacts',
      navigation: 'Navigation',
      contactPage: 'Contact page',
      top: 'Back to top',
    },
    skillsTitle: 'Core Skills',
    skillsSubtitle: 'A compact overview of my skills',
    certificationsExplorerTitle: 'Certification Search',
    certificationsExplorerText:
      'This is a slightly nerdy way to browse my certifications. Select the category, build the query, and run it.',
    certificationsCategoryLabel: 'Category',
    certificationsQueryLabel: 'Generated query',
    certificationsRunButton: 'Run query',
    certificationsResetButton: 'Reset',
    certificationsResultsTitle: 'Results',
    certificationsResultsCount: 'certifications found',
    certificationsEmpty:
      'No certifications available for the selected category.',
    certificationsOpenBadge: 'Open badge',
    categories: {
      all: 'All categories',
      'project-management': 'Project Management',
      'service-management': 'Service Management',
      database: 'Database',
      agile: 'Agile',
      'cloud-platform': 'Cloud Platform',
      'ux-design': 'UX Design',
      languages: 'Languages',
    },
    oracleQueriesByCategory: {
      all: `SELECT * FROM certifications
WHERE expiration_date > SYSDATE
ORDER BY importance DESC;`,
      'project-management': `SELECT * FROM certifications
WHERE category = 'PROJECT_MANAGEMENT'
  AND expiration_date > SYSDATE
ORDER BY importance DESC;`,
      'service-management': `SELECT * FROM certifications
WHERE category = 'SERVICE_MANAGEMENT'
  AND expiration_date > SYSDATE
ORDER BY importance DESC;`,
      database: `SELECT * FROM certifications
WHERE category = 'DATABASE'
  AND expiration_date > SYSDATE
ORDER BY importance DESC;`,
      agile: `SELECT * FROM certifications
WHERE category = 'AGILE_DELIVERY'
  AND expiration_date > SYSDATE
ORDER BY importance DESC;`,
      'cloud-platform': `SELECT * FROM certifications
WHERE category = 'CLOUD_PLATFORM'
  AND expiration_date > SYSDATE
ORDER BY importance DESC;`,
      'ux-design': `SELECT * FROM certifications
WHERE category = 'UX_DESIGN'
  AND expiration_date > SYSDATE
ORDER BY importance DESC;`,
      languages: `SELECT * FROM certifications
WHERE category = 'LANGUAGES'
  AND expiration_date > SYSDATE
ORDER BY importance DESC;`,
    },
  },
  it: {
    roleLine:
      'Project Management • Stakeholder Management • Team Coordination • Budget & Timeline Control • Agile & Waterfall Methodologies • Requirements Analysis',
    heroText:
      'IT Project Manager (PMP®) in Sogei su programmi della Pubblica Amministrazione. Gestisco la delivery software end-to-end: pianificazione, coordinamento stakeholder e fornitori, qualità e go-live. Lavoro su sistemi mission-critical (NoiPA, milioni di utenti ogni mese). Approccio ibrido Agile/Waterfall, con attenzione a rischi, requisiti e impatti operativi.',
    heroButton: 'Download CV',
    stepLabels: {
      Experience: 'Esperienza & Istruzione',
      CertificationsSkills: 'Certificazioni e Competenze',
      ResearchPublication: 'Pubblicazioni Scientifiche',
    },
    experienceTitle: 'Esperienza & Istruzione',
    certificationsTitle: 'Certificazioni e Competenze',
    researchTitle: 'Pubblicazioni Scientifiche',
    scholarUrl:
      'https://scholar.google.com/citations?view_op=list_works&hl=en&user=YOUR_ID',
    scholarButton: 'Vai a Google Scholar',
    scholarProfileTitle: 'Profilo Google Scholar',
    scholarProfileText:
      'Pubblicazioni complete, citazioni e metriche del profilo sono disponibili su Google Scholar.',
    footer: {
      rights: 'Tutti i diritti riservati.',
      contacts: 'Contatti',
      navigation: 'Navigazione',
      contactPage: 'Pagina contatti',
      top: 'Torna su',
    },
    skillsTitle: 'Competenze Chiave',
    skillsSubtitle: 'Una panoramica sintetica delle mie principali skill',
    certificationsExplorerTitle: 'Ricerca Certificazioni',
    certificationsExplorerText:
      'Questa è una modalità un po’ nerd per visualizzare le mie certificazioni. Seleziona la categoria, costruisci la query e lanciala.',
    certificationsCategoryLabel: 'Categoria',
    certificationsQueryLabel: 'Query generata',
    certificationsRunButton: 'Lancia query',
    certificationsResetButton: 'Reset',
    certificationsResultsTitle: 'Risultati',
    certificationsResultsCount: 'certificazioni trovate',
    certificationsEmpty:
      'Nessuna certificazione disponibile per la categoria selezionata.',
    certificationsOpenBadge: 'Apri badge',
    categories: {
      all: 'Tutte le categorie',
      'project-management': 'Project Management',
      'service-management': 'Service Management',
      database: 'Database',
      agile: 'Agile',
      'cloud-platform': 'Cloud Platform',
      'ux-design': 'UX Design',
      languages: 'Lingue',
    },
    oracleQueriesByCategory: {
      all: `SELECT * FROM certifications
ORDER BY category, title;`,
      'project-management': `SELECT * FROM certifications
WHERE category = 'PROJECT_MANAGEMENT'
ORDER BY achieved_date DESC;`,
      'service-management': `SELECT * FROM certifications
WHERE category = 'SERVICE_MANAGEMENT'
ORDER BY title ASC;`,
      database: `SELECT * FROM certifications
WHERE category = 'DATABASE'
ORDER BY vendor, title;`,
      agile: `SELECT * FROM certifications
WHERE category = 'AGILE_DELIVERY'
ORDER BY achieved_date DESC;`,
      'cloud-platform': `SELECT * FROM certifications
WHERE category = 'CLOUD_PLATFORM'
ORDER BY vendor, achieved_date DESC;`,
      'ux-design': `SELECT * FROM certifications
WHERE category = 'UX_DESIGN'
ORDER BY vendor, achieved_date DESC;`,
      languages: `SELECT * FROM certifications
WHERE category = 'LANGUAGES'
ORDER BY vendor, achieved_date DESC;`,
    },
  },
};

export default function HomePage() {
  const searchParams = useSearchParams();

  const lang: Lang = searchParams.get('lang') === 'en' ? 'en' : 'it';

  const [roleIndex, setRoleIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<
    Record<SectionId, boolean>
  >({
    Experience: true,
    CertificationsSkills: false,
    ResearchPublication: false,
  });

  const [selectedCertCategory, setSelectedCertCategory] =
    useState<CertificationCategory>('all');
  const [executedCertCategory, setExecutedCertCategory] =
    useState<CertificationCategory>('all');

  const experienceRef = useRef<HTMLElement | null>(null);
  const certificationsSkillsRef = useRef<HTMLElement | null>(null);
  const researchPublicationRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setRoleIndex(0);
  }, [lang]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % rotatingRoles[lang].length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, [lang]);

  const t = copy[lang];
  const currentYear = new Date().getFullYear();

  const sectionRefs: Record<SectionId, RefObject<HTMLElement | null>> = {
    Experience: experienceRef,
    CertificationsSkills: certificationsSkillsRef,
    ResearchPublication: researchPublicationRef,
  };

  const toggleStep = (id: SectionId) => {
    const isOpening = !completedSteps[id];

    setCompletedSteps((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));

    if (isOpening) {
      window.setTimeout(() => {
        sectionRefs[id].current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 280);
    }
  };

  const openSingleSection = (id: SectionId) => {
    setCompletedSteps({
      Experience: id === 'Experience',
      CertificationsSkills: id === 'CertificationsSkills',
      ResearchPublication: id === 'ResearchPublication',
    });

    window.setTimeout(() => {
      sectionRefs[id].current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 280);
  };

  const reveal = {
    initial: { opacity: 0, y: 24, filter: 'blur(6px)' },
    animate: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
    },
    exit: {
      opacity: 0,
      y: 24,
      filter: 'blur(6px)',
      transition: { duration: 0.25 },
    },
  };

  const currentOracleQuery =
    t.oracleQueriesByCategory[selectedCertCategory] ??
    t.oracleQueriesByCategory.all;

  const visibleCertificationCards = useMemo(() => {
    if (executedCertCategory === 'all') return certificationCards;
    return certificationCards.filter(
      (item) => item.category === executedCertCategory
    );
  }, [executedCertCategory]);

  const sections = useMemo(
    () => [
      {
        id: 'Experience' as const,
        label: t.stepLabels.Experience,
        content: (
          <motion.section
            ref={experienceRef}
            variants={reveal}
            initial="initial"
            animate="animate"
            exit="exit"
            className="border-x border-b border-white/10 bg-[#04112f] px-6 py-10 md:px-10 md:py-12"
          >
            <h2 className="mb-10 text-[34px] font-light tracking-[-0.04em] text-white md:text-[56px]">
              {t.experienceTitle}
            </h2>

            <div className="relative">
              <div className="absolute bottom-0 left-[23px] top-0 w-px bg-white/15" />

              <div className="space-y-10">
                {experienceItems.map((item, index) => (
                  <div
                    key={`${item.title.en}-${index}`}
                    className="relative pl-16 md:pl-20"
                  >
                    <div className="absolute left-0 top-1 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/15 bg-[#081331] shadow-[0_0_20px_rgba(0,0,0,0.25)]">
                      <img
                        src={item.logo}
                        alt={`${item.company} logo`}
                        className="h-7 w-7 object-contain"
                      />
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
                      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                          <div className="text-xs uppercase tracking-[0.18em] text-slate-400 md:text-sm">
                            {item.years[lang]}
                          </div>

                          <h3 className="mt-3 text-[28px] font-light leading-none tracking-[-0.03em] text-white md:text-[40px]">
                            {item.title[lang]}
                          </h3>

                          {item.subtitle && (
                            <div className="mt-2 text-[18px] font-light text-slate-300 md:text-[24px]">
                              {item.subtitle[lang]}
                            </div>
                          )}

                          <div className="mt-2 text-sm uppercase tracking-[0.16em] text-sky-300">
                            {item.company}
                          </div>
                        </div>

                        <div className="max-w-xl text-left text-sm leading-relaxed text-slate-300 md:text-[15px]">
                          <ul className="list-disc space-y-2 pl-5">
                            {item.body[lang].map((point, i) => (
                              <li key={i}>{point}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        ),
      },
      {
        id: 'CertificationsSkills' as const,
        label: t.stepLabels.CertificationsSkills,
        content: (
          <motion.section
            ref={certificationsSkillsRef}
            variants={reveal}
            initial="initial"
            animate="animate"
            exit="exit"
            className="border-x border-b border-white/10 bg-[#07173d] px-6 py-10 md:px-10 md:py-12"
          >
            <h2 className="mb-8 text-[30px] font-light tracking-[-0.04em] text-white md:text-[50px]">
              {t.certificationsTitle}
            </h2>

            <div className="mb-8 rounded-[24px] border border-white/10 bg-white/[0.03] p-5 md:p-7">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-400 md:text-sm">
                    {t.skillsTitle}
                  </div>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 md:text-base">
                    {t.skillsSubtitle}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {skillTags.map((skill) => (
                  <div
                    key={skill.id}
                    className="rounded-xl border border-white/12 bg-[#081331] px-4 py-3 text-sm text-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-all hover:-translate-y-[1px] hover:border-sky-400/30 md:text-[15px]"
                  >
                    {skill.label[lang]}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8 rounded-[24px] border border-white/10 bg-[#081331] p-5 md:p-7">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-400 md:text-sm">
                {t.certificationsExplorerTitle}
              </div>

              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 md:text-base">
                {t.certificationsExplorerText}
              </p>

              <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-[260px_minmax(0,1fr)]">
                <div>
                  <label className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-slate-400">
                    {t.certificationsCategoryLabel}
                  </label>

                  <select
                    value={selectedCertCategory}
                    onChange={(e) =>
                      setSelectedCertCategory(
                        e.target.value as CertificationCategory
                      )
                    }
                    className="w-full rounded-xl border border-white/12 bg-[#07112b] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-sky-400/40"
                  >
                    <option value="all">{t.categories.all}</option>
                    <option value="project-management">
                      {t.categories['project-management']}
                    </option>
                    <option value="service-management">
                      {t.categories['service-management']}
                    </option>
                    <option value="database">{t.categories.database}</option>
                    <option value="agile">{t.categories.agile}</option>
                    <option value="cloud-platform">
                      {t.categories['cloud-platform']}
                    </option>
                    <option value="ux-design">{t.categories['ux-design']}</option>
                    <option value="languages">{t.categories.languages}</option>
                  </select>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        setExecutedCertCategory(selectedCertCategory)
                      }
                      className="inline-flex rounded-full bg-sky-400 px-4 py-2 text-sm font-medium text-slate-950 transition-colors hover:bg-sky-300"
                    >
                      {t.certificationsRunButton}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCertCategory('all');
                        setExecutedCertCategory('all');
                      }}
                      className="inline-flex rounded-full border border-white/15 px-4 py-2 text-sm text-white transition-colors hover:border-sky-400/40 hover:text-sky-300"
                    >
                      {t.certificationsResetButton}
                    </button>
                  </div>
                </div>

                <div>
                  <div className="mb-2 block text-[11px] uppercase tracking-[0.18em] text-slate-400">
                    {t.certificationsQueryLabel}
                  </div>

                  <div className="min-h-[140px] rounded-2xl border border-white/10 bg-[#050d23] p-4 md:p-5">
                    <pre className="whitespace-pre-wrap break-words font-mono text-[12px] leading-6 text-emerald-300 md:text-[13px]">
                      {currentOracleQuery}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 className="text-[22px] font-light tracking-[-0.03em] text-white md:text-[30px]">
                {t.certificationsResultsTitle}
              </h3>

              <div className="text-xs uppercase tracking-[0.18em] text-slate-400 md:text-sm">
                {visibleCertificationCards.length}{' '}
                {t.certificationsResultsCount}
              </div>
            </div>

            {visibleCertificationCards.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/12 bg-white/[0.02] px-5 py-8 text-sm text-slate-300 md:text-base">
                {t.certificationsEmpty}
              </div>
            ) : (
              <div className="space-y-4">
                {visibleCertificationCards.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-sky-400/30 md:p-5"
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                      <a
                        href={item.badgeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex h-[88px] w-full shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/12 bg-[#081331] text-center transition-colors hover:border-sky-400/40 md:w-[120px]"
                        aria-label={t.certificationsOpenBadge}
                      >
                        {item.badgeImage ? (
                          <img
                            src={item.badgeImage}
                            alt={item.title[lang]}
                            className="h-full w-full object-scale-down p-2"
                          />
                        ) : (
                          <div className="px-3">
                            <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                              Badge image
                            </div>
                            <div className="mt-2 text-sm text-sky-300 transition-colors group-hover:text-sky-200">
                              {item.badgeLabel[lang]}
                            </div>
                          </div>
                        )}
                      </a>

                      <div className="min-w-0 flex-1">
                        <div className="text-xs uppercase tracking-[0.18em] text-slate-400 md:text-sm">
                          {t.categories[item.category]}
                        </div>

                        <h4 className="mt-2 text-[22px] font-light tracking-[-0.03em] text-white md:text-[30px]">
                          {item.title[lang]}
                        </h4>

                        {item.subtitle && (
                          <div className="mt-2 text-sm text-sky-300 md:text-base">
                            {item.subtitle[lang]}
                          </div>
                        )}

                        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 md:text-base">
                          {item.description[lang]}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.section>
        ),
      },
      {
        id: 'ResearchPublication' as const,
        label: t.stepLabels.ResearchPublication,
        content: (
          <motion.section
            ref={researchPublicationRef}
            variants={reveal}
            initial="initial"
            animate="animate"
            exit="exit"
            className="border-x border-b border-white/10 bg-[#07173d] px-6 py-10 md:px-10 md:py-12"
          >
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h2 className="text-[34px] font-light tracking-[-0.04em] text-white md:text-[56px]">
                {t.researchTitle}
              </h2>

              <a
                href={t.scholarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-white/15 px-4 py-2 text-sm text-white transition-colors hover:border-sky-400/40 hover:text-sky-300"
              >
                {t.scholarButton}
              </a>
            </div>

            <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
              <div className="mb-3 text-xs uppercase tracking-[0.18em] text-slate-400 md:text-sm">
                {t.scholarProfileTitle}
              </div>

              <div className="text-[24px] font-light text-white md:text-[32px]">
                Pasquale Imparato
              </div>

              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 md:text-base">
                {t.scholarProfileText}
              </p>

              <div className="mt-5">
                <a
                  href={t.scholarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full bg-sky-400 px-4 py-2 text-sm font-medium text-slate-950 transition-colors hover:bg-sky-300"
                >
                  {t.scholarButton}
                </a>
              </div>
            </div>

            <div className="space-y-4">
              {researchItems.map((item, index) => (
                <a
                  key={`${item.title}-${index}`}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-sky-400/30 md:p-6"
                >
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-400 md:text-sm">
                    {item.year} • {item.venue}
                  </div>

                  <div className="mt-3 text-[24px] font-light leading-tight tracking-[-0.03em] text-white md:text-[34px]">
                    {item.title}
                  </div>

                  {item.note && (
                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-300 md:text-base">
                      {item.note[lang]}
                    </p>
                  )}

                  <div className="mt-4 max-w-full overflow-x-auto rounded-xl border border-white/10 bg-[#081331]/40 p-3 text-slate-300 md:max-w-3xl md:p-4">
                    <div className="min-w-max text-[13px] leading-relaxed md:text-[15px]">
                      <TeX math={item.latex} settings={{ throwOnError: false }} />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.section>
        ),
      },
    ],
    [lang, currentOracleQuery, executedCertCategory, t]
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#06153a] text-white">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.10),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(245,158,11,0.08),transparent_24%)]" />

      <main className="relative mx-auto max-w-6xl space-y-0 px-6 py-6 md:px-8 md:py-8">
        <header className="overflow-hidden rounded-t-[28px] border border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-6 border-b border-white/10 px-5 py-4">
            <div className="flex shrink-0 items-center gap-3">
              <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/40 bg-slate-950/80">
                <img
                  src="/Avatar.png"
                  alt="Pasquale Imparato avatar"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="text-xs leading-tight text-slate-200">
                <Link
                  href={`/contacts?lang=${lang}`}
                  className="mb-1 inline-flex items-center rounded-full border border-sky-400/30 bg-sky-400/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-sky-300 transition-colors hover:border-sky-300/60 hover:text-sky-200"
                >
                  {lang === 'it' ? 'Contatti' : 'Contacts'}
                </Link>

                <div className="font-semibold">Pasquale</div>
                <div className="text-slate-400">Imparato</div>
              </div>
            </div>

            <div className="hidden flex-1 grid-cols-3 gap-4 px-4 md:grid">
              {sections.map((section) => {
                const done = completedSteps[section.id];

                return (
                  <button
                    key={section.id}
                    onClick={() => toggleStep(section.id)}
                    className="text-left"
                    type="button"
                  >
                    <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.18em]">
                      <span className={done ? 'text-white' : 'text-slate-400'}>
                        {section.label}
                      </span>
                      <span
                        className={done ? 'text-green-400' : 'text-slate-500'}
                      >
                        {done ? '100%' : '0%'}
                      </span>
                    </div>

                    <div className="relative h-[10px] overflow-hidden rounded-full border border-white/10 bg-white/10">
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full bg-green-500"
                        initial={false}
                        animate={{ width: done ? '100%' : '0%' }}
                        transition={{ duration: 0.45, ease: 'easeInOut' }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex shrink-0 gap-2">
              <Link
                href="/?lang=it"
                className={`rounded-full px-3 py-1 text-xs transition-colors ${
                  lang === 'it'
                    ? 'bg-sky-400 text-slate-950'
                    : 'bg-white/10 text-white'
                }`}
              >
                ITA
              </Link>
              <Link
                href="/?lang=en"
                className={`rounded-full px-3 py-1 text-xs transition-colors ${
                  lang === 'en'
                    ? 'bg-sky-400 text-slate-950'
                    : 'bg-white/10 text-white'
                }`}
              >
                ENG
              </Link>
            </div>
          </div>

          <div className="space-y-3 border-b border-white/10 px-5 py-4 md:hidden">
            {sections.map((section) => {
              const done = completedSteps[section.id];

              return (
                <button
                  key={section.id}
                  onClick={() => toggleStep(section.id)}
                  className="block w-full text-left"
                  type="button"
                >
                  <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-[0.18em]">
                    <span className={done ? 'text-white' : 'text-slate-400'}>
                      {section.label}
                    </span>
                    <span className={done ? 'text-green-400' : 'text-slate-500'}>
                      {done ? '100%' : '0%'}
                    </span>
                  </div>

                  <div className="relative h-[10px] overflow-hidden rounded-full border border-white/10 bg-white/10">
                    <motion.div
                      className="absolute inset-y-0 left-0 rounded-full bg-green-500"
                      initial={false}
                      animate={{ width: done ? '100%' : '0%' }}
                      transition={{ duration: 0.45, ease: 'easeInOut' }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          <section className="border-b border-white/10 px-6 py-10 md:px-10 md:py-14">
            <div className="space-y-8">
              <div className="w-full overflow-hidden">
                <div className="flex w-full flex-wrap items-baseline gap-x-2 gap-y-1 font-mono tracking-tight md:gap-x-3">
                  <span className="shrink-0 text-[18px] leading-none text-slate-400 sm:text-[22px] md:text-[32px] lg:text-[40px]">
                    {`{`}
                  </span>

                  <span className="shrink-0 text-[20px] font-semibold leading-none text-sky-400 sm:text-[24px] md:text-[32px] lg:text-[40px]">
                    "MY_JOB_TITLE"
                  </span>

                  <span className="shrink-0 text-[18px] leading-none text-slate-300 sm:text-[22px] md:text-[32px] lg:text-[40px]">
                    :
                  </span>

                  <div className="min-w-0 flex-[1_1_100%] md:flex-[1_1_auto]">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={`${lang}-${roleIndex}`}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.35 }}
                        className="block max-w-full break-words text-[18px] leading-tight text-amber-400 sm:text-[22px] md:text-[32px] lg:text-[40px]"
                      >
                        "{rotatingRoles[lang][roleIndex]}"
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  <span className="shrink-0 text-[18px] leading-none text-slate-400 sm:text-[22px] md:text-[32px] lg:text-[40px]">
                    {`}`}
                  </span>
                </div>
              </div>

              <div className="text-[15px] uppercase tracking-wide text-white/95 sm:text-[16px] md:text-[22px]">
                {t.roleLine}
              </div>

              <div className="w-full text-center font-mono text-sm leading-relaxed tracking-tight text-slate-400 md:text-left md:text-[15px]">
                {t.heroText}
              </div>

              <a
                href="https://www.dropbox.com/scl/fi/t90mz5monwx5eqz074nwo/Pasquale-Imparato-CV.pdf?rlkey=ulyg9v0iigtf60zfyfr034ccy&st=p75sb1qq&dl=0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex bg-amber-600 px-5 py-3 text-sm font-medium text-slate-950 transition-colors hover:bg-amber-500"
              >
                {t.heroButton}
              </a>
            </div>
          </section>
        </header>

        <AnimatePresence>
          {sections.map(
            (section) =>
              completedSteps[section.id] && (
                <div key={section.id}>{section.content}</div>
              )
          )}
        </AnimatePresence>

        <footer className="rounded-b-[28px] border-x border-b border-white/10 bg-[#03102b] px-6 py-8 md:px-10 md:py-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="space-y-3">
              <div className="text-lg font-light tracking-[-0.03em] text-white md:text-xl">
                Pasquale Imparato
              </div>

              <p className="text-xs text-slate-500 md:text-sm">
                © {currentYear} Pasquale Imparato. {t.footer.rights}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 text-sm sm:grid-cols-2 md:gap-10">
              <div>
                <div className="mb-3 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  {t.footer.navigation}
                </div>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => openSingleSection('Experience')}
                    className="block text-slate-300 transition-colors hover:text-sky-300"
                  >
                    {t.stepLabels.Experience}
                  </button>

                  <button
                    type="button"
                    onClick={() => openSingleSection('CertificationsSkills')}
                    className="block text-slate-300 transition-colors hover:text-sky-300"
                  >
                    {t.stepLabels.CertificationsSkills}
                  </button>

                  <button
                    type="button"
                    onClick={() => openSingleSection('ResearchPublication')}
                    className="block text-slate-300 transition-colors hover:text-sky-300"
                  >
                    {t.stepLabels.ResearchPublication}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                      })
                    }
                    className="block text-slate-300 transition-colors hover:text-sky-300"
                  >
                    {t.footer.top}
                  </button>
                </div>
              </div>

              <div>
                <div className="mb-3 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  {t.footer.contacts}
                </div>

                <div className="space-y-2">
                  <Link
                    href={`/contacts?lang=${lang}`}
                    className="block text-slate-300 transition-colors hover:text-sky-300"
                  >
                    {t.footer.contactPage}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
