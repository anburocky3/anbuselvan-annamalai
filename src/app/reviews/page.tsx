import { LuCalendar, LuLink, LuYoutube } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";
import { route } from "@/config/routes";

export default function ReviewHome() {
  return (
    <>
      {/* Gradient Header */}
      <div className="relative h-[200px] bg-gradient-to-b from-blue-500 to-purple-400">
        <h1 className="text-center pt-16 text-white text-3xl font-semibold">
          Hi, I&apos;m Anbuselvan
        </h1>
      </div>

      {/* Profile Image - Positioned to overlap */}
      <div className="flex justify-center -mt-16 relative z-10">
        <div className="rounded-full border-4 border-white overflow-hidden h-32 w-32">
          <Image
            src="/images/anbuselvan-annamalai.png"
            alt="Profile picture"
            width={128}
            height={128}
            className="object-cover"
          />
        </div>
      </div>

      {/* Featured Links Card */}
      <div className="max-w-3xl mx-auto px-4 mt-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-800">
              Featured Links
            </h2>
            <Link
              href={route("home")}
              className="text-blue-500 text-sm font-medium hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              VISIT WEBSITE
            </Link>
          </div>

          {/* Links List */}
          <div className="space-y-4">
            {/* YouTube Reviews */}
            <Link href={route("youtube")} className="block">
              <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-red-50 text-red-500">
                  <LuYoutube size={20} />
                </div>
                <span className="ml-3 text-gray-700">YouTube Reviews</span>
                <div className="ml-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  40
                </div>
              </div>
            </Link>

            {/* Event Reviews */}
            <Link href={route("events")} className="block">
              <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-50 text-purple-500">
                  <LuCalendar size={20} />
                </div>
                <span className="ml-3 text-gray-700">Event Reviews</span>
              </div>
            </Link>

            {/* Social Links */}
            <Link href={route("reviewsAbout")} className="block">
              <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-50 text-blue-500">
                  <LuLink size={20} />
                </div>
                <span className="ml-3 text-gray-700">Social Links</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
