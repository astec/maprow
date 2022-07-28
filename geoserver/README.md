# How to run GeoServer

- Navigate to **GeoServer** folder installation.
- Edit `webapps/geoserver/WEB-INF/web.xml`.
	- Uncomment **CORS** filter for **Jetty**.
	- Uncomment **CORS** filter-mapping. 
- Start **GeoServer** via scripts in bin root folder or by starting service by yourself.
	>E.g. Ubuntu#: 
	`systemctl enable geoserver`
	`systemctl start geoserver`
- Open your web browser and connect to http://localhost:8080/geoserver. If installation from previous steps was correct, you should see **Welcome page**.    
	>**NOTE**: default username nad password: admin; geoserver
