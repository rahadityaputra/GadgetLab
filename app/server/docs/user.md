# User Api Spec


## Register User API

Endpoint : POST /api/users

Request Body :
```json
{
    "username" : "narutokonoha",
    "password" : "naruto123",
    "email" : "naruto@gmail.com",
    "name" : "Uzumaki Naruto"


}
```
Response Body Success :
```json
{
    "data" : {
        "username" : "narutokonoha",
        "email" : "naruto@gmail.com",
        "name" : "Uzumaki Naruto"
    }
}
```
Response Body Error :
```json
{
    "errors" : "email already used"
}
```



## Login User API

Endpoint : POST /api/users/login

Request body :
```json
{
    "email" : "naruto@gmail.com",
    "password" : "naruto123",
}
```

Response Body Success :
```json
{
    "data" : {
        "token" : "unique-token"
    }
}
```

Response Body Error :
```json
{
    "errors" : "username or password not valid"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Request Header :
- authorization : unique-token

Request Body :
```json
{
    "nama" : "Uzumaki Naruto",
    "password" : "naruto123"
}
```

Response Body Success :
```json
{
    "data" : {
        "token" : "unique-token"
    }
}
```

Response Body Error :
```json
{
    "errors" : "Unauthorized"
}
```


## Get User API

Endpoint : GET /api/users/current

Request Header :
- authorization : unique-token

Response  Body Success:
```json
{
    "username" : "narutokonoha",
    "name" : "Uzumaki Naruto"

}
```

Response Body Error :
```json
{
    "errors" : "Unauthorized"
}
```


## Logout User API

Endpoint : DELETE /api/users/logout

Request Header :
- authorization : unique-token
  
Response Body Success :
```json
{
    "data" : "ok"
}
```

Response Body Error :
```json
{
    "errors" : "Unauthorized"
}
```

    
