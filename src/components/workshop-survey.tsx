"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";
import { LuStar, LuThumbsUp, LuThumbsDown, LuLightbulb } from "react-icons/lu";
import { WorkshopSurvey } from "@/types";
import { getWorkshopSurveys } from "@/firebase/services/institution";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function WorkshopSurveyDetailed() {
  const [surveys, setSurveys] = useState<WorkshopSurvey[]>([]);
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const getReviewStats = (reviews: WorkshopSurvey[]) => {
    return {
      total: reviews.length,
      highlyRecommended: reviews.filter((r) => r["workshop-recommend"] >= 8)
        .length,
      recommended: reviews.filter(
        (r) => r["workshop-recommend"] >= 6 && r["workshop-recommend"] < 8
      ).length,
      neutral: reviews.filter(
        (r) => r["workshop-recommend"] >= 4 && r["workshop-recommend"] < 6
      ).length,
      notRecommended: reviews.filter(
        (r) => r["workshop-recommend"] >= 2 && r["workshop-recommend"] < 4
      ).length,
      worse: reviews.filter((r) => r["workshop-recommend"] < 2).length,
    };
  };

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

  const stats = getReviewStats(surveys);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center ">
        <h2 className="text-2xl font-bold tracking-tight">Workshop Reviews</h2>
        <div className="text-sm text-muted-foreground">
          Total Reviews: {stats.total}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        <div className="bg-green-100 p-3 rounded-lg">
          <div className="font-semibold">Highly Recommended</div>
          <div className="text-2xl font-bold">{stats.highlyRecommended}</div>
        </div>
        <div className="bg-blue-100 p-3 rounded-lg">
          <div className="font-semibold">Recommended</div>
          <div className="text-2xl font-bold">{stats.recommended}</div>
        </div>
        <div className="bg-yellow-100 p-3 rounded-lg">
          <div className="font-semibold">Neutral</div>
          <div className="text-2xl font-bold">{stats.neutral}</div>
        </div>
        <div className="bg-red-100 p-3 rounded-lg">
          <div className="font-semibold">Not Recommended</div>
          <div className="text-2xl font-bold">{stats.notRecommended}</div>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg">
          <div className="font-semibold">Worse</div>
          <div className="text-2xl font-bold">{stats.worse}</div>
        </div>
      </div>

      <div className="grid gap-6">
        {surveys.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
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

function ReviewCard({ review }: { review: WorkshopSurvey }) {
  const getRecommendationColor = (recommendation: number) => {
    if (recommendation >= 8) {
      return "bg-green-100 text-green-800";
    } else if (recommendation >= 6) {
      return "bg-blue-100 text-blue-800";
    } else if (recommendation >= 4) {
      return "bg-yellow-100 text-yellow-800";
    } else if (recommendation > 0) {
      return "bg-red-100 text-red-800";
    } else {
      return "bg-gray-100 text-gray-800";
    }
  };

  const getRecommendation = (workshopRecommend: number): string => {
    // Determine response type based on average score
    if (workshopRecommend >= 8) {
      return "Highly Recommended";
    } else if (workshopRecommend >= 6) {
      return "Recommended";
    } else if (workshopRecommend >= 4) {
      return "Neutral";
    } else if (workshopRecommend >= 2) {
      return "Not Recommended";
    } else {
      return "Worse response";
    }
  };

  return (
    <Card className="overflow-hidden border-muted/60">
      <CardHeader className="bg-muted/30 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-semibold">{review.name}</h3>
            <p className="text-sm text-muted-foreground">
              {review.institution}
            </p>
          </div>
          <Badge
            className={`${getRecommendationColor(
              review["workshop-recommend"]
            )} font-medium`}
          >
            {getRecommendation(review["workshop-recommend"])}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid gap-6">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
            <div className="space-y-1">
              <p className="text-sm font-medium">Instructor Rating</p>
              <div className="flex">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <LuStar
                      key={i}
                      className={`w-5 h-5 ${
                        i < review["rate-instructor"]
                          ? "fill-primary text-primary"
                          : "fill-muted text-muted-foreground"
                      }`}
                    />
                  ))}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Overall Rating</p>
              <div className="flex">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <LuStar
                      key={i}
                      className={`w-5 h-5 ${
                        i < review["workshop-overall-rating"]
                          ? "fill-primary text-primary"
                          : "fill-muted text-muted-foreground"
                      }`}
                    />
                  ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <LuThumbsUp className="w-4 h-4 text-green-500" />
                <h4 className="text-sm font-medium">Likes</h4>
              </div>
              <p className="text-sm pl-6">{review["workshop-like"]}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <LuThumbsDown className="w-4 h-4 text-red-500" />
                <h4 className="text-sm font-medium">Dislikes</h4>
              </div>
              <p className="text-sm pl-6">{review["workshop-dislike"]}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <LuLightbulb className="w-4 h-4 text-amber-500" />
                <h4 className="text-sm font-medium">Improvements</h4>
              </div>
              <p className="text-sm pl-6">{review["workshop-improve"]}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/10 flex justify-end">
        <p className="text-xs text-muted-foreground">
          Created on {dayjs(review.createdAt).format("MMM D, YYYY")}
        </p>
      </CardFooter>
    </Card>
  );
}
