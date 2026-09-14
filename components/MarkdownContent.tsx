import Link from 'next/link';
import type { ReactNode } from 'react';

// Renders the small markdown subset used in POSTS[].content: "### " headers,
// blank-line-separated paragraphs (including consecutive single-line
// paragraphs within one block, used for FAQ Q&A lists), "- " and "1. " lists,
// "**bold**", and "[text](url)" links. Content is first-party authored site
// config, not user input, so a small first-party parser is safer here than
// dangerouslySetInnerHTML + a full markdown library.

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const regex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('[')) {
      const linkMatch = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        const [, label, href] = linkMatch;
        parts.push(
          href.startsWith('/') ? (
            <Link key={`${keyPrefix}-${i}`} href={href} className="text-amber-400 hover:text-amber-300 underline underline-offset-2">
              {label}
            </Link>
          ) : (
            <a key={`${keyPrefix}-${i}`} href={href} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 underline underline-offset-2">
              {label}
            </a>
          )
        );
      }
    } else {
      parts.push(
        <strong key={`${keyPrefix}-${i}`} className="text-white font-semibold">
          {token.slice(2, -2)}
        </strong>
      );
    }
    lastIndex = regex.lastIndex;
    i++;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

export default function MarkdownContent({ content }: { content: string }) {
  const blocks = content.trim().split(/\n\n+/);
  const nodes: ReactNode[] = [];

  blocks.forEach((block, blockIdx) => {
    const lines = block.trim().split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) return;

    // A "### Heading" is authored on its own line, immediately followed by
    // its paragraph (and sometimes a bullet/numbered list right after, with
    // no blank line in between) — so the heading and its body share one
    // block. Peel the heading line off first, then walk whatever body lines
    // remain, grouping consecutive "- " / "N. " lines into real lists and
    // everything else into paragraphs.
    let bodyLines = lines;
    if (lines[0].startsWith('### ')) {
      nodes.push(
        <h2 key={`${blockIdx}-h`} className="font-serif text-2xl font-bold text-white pt-4">
          {lines[0].replace(/^###\s*/, '')}
        </h2>
      );
      bodyLines = lines.slice(1);
    }

    let i = 0;
    let runIdx = 0;
    while (i < bodyLines.length) {
      const line = bodyLines[i];

      if (line.startsWith('- ')) {
        const items: string[] = [];
        while (i < bodyLines.length && bodyLines[i].startsWith('- ')) {
          items.push(bodyLines[i].replace(/^- /, ''));
          i++;
        }
        nodes.push(
          <ul key={`${blockIdx}-ul-${runIdx}`} className="list-disc pl-5 space-y-1.5">
            {items.map((it, li) => <li key={li}>{renderInline(it, `${blockIdx}-${runIdx}-${li}`)}</li>)}
          </ul>
        );
      } else if (/^\d+\.\s/.test(line)) {
        const items: string[] = [];
        while (i < bodyLines.length && /^\d+\.\s/.test(bodyLines[i])) {
          items.push(bodyLines[i].replace(/^\d+\.\s*/, ''));
          i++;
        }
        nodes.push(
          <ol key={`${blockIdx}-ol-${runIdx}`} className="list-decimal pl-5 space-y-1.5">
            {items.map((it, li) => <li key={li}>{renderInline(it, `${blockIdx}-${runIdx}-${li}`)}</li>)}
          </ol>
        );
      } else {
        nodes.push(<p key={`${blockIdx}-p-${runIdx}`}>{renderInline(line, `${blockIdx}-${runIdx}`)}</p>);
        i++;
      }
      runIdx++;
    }
  });

  return <>{nodes}</>;
}
