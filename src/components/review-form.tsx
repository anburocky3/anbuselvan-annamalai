"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Rating } from "react-custom-rating-component";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { reviewSchema, type ReviewInput } from "@/lib/validations";

interface ReviewFormProps {
  type: "youtube" | "event";
}

export function ReviewForm({ type }: ReviewFormProps) {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewInput>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      type,
      isAnonymous: false,
    },
  });

  const onSubmit = async (data: ReviewInput) => {
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to submit review");
      // Handle success (e.g., show success message, redirect)
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>
          {type === "youtube"
            ? "YouTube Workshop Review"
            : "Event Workshop Review"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label>Would you like to submit anonymously?</Label>
              <RadioGroup
                defaultValue="named"
                onValueChange={(value) => setIsAnonymous(value === "anonymous")}
                className="flex items-center gap-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="named" id="named" />
                  <Label htmlFor="named">No</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="anonymous" id="anonymous" />
                  <Label htmlFor="anonymous">Yes</Label>
                </div>
              </RadioGroup>
            </div>

            {!isAnonymous && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" {...register("fullName")} />
                  {errors.fullName && (
                    <p className="text-sm text-red-500">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="institution">Institution</Label>
                  <Input id="institution" {...register("institution")} />
                  {errors.institution && (
                    <p className="text-sm text-red-500">
                      {errors.institution.message}
                    </p>
                  )}
                </div>
              </>
            )}

            <div className="space-y-2">
              <Label>How would you rate the workshop instructor?</Label>
              <Rating
                count={5}
                size={"24px"}
                activeColor="#ffd700"
                defaultValue={2.5}
                onChange={(newRating) => console.log("newRating", newRating)}
                onHover={(hoveredRating) =>
                  console.log("hoveredRating", hoveredRating)
                }
              />
            </div>

            <div className="space-y-2">
              <Label>
                How likely is it that you would recommend the workshop to a
                friend or colleague?
              </Label>
              <Rating
                count={5}
                size={"24px"}
                activeColor="#ffd700"
                defaultValue={2.5}
                onChange={(newRating) => console.log("newRating", newRating)}
                onHover={(hoveredRating) =>
                  console.log("hoveredRating", hoveredRating)
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Overall, how would you rate the workshop?</Label>
              <Rating
                count={5}
                size={"24px"}
                activeColor="#ffd700"
                defaultValue={2.5}
                onChange={(newRating) => console.log("newRating", newRating)}
                onHover={(hoveredRating) =>
                  console.log("hoveredRating", hoveredRating)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="liked">
                What did you like about the workshop?
              </Label>
              <Textarea
                id="liked"
                {...register("liked")}
                className="min-h-[100px]"
              />
              {errors.liked && (
                <p className="text-sm text-red-500">{errors.liked.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="disliked">
                What did you dislike about the workshop?
              </Label>
              <Textarea
                id="disliked"
                {...register("disliked")}
                className="min-h-[100px]"
              />
              {errors.disliked && (
                <p className="text-sm text-red-500">
                  {errors.disliked.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="additional">
                Is there anything else you&apos;d like to share?
              </Label>
              <Textarea
                id="additional"
                {...register("additional")}
                className="min-h-[100px]"
              />
              {errors.additional && (
                <p className="text-sm text-red-500">
                  {errors.additional.message}
                </p>
              )}
            </div>
          </div>

          <Button type="submit" variant="default" className="w-full">
            Submit Review
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
