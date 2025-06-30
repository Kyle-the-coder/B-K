import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebaseConfig";

const auth = getAuth();

const classesCollection = collection(db, "class");

// ✅ Get all Classes
export const getClasses = async () => {
  const snapshot = await getDocs(classesCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// ✅ Get class by ID
export const getClassById = async (id) => {
  const classRef = doc(db, "class", id);
  const docSnap = await getDoc(classRef);

  if (!docSnap.exists()) {
    throw new Error("Class not found");
  }

  return { id: docSnap.id, ...docSnap.data() };
};

// ✅ Create a new class (requires auth)
export const postClassToFirestore = async (classData) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const docRef = await addDoc(collection(db, "class"), {
    ...classData,
    likes: [],
    comments: [],
    datePosted: serverTimestamp(),
  });

  return docRef.id;
};

// ✅ Update class
export const updateClass = async (id, classData) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const classRef = doc(db, "class", id);
  await updateDoc(classRef, classData);
  return { id, ...classData };
};

// ✅ Delete class
export const deleteClass = async (id) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const classRef = doc(db, "class", id);
  await deleteDoc(classRef);
  return { success: true };
};

// Add current user's UID to the likes array
export const likeClass = async (classId) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const classRef = doc(db, "class", classId);
  await updateDoc(classRef, {
    likes: arrayUnion(user.uid),
  });

  return { success: true };
};

// Remove current user's UID to the likes array
export const removeLikeClass = async (classId) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const classRef = doc(db, "class", classId);
  await updateDoc(classRef, {
    likes: arrayRemove(user.uid),
  });

  return { success: true };
};

// Add a comment with name and message
export const addCommentToClass = async (classId, commentText, username) => {
  const classRef = doc(db, "class", classId);

  const comment = {
    name: username,
    comment: commentText,
    date: Timestamp.now(),
  };

  await updateDoc(classRef, {
    comments: arrayUnion(comment),
  });

  return { success: true };
};
