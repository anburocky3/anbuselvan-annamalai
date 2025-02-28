import Image from "next/image";

interface TechnologyMarqueeProps {
  title: string;
}

export default function TechnologyMarquee({ title }: TechnologyMarqueeProps) {
  return (
    <div>
      <div className="flex items-center space-x-10">
        <Image
          width={0}
          height={0}
          src="/images/site/icons/star.svg"
          alt="Icon"
          className="ml-10 w-5 h-5"
        />
        <h5 className="font-semibold text-white text-xl uppercase shadow-lg hover:text-primary cursor-pointer">
          {title}
        </h5>
      </div>
    </div>
  );
}
