import { firestore } from "../firebase.config";
import { collection,query, doc,orderBy, setDoc,getDocs } from "firebase/firestore";
import { async } from "@firebase/util";
// saving new Item
export const saveItem = async (data) => {
  await setDoc(doc(firestore, "items", `${Date.now()}`),data, { merge: true });
};

export const getAllItems=async()=>{
  const items=await getDocs(
    query(collection(firestore,"items"),orderBy("id","desc"))
  )
  return items.docs.map((doc)=> doc.data())
}