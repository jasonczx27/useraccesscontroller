class returnGet {
    constructor() {
        this.canAccess = true;
    }

    giveAccess() {
        this.canAccess = true
        return this
    }

    blockAccess() {
        this.canAccess = false
        return this
    }



}

class returnPost {
    constructor() {
        this.data = {}
        this.statusCode = 200
    }
    notModified() {
        this.statusCode = 304
        return this
    }
    notFound() {
        this.statusCode = 404
        return this
    }
    accessDenied() {
        this.statusCode = 403
        return this
    }



}

module.exports = {
    returnGet,
    returnPost
}