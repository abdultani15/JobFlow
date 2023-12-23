import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyBtTy4R3L7hV2h4mnKJJDsDierGPpHT3K8",
  authDomain: "job-flow-4c581.firebaseapp.com",
  projectId: "job-flow-4c581",
  storageBucket: "job-flow-4c581.appspot.com",
  messagingSenderId: "106200352469",
  appId: "1:106200352469:web:902afa9e2b1eab96d1445c",
  measurementId: "G-XZM4DPNPJK",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

import {
  getDatabase,
  set,
  get,
  update,
  remove,
  ref,
  child,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

export const userRegister = async (email, password, username) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const currentDate = new Date();
    const options = { year: "numeric", month: "short", day: "numeric" };
    const date = currentDate.toLocaleDateString("en-US", options);

    const userData = {
      userId: userCredential.user.uid,
      username: username,
      email: email,
      postingList: [],
      dateCreated: date,
    };

    const database = getDatabase(app);

    await set(ref(database, `users/${userCredential.user.uid}`), userData);

    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const updateProfile = async (firstName, lastName, phoneNumber, bio) => {
  try {
    const database = getDatabase(app);
    const authUser = auth.currentUser;

    await update(ref(database, "users/" + authUser.uid), {
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phoneNumber,
      bio: bio,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async () => {
  try {
    const database = getDatabase(app);
    const authUser = auth.currentUser;
    if (!authUser) {
      throw new Error("No authenticated user.");
    }
    const profileRef = ref(database, "users/" + authUser.uid);
    const userData = (await get(profileRef)).val();
    return userData;
  } catch (error) {
    console.error("Error fetching profile data", error);
  }
};

const getUserPostingList = async () => {
  const database = getDatabase(app);
  const authUser = auth.currentUser;
  if (!authUser) {
    throw new Error("No authenticated user.");
  }
  const userId = authUser.uid;
  const userRef = ref(database, `users/${userId}/postingList`);
  const currentPostingList = (await get(userRef)).val() || {};

  return { userId, userRef, currentPostingList };
};

export const addJobToPostingList = async (jobData) => {
  try {
    const { userRef, currentPostingList } = await getUserPostingList();
    currentPostingList[jobData.jobId] = jobData;

    await set(userRef, currentPostingList);
  } catch (error) {
    throw error;
  }
};

export const loadAllJobs = async () => {
  try {
    const { currentPostingList } = await getUserPostingList();
    return Object.values(currentPostingList);
  } catch (error) {
    throw error;
  }
};

export const findJobId = async (jobId) => {
  try {
    const { currentPostingList } = await getUserPostingList();
    const postingList = Object.values(currentPostingList);

    for (const job of postingList) {
      if (job.jobId === jobId) {
        return job;
      }
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const updateJobStatus = async (jobId, status) => {
  try {
    const { userRef } = await getUserPostingList();
    const jobRef = child(userRef, jobId);
    await update(jobRef, { status: status });
  } catch (error) {
    throw error;
  }
};

export const deleteJob = async (jobId) => {
  try {
    const { userRef, currentPostingList } = await getUserPostingList();
    delete currentPostingList[jobId];
    await set(userRef, currentPostingList);
  } catch (error) {
    throw error;
  }
};

export const userLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const checkAuthState = (callback) => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};
