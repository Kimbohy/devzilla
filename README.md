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
        success: true,
        message: 'Inscription réussie',
        data: {
            _id: 1,
            nom: 'John Doe',
            email: 'john.doe@example.com',
            type:  'talent'
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

## getOneUser

- GET : /users?user-id=672b60cccebbedded25fcd77

- **output**

``` json
{
    "success": true,
    "data": {
        "_id": "672b60cccebbedded25fcd77",
        "nom": "RANDRIA",
        "email": "a@a.com",
        "type": "Talent",
        "photoProfil": "",
        "description": "",
        "competences": [],
        "reseauxSociaux": [],
        "domaines": [],
        "mentor": [],
        "apprenti": []
    }
}
```

## getUserByEmail

- GET : /users?userEmail=john.doe@example.com

- **output**

``` json
{
    "success": true,
    "message": "Utilisateur trouvé",
    "data": {
        "_id": "672dc59dd04ad311e37e2c73",
        "nom": "nomVaovao",
        "email": "john.doe@example.com",
        "type": "Talent",
        "photoProfil": "",
        "description": "",
        "competences": [
            "art",
            "art"
        ],
        "reseauxSociaux": [],
        "domaines": [],
        "mentor": [],
        "apprenti": []
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

## reactPublication

- POST : /publications/react?publicationId=672c3f8fdc7463b0c171f18b

- **input**

``` js
{
    "utilisateurId": "672b60cccebbedded25fcd77",
    "type": "domaine"
}
```

- **output**

``` js
{
    "success": true,
    "message": "Réaction réussie",
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
        "reactions": [
            {
                "_id": "672ca4c14f83549f9fff2b7d",
                "utilisateurId": "672b60cccebbedded25fcd77",
                "type": "domaine",
                "date": "2024-11-07T11:30:09.931Z"
            }
        ],
        "commentaires": [
            {
                "utilisateurId": "672b60cccebbedded25fcd77",
                "contenu": "first comment",
                "reactions": [],
                "date": "2024-11-07T04:54:19.531Z"
            },
            {
                "_id": "672c48ec63e7f15a6e17ff45",
                "utilisateurId": "672b60cccebbedded25fcd77",
                "contenu": "first comment",
                "reactions": [],
                "date": "2024-11-07T04:58:20.698Z"
            },
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

# Matching
## askMatch

- POST : /matchs/ask

- **input** : 

```json
{
    "talentId": "672b60cccebbedded25fcd77",
    "mentorId": "672b60cccebbedded25fcd76",
    "domaineId": "672b60cccebbedded25fcd77",
    "source": "mentor"
} 
```

- **output**

``` json
{
    "status": true,
    "message": "Demande envoyée"
}
```

# Domaine
## createDomain

- POST : /domains/create

- **input**

``` json
{
    "nom": "math",
    "description": "Nouveau domaine"
}
```

- **output**

``` json
{
    "success": true,
    "message": "Création de domaine réussi",
    "data": {
        "_id": "672ef2ee6ce8c3e9c5cade00",
        "nom": "musique",
        "description": "Nouveau domaine"
    }
}
```

## getDomainByName

- GET : /domains?domainName=math

- **output**

``` json
{
    "success": true,
    "message": "domaine trouvé",
    "data": {
        "_id": "672ede12fa4511c7cb3737eb",
        "nom": "math",
        "description": "Nouveau domaine"
    }
}
```