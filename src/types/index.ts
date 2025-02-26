import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

export interface WorkshopSurvey {
  id?: string;
  code: string;
  createdAt: Date;
  institution: string;
  name: string;
  "rate-instructor": number;
  "workshop-dislike": string;
  "workshop-improve": string;
  "workshop-like": string;
  "workshop-overall-rating": number;
  "workshop-recommend": number;
}

export interface WorkshopSurveyResponse {
  data: WorkshopSurvey[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
}
