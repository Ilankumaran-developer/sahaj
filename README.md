# sahaj
A repo for sahaj interview



# Points to be noted before starting app


* Once you clone this repository, Install node modules by executing "npm install"

* Please use "node server" command to start the app

* To debug application, You can use either test cases or  CURL

* If you want to debug the application through test cases, please use command "npm test". Execute the command in root directory of app so that it will run set of test cases

* If you prefer to use CURLs, Kindly take a look at the following sample CURLs

please find the following sample  POSTman Requests or use "npm test" to validate 


##  Sample CURLs

### Creating Hotel 1

curl -X POST \
  http://localhost:8000/v1/hotel \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: c286ead7-2d29-4f29-93e4-5aa4887faab5' \
  -H 'cache-control: no-cache' \
  -d '{
        "number_of_floors": 2,
        "number_of_main_corridors": 1,
        "number_of_sub_corridors": 2
    }'


### Processing Sensor Input for the created Hotel 1 - let the sensor input is to notify there is a movement in Sub corridor 2 in floor 1

curl -X POST \
  http://localhost:8000/v1/hotel/sensor \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 28f9de48-2900-499c-a720-709a16ed0cd8' \
  -H 'cache-control: no-cache' \
  -d '{
        "movement": true,
        "location": {
            "floor": "floor_1",
            "corridor": "sub_corridor_2"
        }
    }'


### Processing Sensor Input for the created Hotel 1 - let the sensor input is to notify there is no movement in Sub corridor 2 in floor 1

curl -X POST \
  http://localhost:8000/v1/hotel/sensor \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 28f9de48-2900-499c-a720-709a16ed0cd8' \
  -H 'cache-control: no-cache' \
  -d '{
        "movement": false,
        "location": {
            "floor": "floor_1",
            "corridor": "sub_corridor_2"
        }
    }'





### Creating Hotel 2

curl -X POST \
  http://localhost:8000/v1/hotel \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 96a61f63-a562-4f14-9e5a-d10341132ea3' \
  -H 'cache-control: no-cache' \
  -d '{
        "number_of_floors": 1,
        "number_of_main_corridors": 1,
        "number_of_sub_corridors": 5
    }'


### Processing Sensor Input for the created Hotel 1 - let the sensor input is to notify there is a movement in Sub corridor 1 in floor 1

curl -X POST \
  http://localhost:8000/v1/hotel/sensor \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: dc7b549a-9028-4b0f-a197-18b1e313a522' \
  -H 'cache-control: no-cache' \
  -d '{
        "movement": true,
        "location":{
            "floor":"floor_1",
            "corridor":"sub_corridor_1"
        }
    }'


### Processing Sensor Input for the created Hotel 1 - let the sensor input is to notify there is a movement in Sub corridor 2 in floor 1

curl -X POST \
  http://localhost:8000/v1/hotel/sensor \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: dc7b549a-9028-4b0f-a197-18b1e313a522' \
  -H 'cache-control: no-cache' \
  -d '{
        "movement": true,
        "location":{
            "floor":"floor_1",
            "corridor":"sub_corridor_2"
        }
    }'


### Processing Sensor Input for the created Hotel 1 - let the sensor input is to notify there is a movement in Sub corridor 3 in floor 1

curl -X POST \
  http://localhost:8000/v1/hotel/sensor \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: dc7b549a-9028-4b0f-a197-18b1e313a522' \
  -H 'cache-control: no-cache' \
  -d '{
        "movement": true,
        "location":{
            "floor":"floor_1",
            "corridor":"sub_corridor_3"
        }
    }'


### Processing Sensor Input for the created Hotel 1 - let the sensor input is to notify there is no movement in Sub corridor 3 in floor 1

curl -X POST \
  http://localhost:8000/v1/hotel/sensor \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: dc7b549a-9028-4b0f-a197-18b1e313a522' \
  -H 'cache-control: no-cache' \
  -d '{
        "movement": false,
        "location":{
            "floor":"floor_1",
            "corridor":"sub_corridor_3"
        }
    }'


