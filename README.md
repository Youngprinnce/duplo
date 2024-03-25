## Description

[Duplo](https://github.com/Youngprinnce/duplo) API.

### [swagger docs](http://localhost:3000/api-docs#/) 

## API Endpoints
* POST Create Business                              (/business)
* POST Create Department Head (user)                (/users/signup)
* POST Login                                        (/user/signin)
* POST Create Order                                 (/orders)                      Authenticated
* GET Get Business Order Details                    (/orders/get-order-details)    Authenticated
* GET Get Business Credit Score                     (/orders/get-credit-score)     Authenticated

## Installation & How to run locally
- Make sure to have [Docker](https://www.docker.com/get-started/) installed on your local machine
- On your desktop terminal run the command ```git clone https://github.com/Youngprinnce/duplo.git```
- In the project folder, Change ```.env.example ``` file in the project root directory to ```.env```
- Run command ```docker-compose up``` to run application

## NOTE
- You can access the API documentation via [swagger docs](http://localhost:3000/api-docs#/)
- You should create a business first before creating a department head (user)
- To create a business, you can use the following payload
```
{
    "name": "Business Name"
}
```
- To create a department head (user), you can use the following payload

```
{
    "email": "hello@gmail.com",
    "password": "Password1!",
    "businessId": "businessId",
    "name": "John Doe"
}
```
- When creating an order, productId can be any positive integer
