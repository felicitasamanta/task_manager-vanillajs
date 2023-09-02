const USERNAME_KEY = "username";

const getUser = () => {
  return sessionStorage.getItem(USERNAME_KEY);
};

const setUser = (username) => {
  sessionStorage.setItem(USERNAME_KEY, username);
};

const removeUser = () => {
  sessionStorage.removeItem(USERNAME_KEY);
};

export { getUser, setUser, removeUser };
