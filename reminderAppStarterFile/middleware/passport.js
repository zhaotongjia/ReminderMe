const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const userController = require("../controller/userController");

const localLogin = new LocalStrategy(
  {
    usernameField: "email",
  },
  (email, password, done) => {
    const user = userController.getUserByEmailIdAndPassword(email, password);
    return user
      ? done(null, user)
      : done(null, false, {
          message: "Your login details are not valid. Please try again",
        });
  }
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

let GITHUB_CLIENT_ID = "--insert-github-client-id-here--";
let GITHUB_CLIENT_SECRET = "--insert-github-client-secret-here--";

passport.use(new GitHubStrategy({
  clientID: GITHUB_CLIENT_ID,
  clientSecret: GITHUB_CLIENT_SECRET,
  callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  (accessToken, refreshToken, profile, done) => {
    process.nextTick( () => {
      return done(null, profile)
    })
}

))

module.exports = passport.use(localLogin);
