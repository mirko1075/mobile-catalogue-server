# Project: Phones Catalogue - Server - APIRest



 **Application** name: mobile-catalogue-server

 **Version**: 1.0.0

 **Description**: Rest API - Postgres DB - Phone catalogue

 **Deploy URL**: https://mobile-catalogue.herokuapp.com/api/v1

**Docker image URL**: https://hub.docker.com/repository/docker/mirko1075/mobile-catalogue-server

 **Entry point**: "./src/app.js"

 **Environment**:

​		 Node: 16.5
 		Npm: 8.1



Environment variables:

PORT : 3000
DATABASE_URL = Database Postgres URI
jwtSecret = Secret for Heroku security
PG_USER = User with granted access to Database
PG_PASSWORD = PG_USER's password
PG_HOST = Database horsname or IP
PG_PORT = Postgres port (5432 default)
PG_DATABASE = mobile-catalogue
NODE_ENV = development (Set by heroku as prod)

### Installation:

Clone the repository

```
$git clone https://github.com/mirko1075/mobile-catalogue-server.git
$cd ./mobile-catalogue-server
$npm i

```

### Start application

```
$npm run start
```

#### Test application : jest

```
$npm run test
```

#### Run Docker image

```
$docker run --rm -p 3000:3000 mirko1075/mobile-catalogue-server
```



### Database:

Postgres: V. 14.0

#### Details:

Database: mobile-catalogue

DB Owner: postgres

Schema: public



#### Tables:

table name: phones

TABLESPACE: pg_default

Columns:

| Name         | Data type  | Length/Precision | Scale | Not NULL | Primary Key | Default       |
| ------------ | ---------- | ---------------- | ----- | -------- | ----------- | ------------- |
| id           | integer    |                  |       | TRUE     | TRUE        | phones_id_seq |
| phone_name   | VARYINGING | 500              |       |          | TRUE        |               |
| manufacturer | VARYINGING | 500              |       |          |             |               |
| description  | VARYINGING | 2000             |       |          |             |               |
| color        | VARYINGING | 50               |       |          |             |               |
| price        | NUMERIC    | 1000             | 2     |          |             |               |
| screen       | VARYINGING | 1000             |       |          |             |               |
| processor    | VARYINGING | 1000             |       |          |             |               |
| ram          | NUMERIC    |                  |       |          |             |               |
| file         | TEXT       |                  |       |          |             |               |
|              |            |                  |       |          |             |               |



#### CREATE TABLE SCRIPT



```
-- DROP TABLE IF EXISTS public.phones;

CREATE TABLE IF NOT EXISTS public.phones
(
    id integer NOT NULL DEFAULT nextval('phones_id_seq'::regclass),
    phone_name character varying(500) COLLATE pg_catalog."default" NOT NULL,
    manufacturer character varying(500) COLLATE pg_catalog."default",
    description character varying(2000) COLLATE pg_catalog."default",
    color character varying(50) COLLATE pg_catalog."default",
    price numeric(1000,2),
    image_file_name character varying(1000) COLLATE pg_catalog."default",
    screen character varying(1000) COLLATE pg_catalog."default",
    processor character varying(1000) COLLATE pg_catalog."default",
    ram numeric,
    file text COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.phones
    OWNER to postgres;
```



## API Reference

Online Documentation (updated): https://documenter.getpostman.com/view/14763811/UVRGEPov

## End-point: Get Phones

### Method: GET

>```
>http://localhost:3000/api/phones
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Get Phone by ID

### Method: GET

>```
>http://localhost:3000/api/v1/phones/22
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Add Phone

### Method: POST

>```
>http://localhost:3000/api/v1/phones
>```

### Body (**raw**)

```json
{
    "phone_name": "Galaxy S10",
    "manufacturer": "Samsung",
    "description": "Competitor of Iphone 12",
    "color": "white",
    "price": 1010,
    "screen": "180X24",
    "processor": "Procesor XMD",
    "ram": 450,
    "file":null
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Delete Phone

### Method: DELETE
>```
>http://localhost:3000/api/v1/phones/25
>```

⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: Edit Phone
### Method: PUT
>```
>http://localhost:3000/api/v1/phones/22
>```
### Body (**raw**)

```json
{
    "phone_name": "Galaxy S10 Pro Modified",
    "manufacturer": "Samsung",
    "description": "Competitor of Iphone 12",
    "color": "gold",
    "price": 1010,
    "screen": "180X24",
    "processor": "Procesor XMD",
    "ram": 450,
    "file": null
}
```



_________________________________________________
Powered By: [postman-to-markdown](https://github.com/bautistaj/postman-to-markdown/)
