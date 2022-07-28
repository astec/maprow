# Spring setup

## Change the postgres password

- Open `maprow-back/src/main/resources/application.properties` and change the password:
`spring.datasource.password={password}`

## Run the application
- Open this folder in IntelliJ and run main method.
- Open your web browser and connect to http://localhost:8081/person. You should receive a table in *json* format that contains two people.
- To get person by name enter http://localhost:8081/person/name/{name}
- To get person by id enter http://localhost:8081/person/id/{id}
