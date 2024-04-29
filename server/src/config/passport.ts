import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from '../models/index';
import passport from 'passport';

export default () => {
    passport.use(
        new Strategy(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
                secretOrKey: process.env.PASSPORT_SECET || '在此輸入 SECRET',
            },
            async function (jwt_payload, done) {
                try {
                    const foundUser = await User.findOne({
                        _id: jwt_payload._id,
                    }).exec();
                    done(null, foundUser || false);
                } catch (error) {
                    done(error, false);
                }
            }
        )
    );
};
