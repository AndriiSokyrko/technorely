const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const {User} = require('../models/models');


const secretKey = process.env.SECRET_KEY;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey,
};


passport.use('jwt',new Strategy(opts, async (token, done) => {
    try {
        const user = await User.findOne({where:{id:token.id}});
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done('Authentication is necessary: '+error, false);
    }
}));