# backend-for-react.guohai.co




Steps 
	set up github repo 
	check node version 
	init npm 
	install express and mongoose 
	connect to mongodb 
	express listen to port 

	set up first route 
        - express 
        - router 
        - differt routes
        - module.exports
        - require(./)
        - use

    set up first model 
        - mongoose
        - joi
        - jwt 
        - conifg 

        - mongoose schema validation 
        - user input validation 


    set up post route 
        user input validate check 
        user existence check 
        save 
    
    set up get route 
        find, select 
    
    hash password: 
        bcrypt 
        salt + hash

    jsonwebtoken
        sign with id 
        assign to userSchema.methods
        +
        config 
        +
        export xx=xxx && nodemon index.js

    /me 
    auth middleware 
        verify token
        return decoded
        next




auth.js 

    +bcrypt 
    +user model 
    +joi

    validate 
    get user 
    compare 
    gen and return jwt 


category.js 
    get / 
    get / id
    post /
    put /id
    delete /id
    

    