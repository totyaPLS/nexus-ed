create table system_user (
    uid varchar(10) primary key,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    password varchar(255) not null,
    phone varchar(50),
    public_email varchar(100),
    school_email varchar(100) unique,
    school varchar(255),
    residence varchar(255),
    birthplace varchar(255),
    birthdate date,
    is_admin bool not null,
    is_student bool not null,
    is_teacher bool not null,
    is_form_teacher bool not null,
    online bool not null
);

create table class (
    id serial primary key not null,
    class_level integer not null,
    letter char(1) not null
);

create table subject (
    id serial primary key not null,
    name varchar(200) not null,
    class_difficulty integer not null
);

create table student (
    id varchar(10) primary key references system_user(uid) not null,
    class_id integer references class(id) not null unique
);

create table teacher (
    id varchar(10) primary key references system_user(uid) not null
);

create table form_teacher (
    id varchar(10) primary key references system_user(uid) not null,
    class_id integer references class(id) not null unique
);

create table class_teaching (
    id varchar(10) references teacher(id) not null,
    class_id integer references class(id) not null,
    PRIMARY KEY (id, class_id)
);

create table subject_teaching (
    id varchar(10) references teacher(id) not null,
    subject_id integer references subject(id) not null,
    PRIMARY KEY (id, subject_id)
);

create table announcement (
    id serial primary key not null,
    teacher_id varchar(10) references teacher(id) not null,
    subject_id integer references subject(id) not null,
    title varchar(255) not null,
    description text,
    published timestamp not null
);

create table task (
    id integer primary key references announcement(id) not null,
    deadline timestamp not null,
    status varchar(100) not null,
    type varchar(100) not null
);

create table comment (
    id serial primary key not null,
    person_id varchar(10) references system_user(uid) not null,
    task_id integer references task(id),
    announcement_id integer references announcement(id),
    text varchar(255) not null,
    published timestamp not null
);

create table grade (
    id serial primary key not null,
    student_id varchar(10) references student(id) not null,
    teacher_id varchar(10) references teacher(id) not null,
    grade smallint not null,
    weight double precision not null
);

create table timetable (
    id serial primary key not null,
    class_id integer references class(id) not null unique
);

create table lesson (
    id integer primary key not null,
    timetable_id integer references timetable(id) not null,
    subject_id integer references subject(id) not null,
    topic varchar(255),
    sequence smallint not null,
    start_time timestamp not null unique,
    end_time timestamp not null unique
);

create table absence (
    id serial primary key not null,
    student_id varchar(10) references student(id) not null,
    lesson_id integer references lesson(id) not null,
    status varchar(100) not null,
    modification_date timestamp not null
);

create table submittable_task (
    id integer primary key not null,
    student_id varchar(10) references student(id) not null,
    grade_id integer references grade(id),
    task_id integer references task(id) not null,
    graded timestamp not null,
    text text,
    submitted timestamp
);

create table file (
    id serial primary key not null,
    name varchar(255) not null unique,
    type varchar(10) not null,
    path varchar(255) not null unique,
    uploaded timestamp not null,
    byte_size integer not null
);

create table document (
    id integer primary key references file(id) not null,
    subject_id integer references subject(id) not null,
    class_id integer references class(id) not null
);

create table submittable_task_file (
    id integer primary key references file(id) not null,
    submittable_task integer references submittable_task(id) not null
);
