export class CustomError extends Error {
    constructor(statusCode, message) {
        super(message)
        this.statusCode = statusCode
    }
}

export class matchError extends CustomError {
    constructor(statusCode, message) {
        super(statusCode, message)
    }

    static duplicateRequestError() {
        return new matchError(400, 'Vous avez déjà demandé un mentorat dans ce domaine');
    }

    static matchFoundError() {
        return new matchError(400, 'Un match existe déjà avec des informations similaires');
    }

    static databaseError() {
        return new matchError(500, 'Une erreur est survenue lors de l\'accès à la base de données');
    }

    static alreadyMatchedError() {
        return new matchError(400, 'Vous avez déjà un mentor dans ce domaine');
    }
}

// creer classe error pour les erreurs au niveau de l'incription
export class userError extends CustomError {
    constructor(statusCode, message) {
        super(statusCode, message)
    }

    static duplicateEmailError() {
        return new userError(400, 'Cet email est déjà utilisé');
    }

    static databaseError() {
        return new userError(500, 'Une erreur est survenue lors de l\'accès à la base de données');
    }

    static userNotFoundError() {
        return new userError(404, 'Utilisateur non trouvé');
    }

    static wrongPasswordError() {
        return new userError(401, 'Mot de passe ou mail incorrect');
    }
}

// creer classe error pour les erreurs au niveau des publications

export class publicationError extends CustomError {
    constructor(statusCode, message) {
        super(statusCode, message);
    }

    static publicationNotFoundError() {
        return new publicationError(404, 'Publication non trouvée');
    }

    static databaseError() {
        return new publicationError(500, 'Une erreur est survenue lors de l\'accès à la base de données');
    }

    static duplicatePublicationError() {
        return new publicationError(400, 'Vous avez déjà réagi à cette publication');
    }
}

export class domainError extends CustomError {
    constructor (statusCode, message) {
        super(statusCode, message)
    }

    static duplicateDomainError() {
        return new domainError(400, 'Ce domaine existe déjà')
    }

    static domainNotFoundError() {
        return new domainError(404, 'Domaine non trouvé')
    }
}