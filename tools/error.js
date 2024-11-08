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