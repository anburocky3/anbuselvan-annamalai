"use client";

import { useState, useEffect, useMemo } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  LayoutDashboard,
  QrCode,
  Building2,
  Link as LinkIcon,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

import ProtectedRoute from "@/components/protected-route";
import WorkshopSurveyTabs from "@/components/workshop-survey-tabs";
import WorkshopSurveyDetailed from "@/components/workshop-survey";
import { WorkshopSurveyTable } from "@/components/workshop-survey-table";
import { ReviewInput } from "@/lib/validations";

export default function AdminDashboard() {
  const [reviews, setReviews] = useState<ReviewInput[]>([]);
  const [loading, setLoading] = useState(true);
  const [originUrl, setOriginUrl] = useState("");
  const [selectedInstitution, setSelectedInstitution] = useState<string>("all");

  // Safely get the origin URL only on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setOriginUrl(window.location.origin);
    }
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("/api/reviews");
        if (!response.ok) throw new Error("Failed to fetch reviews");
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Extract unique institutions from the data for the dropdown
  const uniqueInstitutions = useMemo(() => {
    const institutions = reviews
      .map((r) => r.institution)
      .filter((inst) => inst && inst.trim() !== "");
    return Array.from(new Set(institutions));
  }, [reviews]);

  // Filter reviews based on the selected institution
  const filteredReviews = useMemo(() => {
    if (selectedInstitution === "all") return reviews;
    return reviews.filter((r) => r.institution === selectedInstitution);
  }, [reviews, selectedInstitution]);

  // Helper to color-code ratings
  const getRatingColor = (rating: number) => {
    if (rating >= 4)
      return "bg-green-500/15 text-green-700 hover:bg-green-500/25 border-green-200";
    if (rating === 3)
      return "bg-yellow-500/15 text-yellow-700 hover:bg-yellow-500/25 border-yellow-200";
    return "bg-red-500/15 text-red-700 hover:bg-red-500/25 border-red-200";
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-8 space-y-8 max-w-7xl">
        {/* Header & Global Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-border/60">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
              <LayoutDashboard className="h-8 w-8 text-primary" />
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage and analyze workshop feedback
            </p>
          </div>

          <div className="w-full md:w-72 space-y-2">
            <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
              <Building2 className="w-4 h-4" /> Filter by Institution
            </label>
            <Select
              value={selectedInstitution}
              onValueChange={setSelectedInstitution}
              disabled={loading || uniqueInstitutions.length === 0}
            >
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="All Institutions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Institutions</SelectItem>
                {uniqueInstitutions.map((inst) => (
                  <SelectItem key={inst} value={inst}>
                    {inst}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* QR Codes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="overflow-hidden shadow-sm border-muted/60">
            <CardHeader className="bg-muted/30 pb-4">
              <CardTitle className="text-lg flex items-center justify-between">
                YouTube Workshop URL
                <QrCode className="w-5 h-5 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 flex flex-col sm:flex-row items-center gap-6">
              <div className="p-3 bg-white rounded-xl shadow-sm border">
                {originUrl ? (
                  <QRCodeSVG
                    value={`${originUrl}/youtube-reviews`}
                    size={110}
                  />
                ) : (
                  <Skeleton className="w-[110px] h-[110px]" />
                )}
              </div>
              <div className="space-y-3 flex-1 text-center sm:text-left">
                <p className="text-sm text-muted-foreground">
                  Scan this code to jump directly to the YouTube review form.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full sm:w-auto"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `${originUrl}/youtube-reviews`,
                    )
                  }
                >
                  <LinkIcon className="w-4 h-4 mr-2" /> Copy Link
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden shadow-sm border-muted/60">
            <CardHeader className="bg-muted/30 pb-4">
              <CardTitle className="text-lg flex items-center justify-between">
                Event Workshop URL
                <QrCode className="w-5 h-5 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 flex flex-col sm:flex-row items-center gap-6">
              <div className="p-3 bg-white rounded-xl shadow-sm border">
                {originUrl ? (
                  <QRCodeSVG value={`${originUrl}/event-reviews`} size={110} />
                ) : (
                  <Skeleton className="w-[110px] h-[110px]" />
                )}
              </div>
              <div className="space-y-3 flex-1 text-center sm:text-left">
                <p className="text-sm text-muted-foreground">
                  Scan this code to jump directly to the Event review form.
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full sm:w-auto"
                  onClick={() =>
                    navigator.clipboard.writeText(`${originUrl}/event-reviews`)
                  }
                >
                  <LinkIcon className="w-4 h-4 mr-2" /> Copy Link
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Existing Custom Components */}
        <div className="space-y-8">
          <WorkshopSurveyTable />
          <WorkshopSurveyDetailed />
          <WorkshopSurveyTabs />
        </div>

        {/* Modernized Reviews Table */}
        <Card className="shadow-md border-muted/60">
          <CardHeader>
            <CardTitle>Raw Review Data</CardTitle>
            <CardDescription>
              {selectedInstitution === "all"
                ? "Showing all submitted reviews across all institutions."
                : `Showing reviews specifically for ${selectedInstitution}.`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            ) : filteredReviews.length === 0 ? (
              <div className="text-center py-12 bg-muted/20 rounded-lg border border-dashed border-border text-muted-foreground">
                No reviews found for this selection.
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader className="bg-muted/30">
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Institution</TableHead>
                      <TableHead className="text-center">Instructor</TableHead>
                      <TableHead className="text-center">Overall</TableHead>
                      <TableHead className="text-center">Recommend</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReviews.map((review, index) => (
                      <TableRow
                        key={index}
                        className="hover:bg-muted/10 transition-colors"
                      >
                        <TableCell className="capitalize font-medium">
                          {review.type}
                        </TableCell>
                        <TableCell>
                          {review.isAnonymous ? (
                            <span className="text-muted-foreground italic">
                              Anonymous
                            </span>
                          ) : (
                            review.name
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {review.institution}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant="outline"
                            className={getRatingColor(
                              review["rate-instructor"],
                            )}
                          >
                            {review["rate-instructor"]} / 5
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant="outline"
                            className={getRatingColor(
                              review["workshop-overall-rating"],
                            )}
                          >
                            {review["workshop-overall-rating"]} / 5
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant="outline"
                            className={getRatingColor(
                              review["workshop-recommend"],
                            )}
                          >
                            {review["workshop-recommend"]} / 5
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
