import firebase from "firebase/compat/app"
// Add the Firebase products that you want to use
import "firebase/compat/auth"
import "firebase/compat/firestore"
import "firebase/compat/storage"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID,
}

firebase.initializeApp(firebaseConfig)

/**
 * Login user with given details
 */
export const loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(
        (response) => {
          resolve(response.user)
        },
        error => {
          reject(error.message)
        }
      )
  })
}

/**
 * Registers the user with given details
 */
export const registerUser = (email, password) => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(
        res => {
          addNewUser(res.user).then((e) => resolve(e))
          // resolve(firebase.auth().currentUser)
        },
        error => {
          reject(error.message)
        }
      )
  })
}

/**
 * Add new user in the firestore database
 */
export const addNewUser = user => {
  return new Promise((resolve, reject) => {
    const collection = firebase.firestore().collection("users")
    const details = {
      id: new Date().getTime(),
      uid: user?.uid,
      fullName: user?.displayName ?? "",
      email: user?.email ?? "",
      photo: user?.photoURL ?? "",
      phoneNumber: user?.phoneNumber ?? "",
      initialAmount: 0.0,
      token: [],
      projects: [],
      transactions: [],
      type: "user",
      createdDtm: firebase.firestore.FieldValue.serverTimestamp(),
      lastLoginTime: firebase.firestore.FieldValue.serverTimestamp(),
    }
    collection
      .doc(user?.uid)
      .set(details)
      .then(
        e => {
          resolve(true)
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
export const editProfileAPI = (email, password) => {
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
 * Get user by Id
 */
export const getUserByUID = userUID => {
  const collection = firebase.firestore().collection("users")
  return new Promise((resolve, reject) => {
    collection
      .doc(`${userUID}`)
      .get()
      .then(e => resolve(e.data()))
      .catch(err => reject(err.message))
  })
}

/**
 * forget Password user with given details
 */
export const forgetPassword = email => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .sendPasswordResetEmail(email, {
        url: window.location.protocol + "//" + window.location.host + "/login",
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
export const logout = () => {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        resolve(true)
      })
      .catch(error => {
        reject(error.message)
      })
  })
}

/**
 * Upload project files
 */
export const uploadProjectFiles = (files, refName) => {
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
              resolve([{ name: fileURL.split(".")[0], link: fileURL }])
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
export const addProject = ({
  projectname,
  projectdesc,
  projectbudget,
  projectfiles,
}) => {
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
        collection
          .doc(`${id}`)
          .set({ ...data, files })
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
export const getAllProjects = () => {
  const collection = firebase.firestore().collection("projects")
  const e = []
  return new Promise((resolve, reject) => {
    collection
      .get()
      .then(res => {
        res.docs.map(doc => e.push(doc.data()))
        resolve(e)
      })
      .catch(err => reject(err.message))
  })
}

/**
 * Social Login user with given details
 */
export const socialLoginUser = (data, type) => {
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
 * Update project
 */
export const updateProject = ({ name, desc, status, budget, id }) => {
  const collection = firebase.firestore().collection("projects")
  return new Promise((resolve, reject) => {
    collection
      .doc(`${id}`)
      .update({
        name,
        desc,
        status,
        budget,
      })
      .then(e => {
        console.log("data updated")
        resolve(true)
      })
      .catch(err => reject(err))
  })
}

/**
 * Delete project
 */
export const deleteProject = ({ id }) => {
  const collection = firebase.firestore().collection("projects")
  return new Promise((resolve, reject) => {
    collection
      .doc(`${id}`)
      .delete()
      .then(() => {
        resolve(true)
      })
      .catch(err => {
        console.log("unable to delete document: ", err)
        this._handleError(reject(err))
      })
  })
}

/**
 * Get one project
 */
export const getProjectsDetails = id => {
  const collection = firebase.firestore().collection("projects")
  return new Promise((resolve, reject) => {
    collection
      .doc(`${id}`)
      .get()
      .then(e => resolve(e.data()))
      .catch(err => reject(this._handleError(err)))
  })
}

/**
 * Get all investors
 */
export const getAllInvestors = () => {
  const collection = firebase.firestore().collection("investors")
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
 * Get one investor
 */
export const getInvestorsDetails = id => {
  const collection = firebase.firestore().collection("investors")
  return new Promise((resolve, reject) => {
    collection
      .doc(`${id}`)
      .get()
      .then(e => resolve(e.data()))
      .catch(err => reject(this._handleError(err)))
  })
}

/**
 * Update transaction list
 */
export const addTransaction = (userId, data) => {
  const collection = firebase.firestore().collection("users")
  return new Promise((resolve, reject) => {
    collection
      .doc(`${userId}`)
      .update({
        transactions: firebase.firestore.FieldValue.arrayUnion(data) ?? [],
      })
      .then(() => {
        resolve(true)
      })
      .catch(err => reject(err))
  })
}

/**
 * Send token to user after payment
 */
export const sendToken = (userId, data) => {
  const collection = firebase.firestore().collection("users")
  return new Promise((resolve, reject) => {
    collection
      .doc(`${userId}`)
      .update({
        token: firebase.firestore.FieldValue.arrayUnion(data) ?? [],
      })
      .then(() => {
        resolve(true)
      })
      .catch(err => reject(err))
  })
}

/**
 * users
 */
export const addNewUserToFirestore = user => {
   const collection = firebase.firestore().collection("users")
   const { profile } = user.additionalUserInfo
   const details = {
    firstName: profile.given_name ? profile.given_name : profile.first_name,
    lastName: profile.family_name ? profile.family_name : profile.last_name,
    fullName: profile.name,
    email: profile.email,
    type: "user",
    picture: profile.picture,
    createdDtm: firebase.firestore.FieldValue.serverTimestamp(),
    lastLoginTime: firebase.firestore.FieldValue.serverTimestamp(),
  }
  collection.doc(firebase.auth().currentUser.uid).set(details)
  return { user, details }
}

/**
 * Check if user if logged
 */
export const setLoggeedInUser = user => {
  localStorage.setItem("authUser", JSON.stringify(user))
}