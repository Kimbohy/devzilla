export class matchError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
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
export class userError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
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