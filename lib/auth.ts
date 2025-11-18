import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export async function signUp(email: string, password: string) {
  console.log(auth.config);
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  return userCred.user;
}

export async function signIn(email: string, password: string) {
  const userCred = await signInWithEmailAndPassword(auth, email, password);
  return userCred.user;
}

