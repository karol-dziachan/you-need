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

INSERT INTO SERVICE (name_en, name_pl, branch_id) VALUES
-- Beauty and Hairdressing Services
('Facial Treatments', 'Zabiegi na twarz', 2),
('Waxing', 'Depilacja woskiem', 2),
('Eyebrow and Lash Henna', 'Henna brwi i rzęs', 2),
('Facial Massage', 'Masaż twarzy', 2),

(E'Women\'s Haircut', 'Strzyżenie damskie', 3),
(E'Men\'s Haircut', 'Strzyżenie męskie', 3),
('Hair Coloring', 'Koloryzacja włosów', 3),
('Keratin Hair Straightening', 'Keratynowe prostowanie', 3),

('Relaxing Massage', 'Masaż relaksacyjny', 4),
('Finnish Sauna', 'Sauna fińska', 4),
('Floating', 'Floating', 4),
('Aromatherapy Treatments', 'Zabiegi aromaterapeutyczne', 4),

('Manicure', 'Manicure hybrydowy', 5),
('Pedicure', 'Pedicure klasyczny', 5),
('Nail Extensions', 'Przedłużanie paznokci żelem', 5),
('Nail Reconstruction', 'Rekonstrukcja paznokci', 5),

-- Construction and Renovation Services
('Interior Design', 'Projektowanie wnętrz', 7),
('3D Visualizations', 'Wizualizacje 3D', 7),
('Color Consultation', 'Doradztwo kolorystyczne', 7),
('Custom Furniture Design', 'Projektowanie mebli na wymiar', 7),

('Wall Painting', 'Malowanie ścian', 8),
('Wallpapering', 'Tapetowanie', 8),
('Plastering', 'Kładzenie gładzi', 8),
('Flooring Installation', 'Układanie paneli', 8),

('Electrical Installations', 'Instalacje elektryczne', 9),
('Plumbing Services', 'Usługi hydrauliczne', 9),
('Lighting Installation', 'Instalacja oświetlenia', 9),
('Bathroom Fixture Installation', 'Montaż armatury łazienkowej', 9),

('House Building', 'Budowa domów', 10),
('Home Expansion', 'Rozbudowa domów', 10),
('Renovation of Houses', 'Remonty domów', 10),
('Construction Site Management', 'Zarządzanie placem budowy', 10),

-- Automotive Services
('Oil Change', 'Serwis olejowy', 12),
('Brake Pads Replacement', 'Wymiana klocków hamulcowych', 12),
('Computer Diagnostics', 'Diagnostyka komputerowa', 12),
('Suspension Repair', 'Naprawa zawieszenia', 12),

('Vehicle Inspection', 'Przegląd techniczny', 13),
('Emission Test', 'Badanie emisji spalin', 13),
('Brake System Check', 'Kontrola układu hamulcowego', 13),
('Wheel Alignment', 'Sprawdzenie geometrii kół', 13),

('Hand Car Wash', 'Mycie ręczne', 14),
('Car Waxing', 'Woskowanie karoserii', 14),
('Upholstery Cleaning', 'Pranie tapicerki', 14),
('Headlight Polishing', 'Polerowanie reflektorów', 14),

('Tire Change', 'Wymiana opon', 15),
('Wheel Balancing', 'Wyważanie kół', 15),
('Puncture Repair', 'Naprawa przebitej opony', 15),
('Tire Storage', 'Sezonowa przechowalnia opon', 15),

-- Home and Garden Services
('House Cleaning', 'Sprzątanie mieszkań', 17),
('Carpet Cleaning', 'Czyszczenie dywanów', 17),
('Window Washing', 'Mycie okien', 17),
('Disinfection Services', 'Dezynfekcja pomieszczeń', 17),

('Lawn Mowing', 'Koszenie trawy', 18),
('Tree and Shrub Pruning', 'Przycinanie drzew i krzewów', 18),
('Planting Flowers', 'Sadzenie roślin', 18),
('Irrigation Systems', 'Nawadnianie ogrodu', 18),

('Furniture Assembly', 'Montaż mebli', 19),
('Lock Replacement', 'Wymiana zamków', 19),
('Minor Repairs', 'Naprawa drobnych usterek', 19),
('Shelf Installation', 'Instalacja półek', 19),

('Home Staging', 'Stylizacja wnętrz', 20),
('Interior Styling', 'Stylizacja wnętrz', 20),
('Personal Shopping for Home', 'Personal shopping wnętrzarski', 20),
('Lighting Design', 'Projektowanie oświetlenia', 20),

-- Freelance Creative Services
('Blog Writing', 'Pisanie artykułów blogowych', 22),
('Advertising Copywriting', 'Tworzenie tekstów reklamowych', 22),
('Product Descriptions', 'Opisy produktów', 22),
('Content Editing', 'Redagowanie treści', 22),

('Logo Design', 'Projektowanie logo', 23),
('Business Cards Design', 'Projektowanie wizytówek', 23),
('Social Media Graphics', 'Obrazki do mediów społecznościowych', 23),
('Photo Retouching', 'Retusz zdjęć', 23),

('Portrait Sessions', 'Sesje portretowe', 24),
('Product Photography', 'Fotografia produktowa', 24),
('Wedding Photography', 'Reportaż ślubny', 24),
('Business Photography', 'Zdjęcia biznesowe', 24),

('Video Editing', 'Montaż filmów', 25),
('Animation', 'Tworzenie animacji', 25),
('Color Grading', 'Korekta kolorów', 25),
('Special Effects', 'Dodawanie efektów specjalnych', 25),

('Profile Management', 'Zarządzanie profilem', 26),
('Social Media Content Creation', 'Tworzenie treści do mediów społecznościowych', 26),
('Comment Moderation', 'Moderacja komentarzy', 26),
('Statistical Analysis', 'Analiza statystyk', 26),

-- Personal Assistance Services
('Email Management', 'Obsługa e-maili', 28),
('Data Entry', 'Wprowadzanie danych', 28),
('Meeting Scheduling', 'Rezerwacja spotkań', 28),
('Calendar Management', 'Zarządzanie kalendarzem', 28),

('CV Writing', 'Pisanie CV', 29),
('Cover Letter Writing', 'Pisanie listu motywacyjnego', 29),
('LinkedIn Profile Optimization', 'Optymalizacja profilu LinkedIn', 29),
('CV Editing', 'Korekta CV', 29),

('Trip Planning', 'Planowanie podróży', 30),
('Hotel and Flight Booking', 'Rezerwacja hoteli i lotów', 30),
('Attractions Search', 'Wyszukiwanie atrakcji', 30),
('Itinerary Creation', 'Tworzenie planu podróży', 30),

('Personal Shopping', 'Zakupy odzieżowe', 31),
('Gift Selection', 'Wybór prezentów', 31),
('Fashion Consulting', 'Konsultacje modowe', 31),
('Styling for Special Occasions', 'Stylizacje na specjalne okazje', 31),

('Data Entry Services', 'Usługi wprowadzania danych', 32),
('File Organization', 'Organizacja plików', 32),
('Spreadsheet Management', 'Zarządzanie arkuszami kalkulacyjnymi', 32),
('Document Editing', 'Edytowanie dokumentów', 32),

-- Handmade and Craft Services
('Custom Jewelry Creation', 'Tworzenie biżuterii na zamówienie', 34),
('Jewelry Engraving', 'Grawerowanie biżuterii', 34),
('Jewelry Repair', 'Naprawa biżuterii', 34),
('Ring Design', 'Projektowanie pierścionków', 34),

('Tailoring', 'Szycie na miarę', 35),
('Clothing Alterations', 'Przeróbki odzieżowe', 35),
('Clothing Design', 'Projektowanie odzieży', 35),
('Clothing Repairs', 'Naprawy odzieżowe', 35),

('Personalized Gifts', 'Personalizowane prezenty', 36),
('Customized Wooden Gifts', 'Personalizowane drewniane prezenty', 36),
('Custom Engraving', 'Personalizowane grawerowanie', 36),
('Canvas Prints', 'Druk na płótnie', 36),

('Woodworking', 'Stolarstwo', 37),
('Furniture Restoration', 'Renowacja mebli', 37),
('Wooden Decorations', 'Drewniane dekoracje', 37),
('Wooden Toy Making', 'Tworzenie zabawek drewnianych', 37),

('Candle Making', 'Tworzenie świec', 38),
('Scented Candles', 'Świece zapachowe', 38),
('Wax Figure Creation', 'Tworzenie woskowych figur', 38),
('Candle Decoration', 'Dekorowanie świec', 38);

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
