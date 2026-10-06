"use client";

import { useState, useMemo, useEffect } from "react";
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
import { LuLock } from "react-icons/lu";
import { reviewSchema, type ReviewInput } from "@/lib/validations";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { institutions } from "@/lib/utils";
import { useTheme } from "@/components/theme/theme-provider";
import { ThemeToggle } from "@/components/theme/theme-toggle";

interface ReviewFormProps {
  type: "youtube" | "event";
  institution?: string;
  fixedInstitution?: string;
  allowedInstitutions?: readonly string[] | string[];
  lockInstitution?: boolean;
}

export function ReviewForm({
  type,
  institution,
  fixedInstitution,
  allowedInstitutions,
  lockInstitution = false,
}: ReviewFormProps) {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { resolvedTheme } = useTheme();

  // Determine if a fixed institution is specified
  const effectiveFixedInstitution =
    fixedInstitution || (lockInstitution && institution ? institution : undefined);
  const isLocked = Boolean(effectiveFixedInstitution);

  // Available options:
  // - If allowedInstitutions provided, use that list
  // - If locked to a single institution, offer only that institution
  // - Otherwise use full list of institutions
  const selectableInstitutions = useMemo(() => {
    if (allowedInstitutions && allowedInstitutions.length > 0) {
      return allowedInstitutions;
    }
    if (effectiveFixedInstitution) {
      return [effectiveFixedInstitution];
    }
    return institutions;
  }, [allowedInstitutions, effectiveFixedInstitution]);

  const initialInstitution =
    effectiveFixedInstitution ||
    institution ||
    selectableInstitutions[0] ||
    "S.A. Engineering College";

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ReviewInput>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      institution: initialInstitution,
      type,
      isAnonymous: false,
      "rate-instructor": 0,
      "workshop-recommend": 0,
      "workshop-overall-rating": 0,
    },
  });

  // Ensure form state stays synced if fixedInstitution changes
  useEffect(() => {
    if (effectiveFixedInstitution) {
      setValue("institution", effectiveFixedInstitution);
    }
  }, [effectiveFixedInstitution, setValue]);

  const onSubmit = async (data: ReviewInput) => {
    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to submit review");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      } );
      
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  const starUnselectedColor = resolvedTheme === "dark" ? "#475569" : "#cbd5e1";

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto rounded-3xl shadow-xl dark:shadow-2xl dark:shadow-purple-950/20 bg-white/95 dark:bg-slate-900/95 border-slate-200/90 dark:border-slate-800 text-center py-12 animate-in zoom-in-95 fade-in duration-500">
        <CardContent className="space-y-6 flex flex-col items-center">
          <div className="rounded-full bg-emerald-500/10 p-4 ring-1 ring-emerald-500/30">
            <CheckCircle2 className="w-16 h-16 text-emerald-500" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Thank You!
            </CardTitle>
            <CardDescription className="text-base text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              Your feedback has been successfully submitted. We appreciate your
              time and will use this to improve future workshops.
            </CardDescription>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center pb-0 mt-4">
          <Button
            variant="outline"
            className="rounded-full border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100"
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
    <Card className="max-w-2xl mx-auto rounded-3xl shadow-xl dark:shadow-2xl dark:shadow-purple-950/20 bg-white/95 dark:bg-slate-900/95 border-slate-200/90 dark:border-slate-800 backdrop-blur-md transition-colors duration-300">
      <CardHeader className="space-y-3 bg-slate-50/70 dark:bg-slate-800/40 border-b border-slate-200/80 dark:border-slate-800 pb-7 rounded-t-3xl">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
            {type === "youtube" ? "YouTube Review" : "Event Workshop Review"}
          </span>
          <ThemeToggle size="sm" />
        </div>
        <CardTitle className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {type === "youtube"
            ? "YouTube Workshop Review"
            : "Event Workshop Review"}
        </CardTitle>
        <CardDescription className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Your feedback helps us improve future sessions and content. Thank you for your time!
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-8 px-5 sm:px-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-9">
          {/* Identity Section */}
          <div className="space-y-6 bg-slate-50/60 dark:bg-slate-800/40 p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800">
            <div className="space-y-3">
              <Label className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100">
                Would you like to submit anonymously?{" "}
                <span className="text-destructive">*</span>
              </Label>
              <RadioGroup
                defaultValue="named"
                onValueChange={(value) => setIsAnonymous(value === "anonymous")}
                className="flex items-center gap-6 sm:gap-8 pt-1"
              >
                <div className="flex items-center space-x-2.5 cursor-pointer transition-opacity hover:opacity-85">
                  <RadioGroupItem value="named" id="named" />
                  <Label
                    htmlFor="named"
                    className="cursor-pointer font-medium text-sm sm:text-base text-slate-800 dark:text-slate-200"
                  >
                    No, share my name
                  </Label>
                </div>
                <div className="flex items-center space-x-2.5 cursor-pointer transition-opacity hover:opacity-85">
                  <RadioGroupItem value="anonymous" id="anonymous" />
                  <Label
                    htmlFor="anonymous"
                    className="cursor-pointer font-medium text-sm sm:text-base text-slate-800 dark:text-slate-200"
                  >
                    Yes, keep it anonymous
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Named vs Anonymous Fields */}
            {!isAnonymous ? (
              <div className="grid gap-5 sm:grid-cols-2 pt-2 animate-in fade-in slide-in-from-top-3 duration-300">
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-semibold text-slate-800 dark:text-slate-200"
                  >
                    Full Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="e.g. Rajinikanth"
                    {...register("name")}
                    className="h-11 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-purple-500/30 focus-visible:border-purple-500"
                  />
                  {errors.name && (
                    <p className="text-xs sm:text-sm font-medium text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="institution"
                      className="text-sm font-semibold text-slate-800 dark:text-slate-200"
                    >
                      Institution / College <span className="text-destructive">*</span>
                    </Label>
                    {isLocked && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                        <LuLock className="w-3 h-3" />
                        Selected Event
                      </span>
                    )}
                  </div>
                  <Controller
                    name="institution"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <SearchableSelect
                        id="institution"
                        options={selectableInstitutions}
                        value={value || ""}
                        onChange={onChange}
                        disabled={isLocked}
                        placeholder={
                          isLocked
                            ? effectiveFixedInstitution
                            : "Select or search institution..."
                        }
                        searchPlaceholder="Type to filter institutions..."
                        error={!!errors.institution}
                      />
                    )}
                  />
                  {isLocked && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Configured for attendees of{" "}
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {effectiveFixedInstitution}
                      </span>
                      .
                    </p>
                  )}
                  {errors.institution && (
                    <p className="text-xs sm:text-sm font-medium text-destructive">
                      {errors.institution.message}
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-2 pt-2 animate-in fade-in duration-300">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="institution"
                    className="text-sm font-semibold text-slate-800 dark:text-slate-200"
                  >
                    Institution / College <span className="text-destructive">*</span>
                  </Label>
                  {isLocked && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                      <LuLock className="w-3 h-3" />
                      Selected Event
                    </span>
                  )}
                </div>
                <Controller
                  name="institution"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <SearchableSelect
                      id="institution"
                      options={selectableInstitutions}
                      value={value || ""}
                      onChange={onChange}
                      disabled={isLocked}
                      placeholder={
                        isLocked
                          ? effectiveFixedInstitution
                          : "Select or search institution..."
                      }
                      searchPlaceholder="Type to filter institutions..."
                      error={!!errors.institution}
                    />
                  )}
                />
                {isLocked && (
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Configured for attendees of{" "}
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {effectiveFixedInstitution}
                    </span>
                    .
                  </p>
                )}
                {errors.institution && (
                  <p className="text-xs sm:text-sm font-medium text-destructive">
                    {errors.institution.message}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Ratings Section */}
          <div className="space-y-7 px-1">
            <div className="space-y-2.5">
              <Label className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">
                How would you rate the workshop instructor?{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Controller
                name="rate-instructor"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <div className="py-1">
                    <Rating
                      count={5}
                      size="36px"
                      activeColor="#f59e0b"
                      defaultColor={starUnselectedColor}
                      defaultValue={value || 0}
                      onChange={onChange}
                    />
                  </div>
                )}
              />
              {errors["rate-instructor"] && (
                <p className="text-xs sm:text-sm font-medium text-destructive">
                  {errors["rate-instructor"].message}
                </p>
              )}
            </div>

            <div className="space-y-2.5">
              <Label className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">
                How likely are you to recommend this to a friend or colleague?{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Controller
                name="workshop-recommend"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <div className="py-1">
                    <Rating
                      count={5}
                      size="36px"
                      activeColor="#f59e0b"
                      defaultColor={starUnselectedColor}
                      defaultValue={value || 0}
                      onChange={onChange}
                    />
                  </div>
                )}
              />
              {errors["workshop-recommend"] && (
                <p className="text-xs sm:text-sm font-medium text-destructive">
                  {errors["workshop-recommend"].message}
                </p>
              )}
            </div>

            <div className="space-y-2.5">
              <Label className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">
                Overall, how would you rate the workshop?{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Controller
                name="workshop-overall-rating"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <div className="py-1">
                    <Rating
                      count={5}
                      size="40px"
                      activeColor="#f59e0b"
                      defaultColor={starUnselectedColor}
                      defaultValue={value || 0}
                      onChange={onChange}
                    />
                  </div>
                )}
              />
              {errors["workshop-overall-rating"] && (
                <p className="text-xs sm:text-sm font-medium text-destructive">
                  {errors["workshop-overall-rating"].message}
                </p>
              )}
            </div>
          </div>

          {/* Text Feedback Section */}
          <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="space-y-2.5">
              <Label
                htmlFor="workshop-like"
                className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100"
              >
                What did you like most about the workshop?{" "}
                <span className="text-destructive">*</span>
              </Label>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Feel free to mention specific topics, exercises, or teaching methods.
              </p>
              <Textarea
                id="workshop-like"
                placeholder="e.g., The hands-on examples were incredibly helpful..."
                {...register("workshop-like")}
                className="min-h-[120px] resize-y bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-purple-500/30 focus-visible:border-purple-500 text-sm sm:text-base p-4 rounded-xl"
              />
              {errors["workshop-like"] && (
                <p className="text-xs sm:text-sm font-medium text-destructive">
                  {errors["workshop-like"].message}
                </p>
              )}
            </div>

            <div className="space-y-2.5">
              <Label
                htmlFor="workshop-dislike"
                className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100"
              >
                What could we improve?{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="workshop-dislike"
                placeholder="e.g., I wish we spent a bit more time on the advanced configurations..."
                {...register("workshop-dislike")}
                className="min-h-[120px] resize-y bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-purple-500/30 focus-visible:border-purple-500 text-sm sm:text-base p-4 rounded-xl"
              />
              {errors["workshop-dislike"] && (
                <p className="text-xs sm:text-sm font-medium text-destructive">
                  {errors["workshop-dislike"].message}
                </p>
              )}
            </div>

            <div className="space-y-2.5">
              <Label
                htmlFor="workshop-improve"
                className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100"
              >
                Anything else you&apos;d like to share?{" "}
                <span className="text-slate-400 dark:text-slate-500 font-normal text-xs sm:text-sm ml-1">
                  (optional)
                </span>
              </Label>
              <Textarea
                id="workshop-improve"
                placeholder="Any future topics you'd like to see, or general feedback..."
                {...register("workshop-improve")}
                className="min-h-[120px] resize-y bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-purple-500/30 focus-visible:border-purple-500 text-sm sm:text-base p-4 rounded-xl"
              />
              {errors["workshop-improve"] && (
                <p className="text-xs sm:text-sm font-medium text-destructive">
                  {errors["workshop-improve"].message}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full h-13 sm:h-14 text-base sm:text-lg font-semibold rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-500/25 dark:shadow-purple-950/50 transition-all hover:scale-[1.01] active:scale-98 cursor-pointer disabled:opacity-60"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
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
