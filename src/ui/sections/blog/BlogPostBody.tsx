// src/ui/sections/blog/BlogPostBody.tsx
// Renders Payload's Lexical rich text content using MUI Typography.
// Handles: paragraphs, headings (h2–h4), bold, italic, lists (ul/ol),
//          links, horizontal rules, and inline images uploaded via Payload.

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import Link from 'next/link'
import NextImage from 'next/image'
import type { FullPost } from '@/app/[locale]/(frontend)/blog/[slug]/page'
import { BLOG_IMAGE_PRESETS, getBlogImageSource } from '@/utilities/blogImages'

// ── Lexical node types ─────────────────────────────────────────────
type LexicalNode =
  | { type: 'paragraph'; children?: LexicalNode[] }
  | { type: 'heading'; tag: 'h2' | 'h3' | 'h4'; children?: LexicalNode[] }
  | { type: 'list'; listType: 'bullet' | 'number'; children?: LexicalNode[] }
  | { type: 'listitem'; children?: LexicalNode[] }
  | { type: 'horizontalrule' }
  | { type: 'upload'; value?: { url?: string; alt?: string; width?: number; height?: number } }
  | { type: 'link'; url?: string; children?: LexicalNode[] }
  | { type: 'text'; text: string; format?: number }
  | { type: string; children?: LexicalNode[]; [key: string]: any }

// format bitmask (Lexical)
const IS_BOLD   = 1
const IS_ITALIC = 2
const IS_CODE   = 16

// ── Text leaf ──────────────────────────────────────────────────────
const TextLeaf = ({ node }: { node: Extract<LexicalNode, { type: 'text' }> }) => {
  let el: React.ReactNode = node.text
  if (node.format) {
    if (node.format & IS_BOLD)   el = <strong>{el}</strong>
    if (node.format & IS_ITALIC) el = <em>{el}</em>
    if (node.format & IS_CODE)   el = <code style={{ fontFamily: 'monospace', fontSize: '0.9em', background: 'rgba(0,0,0,0.07)', padding: '1px 5px', borderRadius: 4 }}>{el}</code>
  }
  return <>{el}</>
}

// ── Render children ────────────────────────────────────────────────
const RenderChildren = ({ nodes }: { nodes?: LexicalNode[] }) => {
  if (!nodes?.length) return null
  return (
    <>
      {nodes.map((node, i) => (
        <RenderNode key={i} node={node} />
      ))}
    </>
  )
}

// ── Single node ────────────────────────────────────────────────────
const RenderNode = ({ node }: { node: LexicalNode }) => {
  switch (node.type) {
    case 'paragraph':
      return (
        <Typography variant="body1" color="grey.700" lineHeight={1.85} mb={2.5}>
          <RenderChildren nodes={node.children} />
        </Typography>
      )

    case 'heading': {
      const variantMap = { h2: 'h4', h3: 'h5', h4: 'h6' } as const
      const headingNode = node as Extract<LexicalNode, { type: 'heading' }>
      return (
        <Typography
          variant={variantMap[headingNode.tag]}
          component={headingNode.tag}
          color="grey.900"
          fontWeight={700}
          lineHeight={1.25}
          mt={5}
          mb={2}
        >
          <RenderChildren nodes={node.children} />
        </Typography>
      )
    }

    case 'list': {
      const Tag = node.listType === 'number' ? 'ol' : 'ul'
      return (
        <Box
          component={Tag}
          sx={{
            pl: 3,
            mb: 2.5,
            '& li': { mb: 1 },
            '& li::marker': { color: 'secondary.main' },
          }}
        >
          <RenderChildren nodes={node.children} />
        </Box>
      )
    }

    case 'listitem':
      return (
        <Typography component="li" variant="body1" color="grey.700" lineHeight={1.8}>
          <RenderChildren nodes={node.children} />
        </Typography>
      )

    case 'horizontalrule':
      return <Divider sx={{ my: 4, borderColor: 'grey.200' }} />

    case 'link': {
      const href = node.url ?? '#'
      const isExternal = href.startsWith('http')
      return (
        <Link
          href={href}
          {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          style={{ color: 'inherit', textDecoration: 'underline', textDecorationColor: 'rgba(45,100,50,0.5)' }}
        >
          <RenderChildren nodes={node.children} />
        </Link>
      )
    }

    case 'upload': {
      const img = getBlogImageSource(node.value, BLOG_IMAGE_PRESETS.inline)
      if (!img?.url) return null
      return (
        <Box sx={{ my: 4, borderRadius: '20px', overflow: 'hidden', position: 'relative', width: '100%', height: { xs: 240, md: 400 } }}>
          <NextImage
            src={img.url}
            alt={node.value?.alt ?? ''}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            style={{ objectFit: 'cover' }}
          />
        </Box>
      )
    }

    case 'text':
      return <TextLeaf node={node as any} />

    default:
      // Fallback: try to render children
      return <RenderChildren nodes={(node as any).children} />
  }
}

// ── Main component ─────────────────────────────────────────────────
const BlogPostBody = ({ post, locale }: { post: FullPost; locale: string }) => {
  const root = post.content?.root ?? post.content
  const children: LexicalNode[] = root?.children ?? []

  return (
    <Box
      component="article"
      sx={{
        maxWidth: 740,
        mx: 'auto',
        pt: { xs: 5, md: 7 },
        pb: { xs: 4, md: 6 },
        // Pull in a nice drop-cap on the first paragraph
        '& > p:first-of-type::first-letter': {
          float: 'left',
          fontSize: '3.5rem',
          lineHeight: 0.85,
          mr: 1,
          mt: 0.5,
          fontWeight: 700,
          color: 'secondary.main',
        },
      }}
    >
      {children.map((node, i) => (
        <RenderNode key={i} node={node} />
      ))}
    </Box>
  )
}

export default BlogPostBody
