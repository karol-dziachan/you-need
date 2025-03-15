create table COMPANY (
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

create table EMPLOYEE (
    id integer primary key generated always as identity,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    login varchar(255) not null unique,
    password varchar(255) not null,
    role varchar(50) not null,
    company_id integer references COMPANY not null
);

create index IX_EMPLOYEE_COMPANY_ID ON EMPLOYEE(company_id);