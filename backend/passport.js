const passport = require('passport');
const bcrypt = require('bcryptjs');
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const User = require('./models/userModel');

// Configure local authentication strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        // Check if a user with the given email exists
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false, { message: 'Invalid email' });
        }

        // Check password correctness
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return done(null, false, { message: 'Invalid password' });
        }

        // Authentication successful, pass the user for further handling
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Configure JWT authentication strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "TMP_SECRET",
    },
    async (payload, done) => {
      try {
        // Check if a user with the given ID exists
        const user = await User.findById(payload.sub);

        if (!user) {
          return done(null, false);
        }

        // Authentication successful, pass the user for further handling
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);


