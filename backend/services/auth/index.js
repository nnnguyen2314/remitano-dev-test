const firebase = require('firebase');
const config = require('../../utils/firebase/config');
const { admin, db } = require('../../utils/firebase/index');

firebase.initializeApp(config);

const checkAuth = async (token) => {
    return new Promise((resolve) => {
        admin
            .auth()
            .verifyIdToken(token)
            .then((decodedToken) => {
                return admin.auth().getUser(decodedToken.uid);
            })
            .then((user) => {
                resolve({isError: false, user: user});
            })
            .catch((err) => {
                console.error('Error while verifying token', err);
                resolve({isError: true, err});
            });
    });
};
const doLogin = async (email, password) => {
    return new Promise((resolve) => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((data) => {
                return data.user.getIdToken();
            })
            .then((token) => {
                resolve({isError: false, token});
            })
            .catch((err) => {
                resolve({ isError: true, err });
            });
    });
};
const doSignUp = async (email, password) => {
    let userId, token;
    return new Promise((resolve) => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((data) => {
                userId = data.user.uid;
                return data.user.getIdToken();
            })
            .then((idtoken) => {
                token = idtoken;
                const userCredentials = {
                    email: email,
                    createdAt: new Date().toISOString(),
                    userId
                };
                return db
                    .doc(`/users/${userId}`)
                    .set(userCredentials);
            })
            .then(()=>{
                resolve({isError: false, token});
            })
            .catch((err) => {
                resolve({ isError: true, err });
            });
    });
};
const doFetchProfile = async (uid) => {
    return new Promise((resolve) => {
        admin
            .auth()
            .getUser(uid)
            .then((userRecord) => {
                console.log(userRecord);
                resolve({isError: false, user: userRecord});
            })
    });
};

const checkUserExistByEmail = async (email) => {
    return new Promise((resolve) => {
        admin.auth().getUserByEmail(email)
            .then((user) => {
                resolve({ isError: false, doesExist: true, user });
            })
            .catch((err) => {
                resolve({ isError: true, err });
            });
    });
};

module.exports = {checkAuth, checkUserExistByEmail, doLogin, doSignUp, doFetchProfile};