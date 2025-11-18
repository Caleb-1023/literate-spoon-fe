import { getAuth } from "firebase/auth";
import axios from "axios";

const auth = getAuth();

const token = await auth.currentUser?.getIdToken();

try {
  const response = await axios.get("http://127.0.0.1:8000/protected", {
    headers: { Authorization: `Bearer ${token}` },
  });
  console.log("Protected resource response (axios):", response);
} catch (err) {
  console.error("Error fetching protected resource (axios):", err);
}
