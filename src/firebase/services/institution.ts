import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
  query,
  orderBy,
  limit,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db } from "../index";
import { WorkshopSurvey, WorkshopSurveyResponse } from "@/types";

const COLLECTION_NAME = "colleges";
// const COLLECTION_FEEDBACKS = "feedbacks";
const COLLECTION_WORKSHOP_SURVEY = "workshop-survey";

export const getAllColleges = async () => {
  const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
  //   return querySnapshot.map((doc) => {
  //     // console.log(`${doc.id} => ${doc.data()}`);
  //     return doc.data()
  //   });

  return querySnapshot.docs.map((doc) => doc.data());
};

// export const addSimpleFeedback = async (data: SimpleFeedback) => {
//   try {
//     const docRef = await addDoc(collection(db, COLLECTION_FEEDBACKS), {
//       ...data,
//       createdAt: serverTimestamp(),
//     });

//     console.log("Document written with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// };

export const addSurveyFeedback = async (data: WorkshopSurvey) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_WORKSHOP_SURVEY), {
      ...data,
      createdAt: serverTimestamp(),
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getWorkshopSurveys = async (
  lastVisible: QueryDocumentSnapshot<DocumentData> | null = null,
  pageSize: number = 10
): Promise<WorkshopSurveyResponse> => {
  try {
    let surveyQuery;

    if (lastVisible) {
      surveyQuery = query(
        collection(db, COLLECTION_WORKSHOP_SURVEY),
        orderBy("createdAt", "desc"),
        startAfter(lastVisible),
        limit(pageSize)
      );
    } else {
      surveyQuery = query(
        collection(db, COLLECTION_WORKSHOP_SURVEY),
        orderBy("createdAt", "desc"),
        limit(pageSize)
      );
    }

    const querySnapshot = await getDocs(surveyQuery);
    const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] || null;
    const surveys = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: (data.createdAt as Timestamp).toDate(),
      } as WorkshopSurvey;
    });

    return {
      data: surveys,
      lastDoc,
    };
  } catch (error) {
    console.error("Error fetching workshop surveys:", error);
    return {
      data: [],
      lastDoc: null,
    };
  }
};
