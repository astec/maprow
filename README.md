# Basic dev environment setup

## Windows

### Java:

Check your current **Java** version by typing `java -version` in the **Windows Command Prompt**. If there is no **Java** on your computer, download it from https://www.oracle.com/java/technologies/downloads.
>**NOTE**: **GeoServer** requires **Java 11**.


### IntelliJ IDEA:

Download **IntelliJ IDEA** from https://www.jetbrains.com/idea/download/#section=windows.


### PostgreSQL and PostGIS extension:

- Installing **PostgreSQL**:
	- Download **PostgreSQL** from https://www.enterprisedb.com/downloads/postgres-postgresql-downloads.
	- In installation make sure that **PostgreSQL Server**, **Stack Builder** and **Command Line Tools** are selected.
	- Proceed with installation.
	- To check if **PostgreSQL** was successfully installed access the **Windows Command Prompt** and enter the following command: `psql --version`.

- Installing **PostGIS** extension:
	- Open **Stack Builder** application.
	- Select **PostgreSQL server** and click Next.
	- Expand spatial extensions and choose the latest **PostGIS** version.
	- Proceed with installation.

- Enabling **PostGIS** extension:
	- Connect to existing database: `\c database-name` or create new one: `CREATE DATABASE database-name`.
	- Type the following command: `CREATE EXTENSION postgis;`


### GeoServer:

- To download **GeoServer** binaries go to https://geoserver.org/release/stable/ and click on **Platform Independent Library**. The installation should start.

- Create new folder named **GeoServer** and extract downloaded files there.
>**NOTE**: suggested directory: `C:\Program Files\`
- To check if everything was successfully installed go to `GeoServer\bin` and execute `startup.bat`.

- Then, in your web browser, navigate to  http://localhost:8080/geoserver. You should see **GeoServer** website.

### Angular:

- Installing **Node.js**:
	- Go to https://nodejs.org/en/download/ and download the latest **Node.js Windows Installer**. Make sure that the **npm package manager** is part of installation bundle.
	- Type `node -v` in the **Windows Command Prompt** to check if **Node.js** was installed.
	-  To verify the **NPM** version use the following command:`npm -v`.

- Installing **Angular CLI**:
	- Access the **Windows Command Prompt** and enter the following command:
`npm install -g @angular/cli`
	- Once all packages have been added, verify the installed version: `ng version`

## Linux

### Java:

Type `java -version` to check if **Java** is installed on your machine. If there is no **Java** on your computer, download desired **Java** version using package manager.

>**NOTE**: **GeoServer** requires  **Java 11**

### IntelliJ IDEA:

- Download **IntelliJ IDEA** tarball from https://www.jetbrains.com/idea/download/#section=linux.

- Extract the tarball to desired directory using following command:
`tar -xf idea.tar.gz -C /opt`

	>**NOTE**: A suggested location would be /opt.
	
	>**NOTE**: Do not extract the tarball over an existing installation to avoid conflicts. Always extract it to a clean directory.
	
- Log in as root and change file owner:
	```bash
	chown -R user /opt/idea
	```
	
- Execute the `idea.sh script` from the extracted directory to run **IntelliJ IDEA**.

- Possible complications with displaying the window can be resolved with:
	```bash
	echo "export _JAVA_AWT_WM_NONREPARENTING=1" >> ~/.profile
	```
	
### PostgreSQL and PostGIS extension:

- Download **PostgreSQL** using package manager. Type `psql --version` to check if **PostgreSQL** was installed successfully.

	> E.g. Ubuntu: `apt install postgresql`

- Download **PostGIS** using package manager. Type `psql --version` to check if **PostgreSQL** was installed successfully.

	> **NOTE**: download version corresponding to your **PostgreSQL** version.

	> E.g. Ubuntu: `apt install postgis postgresql-13-postgis-3`

- Switch to the **PostgreSQL** user: `su -l postgres`.

- Initialize database cluster: `initdb -D /var/lib/postgres/data`.

- To create new user: `createuser --interactive`.

- To create new database: `createdb myDatabaseName`.

- To access database: `psql -d myDatabaseName`.

- To add **PostGIS** extension:  `CREATE EXTENSION postgis;`.

### GeoServer:

- Download **GeoServer** binaries from https://geoserver.org/download/.

- Unzip the archive to desired directory using following command:
`unzip geoserver-2.21.0-bin.zip -d geoserver`
	>**NOTE**: A suggested location would be /usr/share/geoserver.
	
- Add an environment variable:
	```bash
	echo "export GEOSERVER_HOME=/usr/share/geoserver" >> ~/.profile
	```
- Log in as root and change file owner:
	```bash
	chown -R user /usr/share/geoserver
	```
- Start **GeoServer** by executing `startup.sh` script from `geoserver/bin`.

- In a web browser, navigate to `http://localhost:8080/geoserver` to check if **GeoServer** was successfully installed.

### Angular:

- Install **NodeJS**
Download **NodeJS** using package manager. Type `node -v` to check if **NodeJS** was installed successfully.

> E.g. Ubuntu: `apt install nodejs`

- Install **Node Package Manager**
Download **NPM**  using package manager. Type `npm -v` to check if **NPM** was installed successfully. It is required for installation of **Angular CLI**.

> E.g. Ubuntu: `apt install npm -y`

- Install **Angular CLI** using **NPM**
Log in as root and run following command: `npm install -g @angular/cli`
Run `ng version` to make sure installation was correct.


# How to run the application

## Clone the repository

- Open **Git Bash**.
- Navigate to desired directory.
- Type `git clone https://github.com/astec/maprow.git` to clone the repository.

## Spring

### Change the postgres password

- Open `maprow-back/src/main/resources/application.properties` and change the password:
`spring.datasource.password={password}`

### Run the application
- Open *spring* folder in **IntelliJ** and run main method.
- Open your web browser and connect to http://localhost:8081/person. You should receive a table in *json* format that contains two people.
- To get person by name enter http://localhost:8081/person/name/{name}
- To get person by id enter http://localhost:8081/person/id/{id}

## GeoServer

### Change the CORS policy
- Navigate to **GeoServer** installation folder.
- Edit `webapps/geoserver/WEB-INF/web.xml`.
	- Uncomment **CORS** filter for **Jetty**.
	- Uncomment **CORS** filter-mapping. 
	
### Run the application

- Start **GeoServer** via scripts in bin root folder or by starting service by yourself.
	>E.g. Ubuntu#: 
	`systemctl enable geoserver`
	`systemctl start geoserver`
- Open your web browser and connect to http://localhost:8080/geoserver. If installation from previous steps was correct, you should see **Welcome page**.    
	>**NOTE**: default username nad password: admin; geoserver

## Angular

Change directory to *maprow-front*

### Install dependencies

- Run `npm i` to download required node modules.

### Run the application

- Run `ng serve` to build and run the application.
- Open your web browser and connect to http://localhost:4200. You should see two records from database and website with map, legend, navigation bar and highlighted states of USA.


# How to add / replace routes on the map

## Generate geojson
- Go to http://geojson.io webpage. Draw routes using "Draw LineString (I)" option.

## Replace routes on the map
- Save the data as routes.geojson and place it at maprow\maprow-front\src\assets\data\routes.geojson.

## Or: add to currently existing routes
- Copy content of "features" tag in result json and paste it into maprow\maprow-front\src\assets\data\routes.geojson.

# Adding a popup to bike route
Bike_routes.service.ts file contains makeBikeRoutes function. It's responsible for adding a route to the map by calling addTo function, but also adds a popup with road's name (feature.properties.name) to the map in onEachFeature segment.