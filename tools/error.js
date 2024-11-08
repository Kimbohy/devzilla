// creer une classe Error pour gérer les erreurs
export class newError extends Error {
    constructor(status, message) {
        this.status = status
        this.message = message
    }
}