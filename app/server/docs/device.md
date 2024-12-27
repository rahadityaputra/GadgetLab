# Device Api Spec

## Get Devices API

Endpoint : GET /api/devices/popular

Response Body Success :

```json
{
  "data": [
    {
      "category": "Top 10 by daily interest",
      "list": [
        {
          "position": 1,
          "id": "xiaomi_12-11285",
          "name": "Xiaomi 12",
          "image": "xioami_12.jpg",
          "dailyHits": 50330
        }
      ]
    }
  ]
}
```

Response Body Error :

```json
{
  "errors": "Too Many Requests"
}
```

## Get Device Detail API

Endpoint : GET /api/devices/:id

Response Body Success :

```json
{
  "data": {
        "name": "Apple iPhone 13 Pro Max",
         "img": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro-max.jpg",
        "quickSpec": [
            {
            "name": "Display size",
            "value": "6.7\""
            }
        ],
        "detailSpec": [
            {
                "category": "Network",
                "specifications": [
                    {
                    "name": "Technology",
                    "value": "GSM / CDMA / HSPA / EVDO / LTE / 5G"
                    }
                ]
            }
        ]
    }
}
```

Response Body Error :

```json
{
  "errors": "Device not found"
}
```

## Get File PDF for Device Detail API

Endpoint : GET /api/devices/:id/export

Response Header : 
- Content-type : application/pdf
- Content-Disposition : attachment; filename="apple-specs.pdf

Response Body Success :

```json
{
  "data": {
        "name": "Apple iPhone 13 Pro Max",
         "img": "https://fdn2.gsmarena.com/vv/bigpic/apple-iphone-13-pro-max.jpg",
        "quickSpec": [
            {
            "name": "Display size",
            "value": "6.7\""
            }
        ],
        "detailSpec": [
            {
                "category": "Network",
                "specifications": [
                    {
                    "name": "Technology",
                    "value": "GSM / CDMA / HSPA / EVDO / LTE / 5G"
                    }
                ]
            }
        ]
    }
}
```

Response Body Error :

```json
{
  "errors": "Device not found"
}
```

