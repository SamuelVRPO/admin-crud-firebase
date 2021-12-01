import firebase from "../firebase-config";

const db = firebase.collection("/Users");

class UserDataService {
    getAll() {
        return db;
    }

    create(user) {
        return db.add(user);
    }

    update(id, value) {
        return db.doc(id).update(value);
    }

    delete(id) {
        return db.doc(id).delete();
    }
}

export default new UserDataService();