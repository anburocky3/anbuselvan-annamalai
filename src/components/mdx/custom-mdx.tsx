import { MDXRemote } from "next-mdx-remote/rsc";
import { highlight } from "sugar-high";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import CodeBlockClient from "./CodeBlockClient";

// Code block component with syntax highlighting and copy button
function CodeBlock({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const language = className ? className.replace(/language-/, "") : "";
  const highlightedCode = highlight(children);

  return (
    <CodeBlockClient code={children}>
      <code
        className={`language-${language} text-sm`}
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />
    </CodeBlockClient>
  );
}

// Custom link component
function CustomLink({
  href,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  if (href?.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  if (href?.startsWith("#")) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

// Enhanced image component
function CustomImage({ src, alt }: { src: string; alt: string }) {
  if (!src) return null;

  return (
    <Image
      src={src}
      alt={alt || ""}
      width={720}
      height={400}
      className="rounded-lg my-4"
    />
  );
}

// Custom components for MDX
const components = {
  // Handle code blocks with syntax highlighting
  code: CodeBlock,

  // Custom pre element for code blocks
  pre: ({ children }: { children: React.ReactNode }) => {
    return (
      <pre className="relative my-4 p-4 overflow-auto rounded-lg">
        {children}
      </pre>
    );
  },

  // Link handling
  a: CustomLink,

  // Enhanced image component
  img: CustomImage,
};

interface CustomMDXProps {
  source: string | React.ReactNode;
}

export function CustomMDX({ source }: CustomMDXProps) {
  // If source is already a React element, return it directly
  if (React.isValidElement(source)) {
    return source;
  }

  // Otherwise use MDXRemote to render the string content
  return (
    <div className="mdx-content">
      <MDXRemote source={source as string} components={components} />
    </div>
  );
}
