import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LuGithub, LuLinkedin, LuTwitter, LuYoutube } from "react-icons/lu";

export default function About() {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">About Me</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-center text-muted-foreground">
          Connect with me on social media and stay updated with my latest
          workshops and content.
        </p>
        <div className="flex justify-center gap-4">
          <Button variant="outline" size="icon" asChild>
            <Link href="https://twitter.com" target="_blank">
              <LuTwitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link href="https://github.com" target="_blank">
              <LuGithub className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link href="https://linkedin.com" target="_blank">
              <LuLinkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <Link href="https://youtube.com" target="_blank">
              <LuYoutube className="h-5 w-5" />
              <span className="sr-only">YouTube</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
