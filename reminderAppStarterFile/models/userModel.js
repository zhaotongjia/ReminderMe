const loginDatabase = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "admin",
    pic: "https://images.unsplash.com/photo-1461988320302-91bde64fc8e4?ixid=2yJhcHBfaWQiOjEyMDd9&&fm=jpg&w=400&fit=max",
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    pic: "https://images.unsplash.com/photo-1525275963076-7a70249a9925?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&&fm=jpg&w=400&fit=max"
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    pic: "https://images.unsplash.com/photo-1636869813697-cc1bec1cfb24?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&&fm=jpg&w=400&fit=max"
  },
];

const userModel = {
  // findOne: (email) => {
  //   const user = loginDatabase.find((user) => user.email === email);
  //   if (user) {
  //     return user;
  //   }
  //   throw new Error(`Couldn't find user with email: ${email}`);
  // },

  // findById: (id) => {
  //   const user = loginDatabase.find((user) => user.id === id);
  //   if (user) {
  //     return user;
  //   }
  //   throw new Error(`Couldn't find user with id: ${id}`);
  // },
  CheckGithubId: (profile) => {
    const user = loginDatabase.find((user) => user.id === profile.id);
    if (user) {
      return user;
    }
    let newuser = {
      id: profile.id,
      name: profile.username,
      pic: profile.photos[0].value,
    };
    loginDatabase.push(newuser);
    return newuser;
  },
};

module.exports = {
  loginDatabase,
  userModel,
};
