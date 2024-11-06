# user
## createUser

- POST: /users/signup

-  **Functionality:** Creates a new user with the given details.
``` js
{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123"
}
```

- **Output**

``` js
{
    {
        success: true,
        message: 'Inscription réussie',
        data: {
            _id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            type:  'talent'
        }
    }
}
```

## authenticateUser

- POST: /users/signin

- **input**

``` js
{
    "email":  "john.doe@example.com",
    "password": "password123"
}
```

- **output**

``` js
{
    success: true,
    message: 'Connexion réussie',
    data: {
        _id: 1234567890khj,
        email:  'john.doe@example.com',
        name: 'John Doe'
    }
}
```

## updateUser

- - PuT: /users/update?user-id=672b60cccebbedded25fcd77

- **input**

``` js
[
    {
        "key": "name",
        "value": "nomVaovao"
    },
    {
        "key": "competences",
        "value": "art"
    }
]
```

- **output**

``` js
{
    success: true,
    message: 'Mise à jour réussie',
    data: {
        _id : '672b60cccebbedded25fcd77',
        nom : "RANDRIA",
        email : "a@a.com",
        type : "Talent",
        ...
    }
}
```