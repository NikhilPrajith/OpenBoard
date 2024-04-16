import { auth,db } from "@/firebase/firebase.config";
import { signOut } from 'firebase/auth'
import { doc, getDoc,onSnapshot } from "firebase/firestore";
const AuthService = {
    logout: async() =>{
        await signOut(auth);
    },
    logInWithEmail: async () =>{
        try{
            const userData = await signInWithEmailAndPassword(auth, email,password);
            //Will need to change this to the profile later
            return{
                user: userData
            };
        }catch(error){
            const errorCode = error.code;
            const errorMessage = error.message;
            return {
                error: errorMessage
            };
        }
    },
    subscribeToUserData: (uid, setData, setError) => {
        const docRef = doc(db, "users", uid);
    
        const unsubscribe = onSnapshot(docRef,
          (docSnapshot) => {
            if (docSnapshot.exists()) {
              setData(docSnapshot.data());
            } else {
              console.log("No user data found!");
              setData({});
            }
          },
          (error) => {
            console.error("Error fetching user data:", error);
            setError(error.message);
          }
        );
    
        return unsubscribe; // Return the unsubscribe function for cleanup
      },

}
export default AuthService;