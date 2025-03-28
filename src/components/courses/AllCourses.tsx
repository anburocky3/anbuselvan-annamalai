"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Collapsible } from "@/components/ui/collapsible";
import { Grid, List, Clock } from "lucide-react";
import Image from "next/image";
import { playlists } from "@/data/playlists";
import Link from "next/link";

export default function CourseComponent() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);

  const toggleCourseExpansion = (courseId: string) => {
    setExpandedCourseId(expandedCourseId === courseId ? null : courseId);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          <span>Anbuselvan Tutorials</span>
          <span className="text-gray-400 text-sm mt-1">(CyberDude)</span>
        </h1>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "outline" : "default"}
            size="icon"
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
            title="Grid view"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "outline" : "default"}
            size="icon"
            onClick={() => setViewMode("list")}
            aria-label="List view"
            title="List view"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-6"
        }
      >
        {playlists.map((playlist) => (
          <Collapsible
            key={playlist.id}
            open={expandedCourseId === playlist.id}
            onOpenChange={() => toggleCourseExpansion(playlist.id)}
            className={`transition-all duration-300 ${
              viewMode === "list" ? "block" : ""
            }`}
          >
            <Card
              className={`h-full overflow-hidden hover:shadow-lg transition-shadow ${
                expandedCourseId === playlist.id ? "shadow-md" : ""
              }`}
            >
              <Link href={`/tutorials/${playlist.slug}`}>
                <div
                  className={
                    viewMode === "list" ? "flex flex-col md:flex-row" : ""
                  }
                >
                  <div
                    className={`relative ${
                      viewMode === "list" ? "md:w-1/3" : "w-full"
                    }`}
                  >
                    <Image
                      src={playlist.thumbnail || "/placeholder.svg"}
                      alt={playlist.title}
                      width={350}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-blue-500">
                      {playlist.level}
                    </Badge>
                  </div>

                  <div className={viewMode === "list" ? "md:w-2/3" : "w-full"}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold line-clamp-2">
                            {playlist.title}
                          </h3>
                          <div className="flex items-center mt-2 space-x-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={playlist.author.avatar}
                                alt={playlist.author.name}
                              />
                              <AvatarFallback>
                                {playlist.author.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">
                              {playlist.author.name}
                            </span>
                          </div>
                        </div>
                        {/* <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="icon">
                            {expandedCourseId === playlist.id ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                        </CollapsibleTrigger> */}
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="text-muted-foreground line-clamp-2">
                        {playlist.description}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-sm font-medium flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {playlist.totalDuration}
                        </span>
                        <span className="text-sm font-medium">
                          {playlist.videos.length} videos
                        </span>
                      </div>
                    </CardContent>
                  </div>
                </div>
              </Link>

              {/* <CollapsibleContent>
                <CardContent className="pt-0">
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Course Content</h4>
                    <ul className="space-y-3">
                      {playlist.videos.map((video) => (
                        <li
                          key={video.id}
                          className="flex items-center justify-between p-2 rounded-md hover:bg-muted group"
                        >
                          <div className="flex items-center gap-2">
                            <div className="bg-primary/10 rounded-full p-1.5 group-hover:bg-primary/20 transition-colors">
                              <Play className="h-3.5 w-3.5 text-primary" />
                            </div>
                            <span>{video.title}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {video.duration}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link
                      href={`https://www.youtube.com/playlist?list=${playlist.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Youtube className="mr-2 h-4 w-4" />
                      Watch on YouTube
                    </Link>
                  </Button>
                </CardFooter>
              </CollapsibleContent> */}
            </Card>
          </Collapsible>
        ))}
      </div>
    </div>
  );
}
