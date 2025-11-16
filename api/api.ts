import { getAuth } from "firebase/auth";

const auth = getAuth();

const token = await auth.currentUser?.getIdToken();

const response = await fetch("http://127.0.0.1:8000/protected", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});