# sahaj
A repo for sahaj interview

Once you clone this repository, Install node modules by executing "npm install"
the command to start the server "node server"


please find the following sample  POSTman Requests or use "npm test" to validate 


* Create Hotel 1

curl -X POST \
  http://localhost:8000/v1/hotel \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 5e0f28ca-d461-4823-8216-1fe0291b3849' \
  -H 'cache-control: no-cache' \
  -d '{
    "number_of_floors": 2,
    "number_of_main_corridors": 1,
    "number_of_sub_corridors": 2
}'





* Create Hotel 2 

curl -X POST \
  http://localhost:8000/v1/hotel \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 58ea32d1-d718-48f1-a4de-d8a3424d127d' \
  -H 'cache-control: no-cache' \
  -d '{
    "number_of_floors": 2,
    "number_of_main_corridors": 1,
    "number_of_sub_corridors": 4
}'


* Process Sensor signals


curl -X POST \
  http://localhost:8000/v1/hotel/sensor \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 77513191-49f6-4233-b55c-083394b9dc7c' \
  -H 'cache-control: no-cache' \
  -d '{
        "movement": true,
        "location":[{
            "floor":"floor_1",
            "corridor":"sub_corridor_2"
        }]
    }'


* Process Sensor signals 2


curl -X POST \
  http://localhost:8000/v1/hotel/sensor \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: 92590bc3-1a51-43ec-852f-46856ba66272' \
  -H 'cache-control: no-cache' \
  -d '{
        "movement": false,
        "location":[{
            "floor":"floor_1",
            "corridor":"sub_corridor_2"
        }]
    }'

