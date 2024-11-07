# user
## createUser

- POST: /users/signup

-  **Functionality:** Creates a new user with the given details.
``` js
{
    "nom": "John Doe",
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
            nom: 'John Doe',
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
        nom: 'John Doe'
    }
}
```

## updateUser

- PuT: /users/update?user-id=672b60cccebbedded25fcd77

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

# publication
## createPublication

- POST: /publications/create

- **input**

```js
{
    "utilisateurId": "672b60cccebbedded25fcd77",
    "type": "projet",
    "contenu": "first pub",
    "images": ["aa", "bb"],
    "videos": ["cc","dd"],
    "domainesId": "672b60cccebbedded25fcd77"
}
```

- **output**

``` js
{
    "utilisateurId": "672b60cccebbedded25fcd77",
    "type": "projet",
    "contenu": "first pub",
    "images": ["aa", "bb"],
    "videos": ["cc","dd"],
    "domainesId": "672b60cccebbedded25fcd77"
}
```

## commentPublication

- POST /publications/comment?publicationId=672c3f8fdc7463b0c171f18b

- **input**

``` js
{
    "utilisateurId": "672b60cccebbedded25fcd77",
    "contenu": "first comment"
}
```

- **output**

``` js
{
    "success": true,
    "message": "Commentaire réussi",
    "data": {
        "_id": "672c3f8fdc7463b0c171f18b",
        "utilisateurId": "672b60cccebbedded25fcd77",
        "type": "projet",
        "contenu": "first pub",
        "images": [
            "aa",
            "bb"
        ],
        "videos": [
            "cc",
            "dd"
        ],
        "domainesId": "672b60cccebbedded25fcd77",
        "reactions": [],
        "commentaires": [
            {
                "_id": "672c490263e7f15a6e17ff46",
                "utilisateurId": "672b60cccebbedded25fcd77",
                "contenu": "first comment",
                "reactions": [],
                "date": "2024-11-07T04:58:42.663Z"
            }
        ],
        "date": "2024-11-07T04:18:23.359Z"
    }
}
```