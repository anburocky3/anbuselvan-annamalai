import { ReviewForm } from "@/components/review-form";
// import { EVENT_INSTITUTION_PRESETS } from "@/lib/utils";

/**
 * 🎓 EVENT INSTITUTION CONFIGURATION:
 * 
 * To lock the review form to a specific institution or campus in code for an event:
 * Set `CURRENT_EVENT_INSTITUTION` to any preset or custom institution string.
 * 
 * Example:
 * const CURRENT_EVENT_INSTITUTION = EVENT_INSTITUTION_PRESETS.SRMIST;
 * // or "SRMIST - Kattankulathur Campus"
 * // or "SRM Institute of Science and Technology (SRMIST)"
 * 
 * If left as `undefined`, attendees can search and pick any institution,
 * or you can pass `?institution=SRMIST` in the URL query string.
 */
const CURRENT_EVENT_INSTITUTION: string | undefined = undefined; // e.g. EVENT_INSTITUTION_PRESETS.SRMIST

interface PageProps {
  searchParams?: Promise<{
    institution?: string;
    campus?: string;
    lock?: string;
  }>;
}

export default async function EventReviews(props: PageProps) {
  const searchParams = await props.searchParams;
  const params = searchParams ? await searchParams : {};
  const activeInstitution =
    CURRENT_EVENT_INSTITUTION || params.institution || params.campus;
  const isLocked = Boolean(
    CURRENT_EVENT_INSTITUTION ||
      params.lock === "true" ||
      params.institution ||
      params.campus
  );

  return (
    <div className="space-y-6 py-10 px-4">
      <ReviewForm
        type="event"
        institution={activeInstitution}
        fixedInstitution={isLocked ? activeInstitution : undefined}
      />
    </div>
  );
}
