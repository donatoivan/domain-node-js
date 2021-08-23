import loki from "lokijs";
import { v4 as uuidv4 } from "uuid";

const db = new loki("domain-users.db", {
  autosave: true,
  autosaveInterval: 4000,
  autoload: true,
  autoloadCallback: loadHandler,
});

function loadHandler() {
  let users = db.getCollection("users");

  if (!users) {
    users = db.addCollection("users");
  }
}

export const find = (userId, database = db) => {
  const users = database.getCollection("users");

  const user = users.findOne({ id: userId });
  return user;
};

export const save = (userId, data, database = db) => {
  const users = database.getCollection("users");

  if (!userId) {
    let id = uuidv4();
    users.insert({ id, data: { ...data } });

    return id;
  } else {
    let user = users.findOne({ id: userId });
    user = { ...user, data: { ...user.data, ...data } };
    users.update(user);

    return userId;
  }
};
