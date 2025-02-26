"use client";

import { useEffect, useState } from "react";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getWorkshopSurveys } from "@/firebase/services/institution";
import { Rating } from "react-custom-rating-component";
import { WorkshopSurvey } from "@/types";

export function WorkshopSurveyTable() {
  const [surveys, setSurveys] = useState<WorkshopSurvey[]>([]);
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const fetchSurveys = async (
    lastDoc: QueryDocumentSnapshot<DocumentData> | null = null
  ) => {
    try {
      setLoading(true);
      const response = await getWorkshopSurveys(lastDoc);

      if (lastDoc) {
        setSurveys((prev) => [...prev, ...response.data]);
      } else {
        setSurveys(response.data);
      }

      setLastVisible(response.lastDoc);
      setHasMore(response.data.length === 10); // Assuming pageSize is 10
    } catch (error) {
      console.error("Error fetching surveys:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  const loadMore = () => {
    if (lastVisible) {
      fetchSurveys(lastVisible);
    }
  };

  if (loading && surveys.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Institution</TableHead>
            <TableHead>Instructor Rating</TableHead>
            <TableHead>Overall Rating</TableHead>
            <TableHead>Recommendation</TableHead>
            <TableHead>Likes</TableHead>
            <TableHead>Dislikes</TableHead>
            <TableHead>Improvements</TableHead>
            <TableHead>Created At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {surveys.map((survey, index) => (
            <TableRow key={survey.id || index}>
              <TableCell>{survey.name || "N/A"}</TableCell>
              <TableCell>{survey.institution || "N/A"}</TableCell>
              <TableCell>
                <Rating
                  defaultValue={survey["rate-instructor"] || 0}
                  size="30px"
                  spacing="10px"
                  activeColor="#FFB400"
                  readOnly
                />
              </TableCell>
              <TableCell>
                <Rating
                  defaultValue={survey["workshop-overall-rating"] || 0}
                  size="30px"
                  spacing="10px"
                  activeColor="#FFB400"
                  readOnly
                />
              </TableCell>
              <TableCell>
                <Rating
                  defaultValue={survey["workshop-recommend"] || 0}
                  size="30px"
                  spacing="10px"
                  activeColor="#FFB400"
                  readOnly
                />
              </TableCell>
              <TableCell className="max-w-[200px] truncate">
                {survey["workshop-like"] || "N/A"}
              </TableCell>
              <TableCell className="max-w-[200px] truncate">
                {survey["workshop-dislike"] || "N/A"}
              </TableCell>
              <TableCell className="max-w-[200px] truncate">
                {survey["workshop-improve"] || "N/A"}
              </TableCell>
              <TableCell>
                {survey.createdAt instanceof Date
                  ? survey.createdAt.toLocaleDateString()
                  : "N/A"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {hasMore && (
        <div className="flex justify-center">
          <Button variant="outline" onClick={loadMore} disabled={loading}>
            {loading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
}
