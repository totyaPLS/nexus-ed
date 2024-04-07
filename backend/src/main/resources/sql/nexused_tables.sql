create table file (
	id serial primary key,
	name varchar(255) not null,
	type varchar(10) not null,
	path varchar(255) not null,
	uploaded timestamp not null,
	byte_size integer not null
);

create table subject (
	id serial primary key,
	name varchar(200) not null,
	class_difficulty integer not null
);

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
	role varchar(50),
	online boolean not null
);

create table class (
	id serial primary key,
	form_teacher_id varchar(10) references system_user on delete set null,
	class_level integer not null,
	letter char not null
);

create table document (
	file_id integer primary key references file on delete cascade,
	subject_id integer not null references subject,
	class_id integer not null references class
);

create table student (
	student_id varchar(10) primary key references system_user on delete cascade,
	class_id integer not null references class,
	parent_id varchar(10) references system_user on delete cascade
);

create table announcement (
	id serial primary key,
	teacher_id varchar(10) not null references system_user on delete cascade,
	subject_id integer not null references subject,
	title varchar(255) not null,
	description text,
	published timestamp not null
);

create table grade (
	id serial primary key,
	student_id varchar(10) not null references system_user on delete cascade,
	teacher_id varchar(10) not null references system_user on delete set null,
	grade integer not null,
	weight double precision not null
);

create table teaching (
    id serial primary key,
	teacher_id varchar(10) not null references system_user on delete cascade,
	subject_id integer not null references subject,
    class_id integer not null references class
);

create table task (
	announcement_id integer primary key references announcement on delete cascade,
	deadline timestamp not null,
	status varchar(100) not null,
	type varchar(100) not null
);

create table comment (
	id serial primary key,
	person_id varchar(10) not null references system_user on delete cascade,
	task_id integer references task on delete cascade,
	announcement_id integer references announcement on delete cascade,
	text varchar(255) not null,
	published timestamp not null
);

create table submittable_task (
	id serial primary key,
	student_id varchar(10) not null references system_user on delete cascade,
	grade_id integer references grade on delete set null,
	task_id integer not null references task on delete cascade,
	graded timestamp not null,
	text text,
	submitted timestamp
);

create table submittable_task_file (
	file_id integer primary key references file on delete cascade,
	submittable_task integer not null references submittable_task on delete cascade
);

create table lesson (
	id serial primary key,
	teaching_id integer not null references teaching on delete cascade,
	topic varchar(255),
	start_time timestamp with time zone,
	end_time timestamp with time zone,
    background_color varchar(255),
    border_color varchar(255),
    text_color varchar(255)
);

create table absence (
	id serial primary key,
	student_id varchar(10) not null references system_user on delete cascade,
	lesson_id integer not null references lesson on delete cascade,
	status varchar(100) not null,
	modification_date timestamp not null
);


