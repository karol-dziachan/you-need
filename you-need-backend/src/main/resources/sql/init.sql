CREATE TABLE IF NOT EXISTS COMPANY (
    id integer primary key generated always as identity,
    company_name varchar(255) not null,
    nip varchar(10) not null unique,
    regon varchar(14) not null unique,
    street varchar(255),
    building varchar(255) not null,
    apartment varchar(255),
    city varchar(255) not null,
    state varchar(255) not null,
    country varchar(255) not null,
    postal_code varchar(20) not null,
    phone_number varchar(20) not null,
    email varchar(255) not null
);

CREATE TABLE IF NOT EXISTS EMPLOYEE (
    id integer primary key generated always as identity,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    email varchar(255) not null unique,
    password varchar(255) not null,
    role varchar(50) not null,
    company_id integer references COMPANY not null
);

create index IX_EMPLOYEE_COMPANY_ID ON EMPLOYEE(company_id);


CREATE TABLE IF NOT EXISTS BRANCH (
    id integer primary key generated always as identity,
    name_en varchar(255) not null,
    name_pl varchar(255) not null,
    parent_id integer references BRANCH(id)
);

INSERT INTO branch (name_en, name_pl, parent_id) VALUES

-- Financial Services
('Financial Services', 'Usługi finansowe', NULL),
('Banking', 'Bankowość', 1),
('Insurance', 'Ubezpieczenia', 1),
('Financial Consulting', 'Doradztwo finansowe', 1),
('Leasing', 'Leasing', 1),
('Debt Collection', 'Windykacja', 1),

-- Legal and Administrative Services
('Legal and Administrative Services', 'Usługi prawne i administracyjne', NULL),
('Law Firms', 'Kancelarie prawne', 7),
('Notary Services', 'Notariusze', 7),
('Tax Advisory', 'Doradztwo podatkowe', 7),
('Accounting Services', 'Usługi księgowe', 7),
('Translation Services', 'Tłumaczenia', 7),

-- IT and Telecommunication Services
('IT and Telecommunication Services', 'Usługi IT i telekomunikacyjne', NULL),
('Software Development', 'Programowanie', 13),
('Cybersecurity', 'Cyberbezpieczeństwo', 13),
('Hosting and Cloud', 'Hosting i chmura', 13),
('Computer Repair', 'Serwis komputerowy', 13),
('Telecommunication', 'Telekomunikacja', 13),

-- Medical and Health Services
('Medical and Health Services', 'Usługi medyczne i zdrowotne', NULL),
('Hospitals and Clinics', 'Szpitale i przychodnie', 19),
('Pharmacies', 'Apteki', 19),
('Physiotherapy', 'Fizjoterapia', 19),
('Dentistry', 'Dentystyka', 19),
('Aesthetic Medicine', 'Medycyna estetyczna', 19),

-- Educational Services
('Educational Services', 'Usługi edukacyjne', NULL),
('Schools and Universities', 'Szkoły i uczelnie', 25),
('Courses and Training', 'Kursy i szkolenia', 25),
('Tutoring', 'Korepetycje', 25),
('E-learning', 'E-learning', 25),

-- Beauty and Hairdressing Services
('Beauty and Hairdressing Services', 'Usługi kosmetyczne i fryzjerskie', NULL),
('Beauty Salons', 'Salony kosmetyczne', 30),
('Hairdressers', 'Fryzjerzy', 30),
('SPA and Wellness', 'SPA i wellness', 30),
('Manicure and Pedicure', 'Manicure i pedicure', 30),

-- Construction and Renovation Services
('Construction and Renovation Services', 'Usługi budowlane i remontowe', NULL),
('Architecture and Interior Design', 'Architektura i projektowanie wnętrz', 35),
('Renovations and Finishing', 'Remonty i wykończenia', 35),
('Electrical and Plumbing Installations', 'Instalacje elektryczne i hydrauliczne', 35),
('House Construction', 'Budowa domów', 35),

-- Automotive Services
('Automotive Services', 'Usługi motoryzacyjne', NULL),
('Vehicle Mechanics', 'Mechanika pojazdowa', 40),
('Vehicle Inspection Stations', 'Stacje kontroli pojazdów', 40),
('Car Washes', 'Myjnie samochodowe', 40),
('Tire Service', 'Wulkanizacja', 40),

-- Home and Garden Services
('Home and Garden Services', 'Usługi dla domu i ogrodu', NULL),
('Cleaning Services', 'Sprzątanie', 45),
('Gardening Services', 'Ogrodnictwo', 45),
('Handyman', 'Złota rączka', 45),
('Interior Design', 'Projektowanie wnętrz', 45);


CREATE TABLE IF NOT EXISTS SERVICE (
    id integer primary key generated always as identity,
    name_en varchar(255) not null,
    name_pl varchar(255) not null,
    branch_id integer references BRANCH(id) not null
);

CREATE TABLE IF NOT EXISTS COMPANY_BRANCH (
    company_id integer references COMPANY(id) not null,
    branch_id integer references BRANCH(id) not null,
    description varchar,
    primary key (company_id, branch_id)
);

CREATE TABLE IF NOT EXISTS OFFER (
    id integer primary key generated always as identity,
    name varchar not null,
    price integer not null,
    perHour boolean not null default false,
    active bool not null default true,
    description varchar(2000),
    ownToolsUsagePrice integer,
    company_id integer,
    branch_id integer,
    foreign key (company_id, branch_id) references COMPANY_BRANCH(company_id, branch_id),
    unique (company_id, branch_id)
);
