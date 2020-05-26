create database shield_db;

create table guilds(
    guildID varchar (255) not null primary key,
    guildOwnerID varchar (255) not null
);

create table config (
    guildID varchar (255) not null primary key,
    prefix varchar (10) default 's!',
    modLogID varchar (255)
);