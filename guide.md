Voici une proposition de structure MongoDB pour l'application Réseau d’Entraide pour le Développement des Talents.

### 1. Structure des collections MongoDB

1. **Utilisateurs** : Informations sur les talents, mentors, et administrateurs.
2. **Publications** : Stocke les projets, événements, challenges, questions, etc.
3. **Matching** : Gère les relations entre talents et mentors.
4. **Notifications** : Stocke les notifications pour chaque utilisateur.
5. **Messages** : Gère l’historique des conversations entre mentors et talents (optionnel).
6. **Domaines** : Permet de classer les publications par catégories comme arts, sports, etc.

---

### 2. Détails des collections

#### Collection `Utilisateurs`
- **Champs** :
  - `_id`: ObjectId
  - `type`: String (`Talent`, `Mentor`, `Administrateur`)
  - `nom`: String
  - `email`: String (unique, vérifié)
  - `photoProfil`: String (URL AWS S3 pour la photo)
  - `description`: String
  - `competences`: Array de Strings
  - `experience` (pour les Mentors uniquement) : String
  - `reseauxSociaux`: Array d’objets `{ plateforme: String, lien: String }`
  - `domaines`: Array of ObjectIds (référence vers `Domaines`)
  - `mentorDomaineId`: ObjectId (référence vers le mentor pour le domaine, si applicable)
- **Index** : `{ email: 1 }` pour éviter les duplications et faciliter les recherches.

#### Collection `Publications`
- **Champs** :
  - `_id`: ObjectId
  - `utilisateurId`: ObjectId (référence vers `Utilisateurs`)
  - `type`: String (`Projet`, `Résultat`, `Challenge`, `Question`, `Event`)
  - `contenu`: String
  - `images`: Array de Strings (URL AWS S3)
  - `videos`: Array de Strings (URL AWS S3)
  - `domainesId`: ObjectId (référence vers `Domaines`)
  - `reactions`: Array d’objets `{ utilisateurId: ObjectId, type: String }` (domaine ou global)
  - `commentaires`: Array d’objets `{ utilisateurId: ObjectId, commentaire: String, reactions: Array }`
- **Index** : `{ domainesId: 1 }` pour filtrer par domaine.

#### Collection `Domaines`
- **Champs** :
  - `_id`: ObjectId
  - `nom`: String (`Arts`, `Sports`, `Sciences`, etc.)
  - `description`: String (optionnelle)
- **Index** : `{ nom: 1 }` pour les recherches rapides par nom.

#### Collection `Matching`
- **Champs** :
  - `_id`: ObjectId
  - `talentId`: ObjectId (référence vers `Utilisateurs`)
  - `mentorId`: ObjectId (référence vers `Utilisateurs`)
  - `domaineId`: ObjectId (référence vers `Domaines`)
  - `statut`: String (`En attente`, `Connecté`, `Rejeté`)
  - `dateCreation`: Date
- **Index** : `{ talentId: 1, mentorId: 1, domaineId: 1 }` pour les connexions.

#### Collection `Notifications`
- **Champs** :
  - `_id`: ObjectId
  - `utilisateurId`: ObjectId (référence vers `Utilisateurs`)
  - `type`: String (`Nouvelle publication`, `Réaction`, `Commentaire`, `Statut de demande`)
  - `message`: String
  - `dateCreation`: Date
- **Index** : `{ utilisateurId: 1, dateCreation: -1 }` pour récupérer les notifications récentes.

#### Collection `Messages` (optionnelle)
- **Champs** :
  - `_id`: ObjectId
  - `expediteurId`: ObjectId (référence vers `Utilisateurs`)
  - `destinataireId`: ObjectId (référence vers `Utilisateurs`)
  - `contenu`: String
  - `dateEnvoi`: Date
- **Index** : `{ expediteurId: 1, destinataireId: 1, dateEnvoi: -1 }` pour récupérer les conversations.

---

### 3. Exemples de documents

#### Exemple pour `Utilisateurs`
```json
{
  "_id": ObjectId("..."),
  "type": "Mentor",
  "nom": "Jean Dupont",
  "email": "jean.dupont@example.com",
  "photoProfil": "https://s3.amazonaws.com/bucket/photo.jpg",
  "description": "Expert en sciences physiques",
  "competences": ["Physique", "Mathématiques"],
  "experience": "Professeur à l'université",
  "reseauxSociaux": [{"plateforme": "LinkedIn", "lien": "https://linkedin.com/in/jeandupont"}],
  "domaines": [ObjectId("...")]
}
```

#### Exemple pour `Publications`
```json
{
  "_id": ObjectId("..."),
  "utilisateurId": ObjectId("..."),
  "type": "Projet",
  "contenu": "Développement d'une application de calcul",
  "images": ["https://s3.amazonaws.com/bucket/image1.jpg"],
  "videos": ["https://s3.amazonaws.com/bucket/video1.mp4"],
  "domainesId": ObjectId("..."),
  "reactions": [{"utilisateurId": ObjectId("..."), "type": "positive"}],
  "commentaires": [
    {"utilisateurId": ObjectId("..."), "commentaire": "Super projet !", "reactions": [{"type": "positive"}]}
  ]
}
```

### 4. Relations entre les collections
- **Utilisateur - Domaine** : Un utilisateur peut être lié à plusieurs domaines via la liste `domaines`.
- **Utilisateur - Publication** : Chaque publication est associée à un utilisateur.
- **Utilisateur - Matching** : La collection `Matching` fait le lien entre un Talent et un Mentor.
- **Utilisateur - Notification** : Les notifications sont reliées aux utilisateurs via leur `utilisateurId`.
- **Utilisateur - Message** : Les messages sont associés aux utilisateurs expéditeur et destinataire.

---

### 5. Index recommandés
- **Email** dans `Utilisateurs` pour éviter les duplications et accélérer l'authentification.
- **Domaines** dans `Publications` pour une navigation rapide par catégorie.
- **Date de création** dans `Notifications` pour trier par récence.
- **Expéditeur et destinataire** dans `Messages` pour l’efficacité de récupération des conversations.

Cette structure MongoDB est optimisée pour les interactions fréquentes tout en restant flexible pour de futures fonctionnalités.

Voici une version de l’architecture backend sans utiliser Express, uniquement avec Node.js natif.

---

# Conception d'une Architecture Backend avec Node.js (Sans Express)

## 1. Description des API Endpoints

### Principaux Endpoints

- **Utilisateurs**
  - `POST /auth/signup` : Inscription (JSON avec email, mot de passe, etc.)
  - `POST /auth/login` : Connexion (JSON avec email et mot de passe)
  - `GET /users/:id` : Récupération des détails d’un utilisateur
  - `PUT /users/:id` : Mise à jour des informations d’un utilisateur
  - `DELETE /users/:id` : Suppression d’un utilisateur

- **Publications**
  - `POST /publications` : Création de publication (nécessite authentification)
  - `GET /publications` : Liste des publications
  - `GET /publications/:id` : Détails d’une publication
  - `PUT /publications/:id` : Mise à jour d’une publication
  - `DELETE /publications/:id` : Suppression d’une publication

- **Matching**
  - `POST /matching` : Création d’une relation mentor-talent
  - `GET /matching/:id` : Détails d’un matching

### Gestion des erreurs

- Utilisation de codes HTTP appropriés (`404` pour les non trouvés, `401` pour accès refusé, `500` pour erreurs serveur).
- Messages d’erreur clairs pour chaque type d’erreur.

---

## 2. Structure du Projet

```plaintext
project-root
│
├── server.js                  # Point d'entrée principal de l'application
├── config/
│   ├── db.js                   # Configuration de MongoDB
│   ├── config.js               # Variables d'environnement et autres configurations
├── controllers/
│   ├── authController.js       # Contrôleur pour l'authentification
│   ├── userController.js       # Contrôleur pour la gestion des utilisateurs
│   ├── publicationController.js# Contrôleur pour les publications
│   └── matchingController.js   # Contrôleur pour les relations mentor-talent
├── middleware/
│   ├── authMiddleware.js       # Middleware pour la validation du token JWT
│   └── errorHandler.js         # Gestionnaire d'erreurs global
├── models/
│   ├── User.js                 # Modèle utilisateur (Mongoose)
│   ├── Publication.js          # Modèle publication
│   └── Matching.js             # Modèle matching
├── routes/
│   ├── authRoutes.js           # Routes pour l'authentification
│   ├── userRoutes.js           # Routes pour les utilisateurs
│   ├── publicationRoutes.js    # Routes pour les publications
│   └── matchingRoutes.js       # Routes pour le matching
├── services/
│   ├── jwtService.js           # Service pour la génération et validation de JWT
│   └── emailService.js         # Service pour l'envoi d'emails
├── utils/
│   └── validation.js           # Utilitaires de validation de données
└── tests/
    └── auth.test.js            # Tests pour l'authentification
    └── user.test.js            # Tests pour les utilisateurs
```

---

## 3. Middleware et Sécurité

1. **Authentification**
   - Utilisation de **JWT** pour sécuriser les endpoints privés.
   - Les tokens JWT peuvent être générés lors de la connexion et doivent être inclus dans le header `Authorization` des requêtes.

2. **Validation des données**
   - Créer des fonctions de validation dans `utils/validation.js` pour vérifier les données d'entrée.

3. **Sécurité**
   - **CORS** : Configurer les headers pour limiter l'accès aux domaines autorisés.
   - **Rate Limiting** : Protéger contre les attaques de type DDoS en limitant les requêtes.
   - **Helmet** : Configurer les headers HTTP de sécurité de manière manuelle.

---

## 4. Intégrations

- **Base de données** : MongoDB avec Mongoose pour la gestion de la base de données.
- **Stockage de fichiers** : AWS S3 pour stocker les images et les vidéos.
- **Système de cache** : Redis (optionnel) pour stocker des données fréquemment consultées.
- **Envoi d’e-mails** : Nodemailer pour la communication avec les utilisateurs.

---

## 5. Détails Techniques

- **Gestion des environnements**
  - Utilisation de fichiers `.env` pour stocker les clés API et les configurations de base.
  - Exemple : Créer un fichier `.env` pour stocker `DB_URI`, `JWT_SECRET`, etc.

- **Logging et monitoring**
  - Utilisation de `winston` pour la gestion des logs d’erreurs et d’informations.

- **Tests**
  - Tests unitaires et d’intégration avec **Jest** ou **Mocha**.

- **Documentation API**
  - Utilisation de **Swagger** pour documenter les endpoints.

---

## 6. Exemples de Code

### Fichier `server.js`

```javascript
const http = require('http');
const url = require('url');
const { handleRequest } = require('./routes');

require('dotenv').config();

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    req.query = parsedUrl.query;
    req.pathname = parsedUrl.pathname;

    handleRequest(req, res);
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### Fichier `routes/index.js`

```javascript
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const publicationRoutes = require('./publicationRoutes');
const matchingRoutes = require('./matchingRoutes');

function handleRequest(req, res) {
    if (req.pathname.startsWith('/auth')) {
        authRoutes(req, res);
    } else if (req.pathname.startsWith('/users')) {
        userRoutes(req, res);
    } else if (req.pathname.startsWith('/publications')) {
        publicationRoutes(req, res);
    } else if (req.pathname.startsWith('/matching')) {
        matchingRoutes(req, res);
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
}

module.exports = { handleRequest };
```

### Exemple de Contrôleur `authController.js`

```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.signup = async (req, res) => {
    try {
        // Validation et enregistrement de l'utilisateur
        // Code pour gérer l'inscription
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Erreur serveur' }));
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.matchPassword(password)) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Email ou mot de passe incorrect' }));
        return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ token }));
};
```

### Middleware `authMiddleware.js` pour la vérification du Token JWT

```javascript
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const token = req.headers['authorization']?.replace('Bearer ', '');
    if (!token) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Accès refusé' }));
        return;
    }

    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Token invalide' }));
    }
}

module.exports = authMiddleware;
```

### Gestionnaire d'erreurs `errorHandler.js`

```javascript
function errorHandler(err, req, res) {
    console.error(err.stack);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Erreur serveur' }));
}

module.exports = errorHandler;
```

---

## 7. Bonnes Pratiques à Suivre

- **Séparation des responsabilités** : Diviser le code en contrôleurs, modèles, services, etc.
- **Commentaires et documentation** : Documentez le code et utilisez Swagger pour les API.
- **Utiliser les Promises** : Toujours gérer les Promises avec `async/await` pour éviter les erreurs de callback.
- **Validations** : Créer des fonctions de validation pour une vérification systématique des données.

---

## 8. Packages NPM Recommandés

- `dotenv` : Gestion des variables d’environnement.
- `mongoose` : ORM pour MongoDB.
- `jsonwebtoken` : Gestion des tokens JWT.
- `winston` : Gestion des logs.
- `nodemailer` : En

voi d'emails.
- `jest` ou `mocha` : Tests.

---

Cette architecture fournit une base solide pour développer et maintenir un backend avec Node.js sans Express, tout en intégrant les fonctionnalités de sécurité et de bonne gestion des données.

# Spécification des API Utilisateurs

## 1. Endpoints Principaux

### 1.1 Inscription (`POST /auth/signup`)

**Description** : Créer un nouveau compte utilisateur.

**Requête** :
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe",
  "role": "user"  // Optionnel, par défaut "user"
}
```

**Réponse Succès** (201 Created) :
```json
{
  "success": true,
  "message": "Inscription réussie",
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user"
    },
    "token": "jwt_token"
  }
}
```

**Erreurs Possibles** :
- 400 Bad Request : Données invalides
- 409 Conflict : Email déjà utilisé
- 500 Internal Server Error : Erreur serveur

### 1.2 Connexion (`POST /auth/login`)

**Description** : Authentifier un utilisateur existant.

**Requête** :
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Réponse Succès** (200 OK) :
```json
{
  "success": true,
  "message": "Connexion réussie",
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user"
    },
    "token": "jwt_token"
  }
}
```

**Erreurs Possibles** :
- 400 Bad Request : Données manquantes
- 401 Unauthorized : Identifiants incorrects
- 500 Internal Server Error : Erreur serveur

### 1.3 Récupérer un Utilisateur (`GET /users/:id`)

**Description** : Obtenir les détails d'un utilisateur spécifique.

**Headers Requis** :
```
Authorization: Bearer jwt_token
```

**Réponse Succès** (200 OK) :
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "user",
      "dateCreated": "2024-01-01T00:00:00.000Z",
      "lastLogin": "2024-01-01T12:00:00.000Z"
    }
  }
}
```

**Erreurs Possibles** :
- 401 Unauthorized : Token manquant ou invalide
- 403 Forbidden : Accès non autorisé
- 404 Not Found : Utilisateur non trouvé

### 1.4 Mettre à Jour un Utilisateur (`PUT /users/:id`)

**Description** : Modifier les informations d'un utilisateur.

**Headers Requis** :
```
Authorization: Bearer jwt_token
```

**Requête** (champs optionnels) :
```json
{
  "firstName": "John Updated",
  "lastName": "Doe Updated",
  "password": "NewSecurePass123!"
}
```

**Réponse Succès** (200 OK) :
```json
{
  "success": true,
  "message": "Utilisateur mis à jour avec succès",
  "data": {
    "user": {
      "id": "user_id",
      "email": "user@example.com",
      "firstName": "John Updated",
      "lastName": "Doe Updated"
    }
  }
}
```

**Erreurs Possibles** :
- 400 Bad Request : Données invalides
- 401 Unauthorized : Token manquant ou invalide
- 403 Forbidden : Accès non autorisé
- 404 Not Found : Utilisateur non trouvé

### 1.5 Supprimer un Utilisateur (`DELETE /users/:id`)

**Description** : Supprimer un compte utilisateur.

**Headers Requis** :
```
Authorization: Bearer jwt_token
```

**Réponse Succès** (200 OK) :
```json
{
  "success": true,
  "message": "Utilisateur supprimé avec succès"
}
```

**Erreurs Possibles** :
- 401 Unauthorized : Token manquant ou invalide
- 403 Forbidden : Accès non autorisé
- 404 Not Found : Utilisateur non trouvé

## 2. Gestion de l'Authentification et des Rôles

### 2.1 Structure du Token JWT

```javascript
const token = jwt.sign(
  {
    id: user._id,
    role: user.role
  },
  process.env.JWT_SECRET,
  {
    expiresIn: '24h'
  }
);
```

### 2.2 Middleware d'Authentification

```javascript
const authMiddleware = async (req, res) => {
  try {
    // Vérifier le header Authorization
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return {
        status: 401,
        body: {
          success: false,
          message: "Token d'authentification requis"
        }
      };
    }

    const token = authHeader.split(' ')[1];
    
    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Récupérer l'utilisateur
    const user = await User.findById(decoded.id);
    if (!user) {
      return {
        status: 401,
        body: {
          success: false,
          message: "Utilisateur non trouvé"
        }
      };
    }

    // Ajouter l'utilisateur à la requête
    req.user = user;
    return { next: true };
  } catch (error) {
    return {
      status: 401,
      body: {
        success: false,
        message: "Token invalide ou expiré"
      }
    };
  }
};
```

### 2.3 Middleware de Vérification des Rôles

```javascript
const checkRole = (allowedRoles) => async (req, res) => {
  if (!req.user) {
    return {
      status: 401,
      body: {
        success: false,
        message: "Non authentifié"
      }
    };
  }

  if (!allowedRoles.includes(req.user.role)) {
    return {
      status: 403,
      body: {
        success: false,
        message: "Accès non autorisé"
      }
    };
  }

  return { next: true };
};
```

## 3. Gestion des Erreurs

### 3.1 Codes HTTP et Messages

| Code | Description | Utilisation |
|------|-------------|-------------|
| 200 | OK | Requête réussie |
| 201 | Created | Nouvelle ressource créée |
| 400 | Bad Request | Données invalides ou manquantes |
| 401 | Unauthorized | Token manquant ou invalide |
| 403 | Forbidden | Accès non autorisé (rôle insuffisant) |
| 404 | Not Found | Ressource non trouvée |
| 409 | Conflict | Conflit (ex: email déjà utilisé) |
| 500 | Internal Server Error | Erreur serveur |

### 3.2 Format Standard des Réponses d'Erreur

```json
{
  "success": false,
  "message": "Description de l'erreur",
  "errors": [
    "Detail de l'erreur 1",
    "Detail de l'erreur 2"
  ]
}
```

## 4. Meilleures Pratiques et Sécurité

### 4.1 Validation des Données

```javascript
const validateUserData = (data) => {
  const errors = [];
  
  // Validation email
  if (!data.email?.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
    errors.push("Format d'email invalide");
  }
  
  // Validation mot de passe
  if (data.password && data.password.length < 8) {
    errors.push("Le mot de passe doit contenir au moins 8 caractères");
  }
  
  // Autres validations...
  
  return errors;
};
```

### 4.2 Sécurité des Mots de Passe

```javascript
const bcrypt = require('bcryptjs');

// Hashage du mot de passe
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Vérification du mot de passe
const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
```

### 4.3 Protection contre les Attaques Courantes

1. **Rate Limiting** :
```javascript
const rateLimit = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limite par IP
};
```

2. **Headers de Sécurité** :
```javascript
const securityHeaders = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block'
};
```

## 5. Structure des Dossiers

```plaintext
src/
├── controllers/
│   └── userController.js
├── middleware/
│   ├── auth.js
│   └── roleCheck.js
├── models/
│   └── User.js
├── routes/
│   └── userRoutes.js
├── utils/
│   ├── validation.js
│   ├── security.js
│   └── responseFormatter.js
└── config/
    └── security.js
```

## 6. Tests

```javascript
// Exemple de test pour l'inscription
describe('User Registration', () => {
  test('Should create new user with valid data', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'SecurePass123!',
      firstName: 'Test',
      lastName: 'User'
    };

    const response = await request(app)
      .post('/auth/signup')
      .send(userData);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.user).toHaveProperty('email', userData.email);
  });

  test('Should reject duplicate email', async () => {
    // Premier utilisateur
    await User.create({
      email: 'test@example.com',
      password: 'SecurePass123!',
      firstName: 'Test',
      lastName: 'User'
    });

    // Tentative avec le même email
    const response = await request(app)
      .post('/auth/signup')
      .send({
        email: 'test@example.com',
        password: 'DifferentPass123!',
        firstName: 'Another',
        lastName: 'User'
      });

    expect(response.status).toBe(409);
    expect(response.body.success).toBe(false);
  });
});
```