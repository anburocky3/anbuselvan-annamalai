"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Rating } from "react-custom-rating-component";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle2, RefreshCcw } from "lucide-react";
import { reviewSchema, type ReviewInput } from "@/lib/validations";

interface ReviewFormProps {
  type: "youtube" | "event";
}

export function ReviewForm({ type }: ReviewFormProps) {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReviewInput>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      institution: "S.A. Engineering College",
      type,
      isAnonymous: false,
      "rate-instructor": 0,
      "workshop-recommend": 0,
      "workshop-overall-rating": 0,
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

      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto shadow-xl border-muted/60 text-center py-12 animate-in zoom-in-95 fade-in duration-500">
        <CardContent className="space-y-6 flex flex-col items-center">
          <div className="rounded-full bg-green-500/10 p-4 ring-1 ring-green-500/30">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold tracking-tight">
              Thank You!
            </CardTitle>
            <CardDescription className="text-base max-w-md mx-auto">
              Your feedback has been successfully submitted. We appreciate your
              time and will use this to improve future workshops.
            </CardDescription>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center pb-0 mt-4">
          <Button
            variant="outline"
            onClick={() => {
              reset();
              setIsSubmitted(false);
            }}
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Submit Another Review
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto shadow-xl border-muted/60 transition-all duration-300">
      <CardHeader className="space-y-2 bg-muted/20 border-b border-border/50 pb-8 rounded-t-xl">
        <CardTitle className="text-3xl font-extrabold tracking-tight">
          {type === "youtube"
            ? "YouTube Workshop Review"
            : "Event Workshop Review"}
        </CardTitle>
        <CardDescription className="text-base">
          Your feedback helps us improve future sessions. Thank you for your
          time!
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Identity Section */}
          <div className="space-y-6 bg-card p-6 rounded-xl border border-border/50 shadow-sm">
            <div className="space-y-4">
              <Label className="text-base font-semibold">
                Would you like to submit anonymously?{" "}
                <span className="text-destructive">*</span>
              </Label>
              <RadioGroup
                defaultValue="named"
                onValueChange={(value) => setIsAnonymous(value === "anonymous")}
                className="flex items-center gap-8"
              >
                <div className="flex items-center space-x-2 cursor-pointer transition-opacity hover:opacity-80">
                  <RadioGroupItem value="named" id="named" />
                  <Label
                    htmlFor="named"
                    className="cursor-pointer font-medium text-base"
                  >
                    No, share my name
                  </Label>
                </div>
                <div className="flex items-center space-x-2 cursor-pointer transition-opacity hover:opacity-80">
                  <RadioGroupItem value="anonymous" id="anonymous" />
                  <Label
                    htmlFor="anonymous"
                    className="cursor-pointer font-medium text-base"
                  >
                    Yes, keep it anonymous
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {!isAnonymous && (
              <div className="grid gap-6 sm:grid-cols-2 pt-4 animate-in fade-in slide-in-from-top-4 duration-400">
                <div className="space-y-3">
                  <Label
                    htmlFor="name"
                    className="text-sm font-semibold text-foreground/80"
                  >
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="Rajini Kamal"
                    {...register("name")}
                    className="h-11 focus-visible:ring-primary/50 transition-shadow"
                  />
                  {errors.name && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-3">
                  <Label
                    htmlFor="institution"
                    className="text-sm font-semibold text-foreground/80"
                  >
                    Institution <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="institution"
                    {...register("institution")}
                    disabled
                    className="h-11 bg-muted/50 text-muted-foreground"
                  />
                  {errors.institution && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.institution.message}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Ratings Section */}
          <div className="space-y-8 px-2">
            <div className="space-y-3">
              <Label className="text-lg font-medium">
                How would you rate the workshop instructor?{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Controller
                name="rate-instructor"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Rating
                    count={5}
                    size="36px"
                    activeColor="#f59e0b"
                    defaultValue={value || 0}
                    onChange={onChange}
                  />
                )}
              />
              {errors["rate-instructor"] && (
                <p className="text-sm font-medium text-destructive">
                  {errors["rate-instructor"].message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label className="text-lg font-medium">
                How likely are you to recommend this to a friend or colleague?{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Controller
                name="workshop-recommend"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Rating
                    count={5}
                    size="36px"
                    activeColor="#f59e0b"
                    defaultValue={value || 0}
                    onChange={onChange}
                  />
                )}
              />
              {errors["workshop-recommend"] && (
                <p className="text-sm font-medium text-destructive">
                  {errors["workshop-recommend"].message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label className="text-lg font-medium">
                Overall, how would you rate the workshop?{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Controller
                name="workshop-overall-rating"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Rating
                    count={5}
                    size="40px"
                    activeColor="#f59e0b"
                    defaultValue={value || 0}
                    onChange={onChange}
                  />
                )}
              />
              {errors["workshop-overall-rating"] && (
                <p className="text-sm font-medium text-destructive">
                  {errors["workshop-overall-rating"].message}
                </p>
              )}
            </div>
          </div>

          {/* Text Feedback Section */}
          <div className="space-y-6 pt-6 border-t border-border/60">
            <div className="space-y-3">
              <Label htmlFor="workshop-like" className="text-lg font-medium">
                What did you like most about the workshop?{" "}
                <span className="text-destructive">*</span>
              </Label>
              <p className="text-sm text-muted-foreground mb-2">
                Feel free to mention specific topics, exercises, or teaching
                methods.
              </p>
              <Textarea
                id="workshop-like"
                placeholder="e.g., The hands-on examples were incredibly helpful..."
                {...register("workshop-like")}
                className="min-h-[120px] resize-y focus-visible:ring-primary/50 text-base p-4"
              />
              {errors["workshop-like"] && (
                <p className="text-sm font-medium text-destructive">
                  {errors["workshop-like"].message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="workshop-dislike" className="text-lg font-medium">
                What could we improve?{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="workshop-dislike"
                placeholder="e.g., I wish we spent a bit more time on the advanced configurations..."
                {...register("workshop-dislike")}
                className="min-h-[120px] resize-y focus-visible:ring-primary/50 text-base p-4"
              />
              {errors["workshop-dislike"] && (
                <p className="text-sm font-medium text-destructive">
                  {errors["workshop-dislike"].message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="workshop-improve" className="text-lg font-medium">
                Anything else you&apos;d like to share?{" "}
                <span className="text-muted-foreground font-normal text-sm ml-1">
                  (optional)
                </span>
              </Label>
              <Textarea
                id="workshop-improve"
                placeholder="Any future topics you'd like to see, or general feedback..."
                {...register("workshop-improve")}
                className="min-h-[120px] resize-y focus-visible:ring-primary/50 text-base p-4"
              />
              {errors["workshop-improve"] && (
                <p className="text-sm font-medium text-destructive">
                  {errors["workshop-improve"].message}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full h-14 text-lg font-semibold transition-all hover:scale-[1.02] active:scale-95"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                Submitting Review...
              </>
            ) : (
              "Submit Review"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
