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
	form_teacher_id varchar(10) not null references system_user,
	class_level integer not null,
	letter char not null
);

create table document (
	id integer primary key references file,
	subject_id integer not null references subject,
	class_id integer not null references class
);

create table student (
	id varchar(10) primary key references system_user,
	class_id integer not null references class,
	parent_id varchar(10) references system_user
);

create table announcement (
	id serial primary key,
	teacher_id varchar(10) not null references system_user,
	subject_id integer not null references subject,
	title varchar(255) not null,
	description text,
	published timestamp not null
);

create table class_teaching (
	id varchar(10) not null references system_user,
	class_id integer not null references class,
    primary key (id, class_id)
);

create table grade (
	id serial primary key,
	student_id varchar(10) not null references system_user,
	teacher_id varchar(10) not null references system_user,
	grade smallint not null,
	weight double precision not null
);

create table subject_teaching (
	id varchar(10) not null references system_user,
	subject_id integer not null references subject,
    primary key (id, subject_id)
);

create table task (
	id integer primary key references announcement,
	deadline timestamp not null,
	status varchar(100) not null,
	type varchar(100) not null
);

create table comment (
	id serial primary key,
	person_id varchar(10) not null references system_user,
	task_id integer references task,
	announcement_id integer references announcement,
	text varchar(255) not null,
	published timestamp not null
);

create table submittable_task (
	id integer primary key,
	student_id varchar(10) not null references system_user,
	grade_id integer references grade,
	task_id integer not null references task,
	graded timestamp not null,
	text text,
	submitted timestamp
);

create table submittable_task_file (
	id integer primary key references file,
	submittable_task integer not null references submittable_task
);

create table timetable (
	id serial primary key,
	class_id integer not null unique references class
);

create table lesson (
	id serial primary key,
	timetable_id integer not null references timetable,
	subject_id integer not null references subject,
	topic varchar(255),
	sequence smallint not null,
	start_time timestamp not null unique,
	end_time timestamp not null unique
);

create table absence (
	id serial primary key,
	student_id varchar(10) not null references system_user,
	lesson_id integer not null references lesson,
	status varchar(100) not null,
	modification_date timestamp not null
);


