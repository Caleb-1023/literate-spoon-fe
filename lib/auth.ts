import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export async function signUp(email: string, password: string) {
  console.log(auth.config);
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  return userCred.user;
}

