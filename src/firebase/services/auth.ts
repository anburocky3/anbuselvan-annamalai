import {
  getAuth,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  AuthError,
  User,
} from "firebase/auth";
import app from "../index";

const auth = getAuth(app);

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Get the Firebase ID token
    const token = await userCredential.user.getIdToken();

    // Set the token in a cookie
    document.cookie = `firebase-token=${token}; path=/; max-age=3600; SameSite=Strict; Secure`;

    return { success: true, user: userCredential.user };
  } catch (error) {
    const authError = error as AuthError;
    console.error("Error signing in:", authError);
    return {
      success: false,
      error: authError.message || "Failed to sign in",
    };
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    // Remove the token cookie
    document.cookie =
      "firebase-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    return { success: true };
  } catch (error) {
    console.error("Error signing out:", error);
    return { success: false, error };
  }
};

// Function to get the current auth state
export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        unsubscribe();
        if (user) {
          // Refresh the token when getting current user
          const token = await user.getIdToken(true);
          document.cookie = `firebase-token=${token}; path=/; max-age=3600; SameSite=Strict; Secure`;
        }
        resolve(user);
      },
      reject
    );
  });
};

// Function to get the current token
export const getAuthToken = async (): Promise<string | null> => {
  const user = auth.currentUser;
  if (!user) return null;

  try {
    return await user.getIdToken(true);
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
};

export default auth;
