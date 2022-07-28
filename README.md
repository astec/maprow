# How to run the application

- Download required tools listed below.
- Run the Spring server
	>**NOTE**: Further instructions in spring README.
- Run the GeoServer
	>**NOTE**: Further instructions in geoserver README.
- Run the Angular server
	>**NOTE**: Further instructions in maprow-front README.

# Basic dev environment setup

## Windows

### Java:

Check your current **Java** version by typing `java -version` in the **Windows Command Prompt**. If there is no **Java** on your computer, download it from https://www.oracle.com/java/technologies/downloads.
>**NOTE**: **GeoServer** requires **Java 8** or **Java 11**.


### IntelliJ IDEA:

Download **IntelliJ IDEA** from https://www.jetbrains.com/idea/download/#section=windows.


### PostgreSQL and PostGIS extension:

- Installing **PostgreSQL**:
	- Download **PostgreSQL** from https://www.enterprisedb.com/downloads/postgres-postgresql-downloads.
	- To check if **PostgreSQL** was successfully installed access the **Windows Command Prompt** and enter the following command: `psql --version`.

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

- Creating **Angular** project:
	- To create new project type: `ng new project-name`.
	- Access your project’s root folder from the **Windows Command Prompt** and enter the following command: `ng serve`
The system will generate the environment for your **Angular** application.
	- Use your web browser to access the **Angular** local development server: http://localhost:4200/.
- Adding **Leaflet** library:
	- Access the **Windows Command Prompt**, go to project's root folder and enter the following command: `npm install leaflet`.

## Linux

### Java:

Type `java -version` to check if **Java** is installed on your machine. If there is no **Java** on your computer, download desired **Java** version using package manager.

>**NOTE**: **GeoServer** requires **Java 8** or **Java 11**

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

- Add **Leaflet** library
Access project's root folder and enter the following command: `npm install leaflet`.

### Spring Boot:

- To create **IntelliJ** project with **Spring Boot** go to https://start.spring.io/.

- Selecting project options:
	- **Project**: Maven Project
	- **Language**: Java
	- **Spring Boot**: the latest version
	- **Project Metadata**: any
	- **Packaging**: Jar
	- **Java**: your current version

- Selecting dependencies:
	- **Spring Web**
	- **Spring Data JPA**
	- **PostgreSQL Driver**
>**NOTE**: optionally **Lombok**
