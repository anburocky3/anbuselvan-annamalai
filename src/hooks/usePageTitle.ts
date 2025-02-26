import { useEffect } from "react";
import { generatePageTitle } from "@/lib/utils";

export const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = generatePageTitle(title);
    return () => {
      document.title = generatePageTitle(""); // Reset to default on unmount
    };
  }, [title]);
};
