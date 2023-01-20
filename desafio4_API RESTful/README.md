# emiliano1191

// se realiaza el metodo POST

curl --location --request POST 'localhost:8080/api/products' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "un nuevo producto",
            "price": 1056
}'

// se realiaza el metodo GET 

curl --location --request GET 'localhost:8080/api/products' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "un nuevo producto",
            "price": 1056
}'

body
{"msg":[{"id":"4ea8444e-b1b9-446f-b102-af077a7008a1","title":"calzado","price":2000},{"id":"467f5a33-8760-444f-a7c5-f121d3893d9a","title":"polo","price":2000},{"id":"f45231fb-756f-47be-bccc-d496fd1a1c11","title":"pantalon jeans","price":2000},
{"id":"f4f867dc-a8ab-4371-8407-667ef7861bd2"},{"title":"un nuevo producto","price":1056,"id":"5f6b8203-62f2-4238-a5e9-b0c7abc4930c"}

//get con un ID
curl --location --request GET 'localhost:8080/api/products/5f6b8203-62f2-4238-a5e9-b0c7abc4930c' \
--header 'Content-Type: application/json' \
--data-raw '{ "id" :"5f6b8203-62f2-4238-a5e9-b0c7abc4930c"
}'

{"msg":{"title":"un nuevo producto","price":1056,"id":"5f6b8203-62f2-4238-a5e9-b0c7abc4930c"}}

// metodo PUT

curl --location --request PUT 'localhost:8080/api/products/5f6b8203-62f2-4238-a5e9-b0c7abc4930c' \
--header 'Content-Type: application/json' \
--data-raw '{ "id" :"5f6b8203-62f2-4238-a5e9-b0c7abc4930c",
"title": "bufanda",
"price":200
}'