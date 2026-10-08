import * as React from "react";
import { cn } from "@/lib/utils";
import { withBase } from "@/lib/config/paths";

/**
 * Lightweight markdown-lite renderer for editorial prose.
 * Supports: ## h2, ### h3, > blockquote, - / * bullets, 1. ordered,
 * **bold**, *italic*, `inline code`, [link](url), --- hr, and paragraphs.
 * NOT a full markdown parser — intentionally minimal & safe (no raw HTML).
 */

interface MarkdownProps {
  content: string;
  className?: string;
}

export function Markdown({ content, className }: MarkdownProps) {
  const blocks = parseBlocks(content);
  return (
    <div className={cn("prose-editorial", className)}>
      {blocks.map((block, i) => renderBlock(block, i))}
    </div>
  );
}

type Block =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "hr" }
  | { type: "quote"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "p"; text: string };

function parseBlocks(src: string): Block[] {
  const lines = src.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed === "") {
      i++;
      continue;
    }
    if (trimmed === "---" || trimmed === "***") {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }
    if (trimmed.startsWith("### ")) {
      blocks.push({ type: "h3", text: trimmed.slice(4) });
      i++;
      continue;
    }
    if (trimmed.startsWith("## ")) {
      blocks.push({ type: "h2", text: trimmed.slice(3) });
      i++;
      continue;
    }
    if (trimmed.startsWith("> ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("> ")) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push({ type: "quote", text: items.join(" ") });
      continue;
    }
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const items: string[] = [];
      while (
        i < lines.length &&
        (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))
      ) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      blocks.push({ type: "ul", items });
      continue;
    }
    if (/^\d+\.\s/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ""));
        i++;
      }
      blocks.push({ type: "ol", items });
      continue;
    }
    // paragraph: collect until blank line or block start
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].trim().startsWith("#") &&
      !lines[i].trim().startsWith("> ") &&
      !lines[i].trim().startsWith("- ") &&
      !lines[i].trim().startsWith("* ") &&
      !/^\d+\.\s/.test(lines[i].trim()) &&
      lines[i].trim() !== "---" &&
      lines[i].trim() !== "***"
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }
    if (paraLines.length) {
      blocks.push({ type: "p", text: paraLines.join(" ") });
    }
  }
  return blocks;
}

function renderBlock(block: Block, key: number): React.ReactNode {
  switch (block.type) {
    case "h2":
      return <h2 key={key}>{renderInline(block.text)}</h2>;
    case "h3":
      return <h3 key={key}>{renderInline(block.text)}</h3>;
    case "hr":
      return <hr key={key} />;
    case "quote":
      return <blockquote key={key}>{renderInline(block.text)}</blockquote>;
    case "ul":
      return (
        <ul key={key}>
          {block.items.map((it, i) => (
            <li key={i}>{renderInline(it)}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={key}>
          {block.items.map((it, i) => (
            <li key={i}>{renderInline(it)}</li>
          ))}
        </ol>
      );
    case "p":
      return <p key={key}>{renderInline(block.text)}</p>;
  }
}

/** Render inline markdown: **bold**, *italic*, `code`, [link](url) */
function renderInline(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // tokenize with a combined regex
  const regex = /(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\))/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = regex.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[2] !== undefined) {
      nodes.push(<strong key={k++}>{m[2]}</strong>);
    } else if (m[3] !== undefined) {
      nodes.push(<em key={k++}>{m[3]}</em>);
    } else if (m[4] !== undefined) {
      nodes.push(<code key={k++}>{m[4]}</code>);
    } else if (m[5] !== undefined && m[6] !== undefined) {
      const rawHref = m[6];
      const isExternal = /^https?:/.test(rawHref);
      const href = isExternal ? rawHref : withBase(rawHref);
      nodes.push(
        <a
          key={k++}
          href={href}
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {m[5]}
        </a>
      );
    }
    last = regex.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}
