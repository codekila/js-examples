var basicAuth = require('basic-auth');

class HttpBasicAuth {
    private userName:string;
    private password:string;
    private maxAttempt:number;

    getUserName(): string {
        return this.userName;
    }
    setUserName(user:string) {
        if (user)
            this.userName = user;
    }
    setPassword(pass:string) {
        if (pass)
            this.password = pass;
    }
    setMaxAttempt(maxAttempt:number) {
        if (maxAttempt)
            this.maxAttempt = maxAttempt;
    }
    compare(user:string, pass:string): boolean {
        if (this.userName == user && this.password == pass)
            return true;
        else
            return false;
    }

    doBasicAuth = (req, res, next) => {
        var unauthorized = (res) => {
            res.setHeader('WWW-Authenticate', 'Basic realm=Authorization Required');
            return this.maxAttempt-- >0 ? res.sendStatus(401) : res.sendStatus(403);
        };

        var user = basicAuth(req);

        if (!user || !this.getUserName()) {
            return unauthorized(res);
        };

        if (this.compare(user.name, user.pass)) {
            return next();
        } else {
            return unauthorized(res);
        };
    };

    constructor(user:string, pass:string, maxAttempt:number = 3) {
        this.setUserName(user);
        this.setPassword(pass);
        this.setMaxAttempt(maxAttempt);
    }
}

export = HttpBasicAuth;