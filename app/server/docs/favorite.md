# Favorite Api Spec

## Add Favorite API

Endpoint : POST /api/users/:user_id/favorites/

Request Header :
- Authorization : "unique-token"


Request Body:
```json
{
    "id_device" : "xioami_12",
}
```
Response Body Success :
```json
{
    "data" : {
        "favourite_id" : "1",
        "device_id" : "xioami_12",
    }
}
```

Response Body Error :
```json
{
    "errors" : "Unauthorized"
}
```


## Get Favorites API

Endpoint : GET /api/users/:user_id/favorites

Request Header :
- Authorization : "unique-token"

Response Body Success :
```json
{
    "data" : [
        {
            "id" : "xioami_12",
            "image" : "xioami_12.jpg"
        }
    ]
}
```



Response Body Error :
```json
{
    "errors" : "Unauthorized"
}
```


## Delete Favorite API

Endpoint : DELETE /api/users/:user_id/favorites/:favorite_id

Request Header :
- authorization : unique-token

Request Body :
```json
{
    "id" : "xiaomi_12"
}
```

Response Body Success :
```json
{
    "message" : "OK"
}
```

Response Body Error :
```json
{
    "errors" : "Unauthorized"
}
```