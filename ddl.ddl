create table piotr_business(

	id int(10) auto_increment,
	name varchar(200),
	description text,
	address_number varchar(200),
	address_street varchar(200), 
	address_city varchar(200),
	address_state varchar(200),
	address_zip varchar(200),
	address_country varchar(200),
	email varchar(200),
	phone varchar(200),
	status varchar(200),
	created_at timestamp not null default CURRENT_TIMESTAMP,
	updated_at timestamp not null default CURRENT_TIMESTAMP,
	primary key (id)

)engine=innodb;

insert into piotr_business(id) values(1);

create table piotr_user(

	id int(10) auto_increment,
	business_id int(10),
	username varchar(200),
	user_type varchar(200), -- admin,patient,doctor,attendant,su
	mobile varchar(200),
	password varchar(200),
	first_name varchar(200),
	last_name varchar(200),
	is_resetting_password boolean default 0,
	reset_password_code varchar(200),
	reset_password_time varchar(200),
	status varchar(200),
	created_at timestamp not null default CURRENT_TIMESTAMP,
	updated_at timestamp not null default CURRENT_TIMESTAMP,
	primary key(id),
	foreign key(business_id) references piotr_business(id) on update cascade on delete cascade

)engine=innodb;

insert into piotr_user(id,business_id,username,user_type,password,status) values(1,1,"su","su","su","active");

create table piotr_auth_token (

	id int(10) auto_increment,
	user_id int(10),
	auth_token varchar(200),
	payload_json text,
	status varchar(200),
	created_at timestamp not null default CURRENT_TIMESTAMP,
	updated_at timestamp not null default CURRENT_TIMESTAMP,
	primary key(id),
	foreign key(user_id) references piotr_user(id) on update cascade on delete cascade

)engine=innodb;
