import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "../firebase/firebase";


export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("There is not auth provider");
  return context;
};

export function AuthProvider({ children }) {
  /*const user = {
    login: true,
  };*/
  //console.log (email, password);

  //const [user, setUser] = useState(null);
  const [user, setUser] = useState({}); // antes tenia null
  const [loading, setLoading] = useState(true);
   
  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

 /* const login = async (email, password) =>
    signInWithEmailAndPassword(auth, email, password);*/

    const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
    }

  //const logout = signOut(auth);

  function logout() {
    return signOut(auth);
  }

  const loginwithgoogle =  () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);

  };

  const resetPassword = (email) => sendPasswordResetEmail(auth, email);
  

  /*const verifyEmail = () => {
    let user = firebase.auth().currentUser;
    sendEmailVerification(user);
  };*/

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      //console.log(currentUser);
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <authContext.Provider
      value={{
        signup,
        login,
        logout,
        loginwithgoogle,
        resetPassword,
        user,
        loading
      }}
    >
      {children}
    </authContext.Provider>
  );
}
