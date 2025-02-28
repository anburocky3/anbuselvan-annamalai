"use client";

import { Card, CardTitle } from "@/components/ui/card";
import { QRCodeSVG } from "qrcode.react";
// import type { ReviewInput } from "@/lib/validations";
import { Separator } from "@/components/ui/separator";
// import ReviewList from "./review-list";
import WorkshopSurveyTabs from "@/components/workshop-survey-tabs";
import ProtectedRoute from "@/components/protected-route";
import { useState, useEffect } from "react";

export default function AdminDashboard() {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  // const [reviews, setReviews] = useState<ReviewInput[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchReviews = async () => {
  //     try {
  //       const response = await fetch("/api/reviews");
  //       if (!response.ok) throw new Error("Failed to fetch reviews");
  //       const data = await response.json();
  //       setReviews(data);
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchReviews();
  // }, []);

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-4">
            <Card className="p-4">
              <CardTitle className="text-sm text-muted-foreground mb-2">
                YouTube Review QR
              </CardTitle>
              <QRCodeSVG value={`${origin}/youtube-reviews`} size={100} />
            </Card>
            <Card className="p-4">
              <CardTitle className="text-sm text-muted-foreground mb-2">
                Event Review QR
              </CardTitle>
              <QRCodeSVG value={`${origin}/event-reviews`} size={100} />
            </Card>
          </div>
        </div>

        {/* <Card>
          <CardHeader>
            <CardTitle>Workshop Surveys</CardTitle>
          </CardHeader>
          <CardContent>
            <WorkshopSurveyTable />
          </CardContent>
        </Card> */}

        {/* <Separator /> */}
        {/* <ReviewListView /> */}

        {/* <Separator /> */}
        {/* <WorkshopSurveyDetailed /> */}

        <Separator />

        <WorkshopSurveyTabs />

        {/* <Card>
          <CardHeader>
            <CardTitle>All Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Institution</TableHead>
                    <TableHead>Instructor Rating</TableHead>
                    <TableHead>Overall Rating</TableHead>
                    <TableHead>Recommendation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reviews.map((review, index) => (
                    <TableRow key={index}>
                      <TableCell className="capitalize">{review.type}</TableCell>
                      <TableCell>
                        {review.isAnonymous ? "Anonymous" : review.fullName}
                      </TableCell>
                      <TableCell>
                        {review.isAnonymous ? "-" : review.institution}
                      </TableCell>
                      <TableCell>{review.instructorRating}</TableCell>
                      <TableCell>{review.overallRating}</TableCell>
                      <TableCell>{review.recommendation}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card> */}
      </div>
    </ProtectedRoute>
  );
}
