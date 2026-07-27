import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import { app } from "./config";

const db = getFirestore(app);

export const getProducts = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  const products = [];

  querySnapshot.forEach((doc) => {
    products.push({ ...doc.data(), id: doc.id });
  });

  return products;
};

export const createOrder = async (order) => {
  const docRef = await addDoc(collection(db, "orders"), order);
  return docRef.id;
};