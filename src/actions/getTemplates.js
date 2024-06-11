
//to fix later
import { collection, query, orderBy, limit, startAfter, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase.config";

export async function getTemplates(lastVisible = null) {

  const templatesCollection = collection(db, "Templates");
  let q;

  if (lastVisible) {
    q = query(templatesCollection, orderBy("title"), startAfter(lastVisible), limit(20));
  } else {
    q = query(templatesCollection, orderBy("title"), limit(20));
  }

  try {
    const querySnapshot = await getDocs(q);
    const templates = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    const lastDoc = querySnapshot.docs[querySnapshot.docs.length-1]; // Corrected
    const result = { templates, lastVisibleDoc: lastDoc ? lastDoc.id : null };

    return result;
  } catch (error) {
    console.error("Error fetching templates:", error);
    throw new Error("Failed to fetch templates");
  }
}
