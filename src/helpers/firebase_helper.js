import firebase from 'firebase/compat/app'

// Add the Firebase products that you want to use
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage"
class FirebaseAuthBackend {
  constructor(firebaseConfig) {
    if (firebaseConfig) {
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig)
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          localStorage.setItem("authUser", JSON.stringify(user))
        } else {
          localStorage.removeItem("authUser")
        }
      })
    }
  }

  /**
   * Registers the user with given details
   */
  registerUser = (email, password) => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
          user => {
            resolve(firebase.auth().currentUser)
          },
          error => {
            reject(this._handleError(error))
          }
        )
    })
  }

  /**
   * Registers the user with given details
   */
  editProfileAPI = (email, password) => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
          user => {
            resolve(firebase.auth().currentUser)
          },
          error => {
            reject(this._handleError(error))
          }
        )
    })
  }

  /**
   * Login user with given details
   */
  loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          user => {
            resolve(firebase.auth().currentUser)
          },
          error => {
            reject(this._handleError(error))
          }
        )
    })
  }

  /**
   * forget Password user with given details
   */
  forgetPassword = email => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .sendPasswordResetEmail(email, {
          url:
            window.location.protocol + "//" + window.location.host + "/login",
        })
        .then(() => {
          resolve(true)
        })
        .catch(error => {
          reject(this._handleError(error))
        })
    })
  }

  /**
   * Logout the user
   */
  logout = () => {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          resolve(true)
        })
        .catch(error => {
          reject(this._handleError(error))
        })
    })
  }

  /**
   * Social Login user with given details
   */
  socialLoginUser = (data, type) => {
    let credential = {}
    if (type === "google") {
      credential = firebase.auth.GoogleAuthProvider.credential(
        data.idToken,
        data.token
      )
    } else if (type === "facebook") {
      credential = firebase.auth.FacebookAuthProvider.credential(data.token)
    }
    return new Promise((resolve, reject) => {
      if (!!credential) {
        firebase
          .auth()
          .signInWithCredential(credential)
          .then(user => {
            resolve(this.addNewUserToFirestore(user))
          })
          .catch(error => {
            reject(this._handleError(error))
          })
      } else {
        reject(this._handleError(error))
      }
    })
  }

  /**
   * Upload project files
   */
  uploadProjectFiles = (files, refName) => {
    const storage = firebase.storage()
    return new Promise((resolve, reject) => {
      for (const i of files) {
        const storageRef = storage
          .ref(`${refName}`)
          .child(`${i.name}`)
          .put(i, { cacheControl: "no-store" })
        storageRef
          .then(() => {
            storage
              .ref(`${refName}`)
              .child(`${i.name}`)
              .getDownloadURL()
              .then(fileURL => {
                resolve(new Array(fileURL))
              })
          })
          .catch(err => {
            reject(this._handleError(err))
          })
      }
    })
  }

  /**
   * Add new project
   */
  addProject = ({ projectname, projectdesc, projectbudget, projectfiles }) => {
    const collection = firebase.firestore().collection("projects")
    const id = new Date().getTime()
    return new Promise((resolve, reject) => {
      const data = {
        id: `${id}`,
        uid: firebase.auth().currentUser.uid,
        createdDate: firebase.firestore.FieldValue.serverTimestamp(),
        name: projectname,
        desc: projectdesc,
        budget: projectbudget,
        status: "En attente",
        members: [],
      }
      // upload file to firebase storage
      this.uploadProjectFiles(projectfiles, "projectfiles")
        .then(files => {
          collection.doc(`${id}`).set({ ...data, files })
            .then(() => {
              resolve(true)
              console.log("Document successfully written!")
            })
            .catch(err => {
              reject(this._handleError(err))
              console.error("Error writing document: ", error)
            })
        })
        .catch(err => reject(this._handleError(err)))
    })
  }

  /**
   * Get all projects
   */
  getAllProjects = () => {
    const collection = firebase.firestore().collection("projects")
    const e = []
    return new Promise((resolve, reject) => {
      collection
        .get()
        .then(res => {
          res.docs.map(doc => e.push(doc.data()))
          resolve(e)
        })
        .catch(err => reject(this._handleError(err)))
    })
  }

  /**
   * Update project
   */
  updateProject = ({name, desc, status, budget, id}) => {
    const collection = firebase.firestore().collection("projects")
    return new Promise((resolve, reject) => {
      collection.doc(`${id}`).update({
        name,
        desc,
        status,
        budget,
      }).then((e) => {
        console.log('data updated')
        resolve(true)
      }).catch(err => reject(this._handleError(err)))
    })
  }

  addNewUserToFirestore = user => {
    const collection = firebase.firestore().collection("users")
    const { profile } = user.additionalUserInfo
    const details = {
      firstName: profile.given_name ? profile.given_name : profile.first_name,
      lastName: profile.family_name ? profile.family_name : profile.last_name,
      fullName: profile.name,
      email: profile.email,
      picture: profile.picture,
      createdDtm: firebase.firestore.FieldValue.serverTimestamp(),
      lastLoginTime: firebase.firestore.FieldValue.serverTimestamp(),
    }
    collection.doc(firebase.auth().currentUser.uid).set(details)
    return { user, details }
  }

  setLoggeedInUser = user => {
    localStorage.setItem("authUser", JSON.stringify(user))
  }

  /**
   * Returns the authenticated user
   */
  getAuthenticatedUser = () => {
    if (!localStorage.getItem("authUser")) return null
    return JSON.parse(localStorage.getItem("authUser"))
  }

  /**
   * Handle the error
   * @param {*} error
   */
  _handleError(error) {
    // var errorCode = error.code;
    var errorMessage = error.message
    return errorMessage
  }
}

let _fireBaseBackend = null;

/**
 * Initilize the backend
 * @param {*} config
 */
const initFirebaseBackend = config => {
  if (!_fireBaseBackend) {
    _fireBaseBackend = new FirebaseAuthBackend(config);
  }
  return _fireBaseBackend;
};

/**
 * Returns the firebase backend
 */
const getFirebaseBackend = () => {
  return _fireBaseBackend;
};

export { initFirebaseBackend, getFirebaseBackend };
