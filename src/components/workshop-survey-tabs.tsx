"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LuStar, LuThumbsUp } from "react-icons/lu";
import dayjs from "dayjs";
import { WorkshopSurvey } from "@/types";
import { getWorkshopSurveys } from "@/firebase/services/institution";
import { QueryDocumentSnapshot, DocumentData } from "firebase/firestore";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";

export default function WorkshopSurveyTabs() {
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

      <h2 className="text-2xl font-bold tracking-tight">Course Reviews</h2>
      <div className="grid gap-6">
        {surveys.map((review) => (
          <ReviewCardTabs key={review.id} review={review} />
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

function ReviewCardTabs({ review }: { review: WorkshopSurvey }) {
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

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-muted/50 pb-4">
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
            {review["workshop-recommend"]}
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

          <Tabs defaultValue="likes" className="w-full">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="likes">Likes</TabsTrigger>
              <TabsTrigger value="dislikes">Dislikes</TabsTrigger>
              <TabsTrigger value="improvements">Improvements</TabsTrigger>
            </TabsList>
            <TabsContent value="likes" className="mt-4 space-y-2">
              <div className="flex items-start gap-2">
                <LuThumbsUp className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <p className="text-sm">{review["workshop-like"]}</p>
              </div>
            </TabsContent>
            <TabsContent value="dislikes" className="mt-4 space-y-2">
              <p className="text-sm">{review["workshop-dislike"]}</p>
            </TabsContent>
            <TabsContent value="improvements" className="mt-4 space-y-2">
              <p className="text-sm">{review["workshop-improve"]}</p>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-muted/20 flex justify-end">
        <p className="text-xs text-muted-foreground">
          Created on {dayjs(review.createdAt).format("MMM D, YYYY")}
        </p>
      </CardFooter>
    </Card>
  );
}
