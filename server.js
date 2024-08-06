const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

// Initialize Express app
const app = express();
const crypto = require('crypto');
const secret1 = crypto.randomBytes(64).toString('hex');
const secret2 = crypto.randomBytes(64).toString('hex');
// Middleware
app.use(cors());
app.use(express.json());
app.use(session({
  secret: secret1,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/passport-google-auth-example', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// User Schema and Model
const UserSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  displayName: { type: String },
  email: { type: String, unique: true }
});

const User = mongoose.model('User', UserSchema);

// Passport Google Strategy
passport.use(new GoogleStrategy({
  clientID: '500407920444-n8vrc4mtaoe9u3tn5def7au8kqhd8nv1.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: 'http://localhost:5000/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      let user1 = new User({
        googleId: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value
      });
      await user1.save();
    }
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, secret2);
    res.redirect(`/success.html?token=${token}`);
  }
);

app.get('/logout', (req, res) => {
    if (err) {
        // Handle error, e.g., redirect to an error page or log it
        console.error('Logout error:', err);
        return next(err);
    }
  res.redirect('/');
});

app.get('/protected', (req, res) => {
  const token = req.headers['authorization'].split(' ')[1];
  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) {
      return res.status(401).send('Unauthorized');
    }
    res.send('hello geek');
  });
});

// Start the server
app.listen(5000, () => {
  console.log('http://localhost:5000');
});
