"use client"

import { Button } from "@/components/ui/button"
import { Facebook, Twitter, Linkedin, LinkIcon } from "lucide-react"
import { useState } from "react"

export function SocialShare({ url, title }) {
  const [copied, setCopied] = useState(false)

  const shareUrl = typeof window !== "undefined" ? window.location.origin + url : url

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">Compartir:</span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => window.open(shareLinks.facebook, "_blank")}
        aria-label="Compartir en Facebook"
      >
        <Facebook className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => window.open(shareLinks.twitter, "_blank")}
        aria-label="Compartir en Twitter"
      >
        <Twitter className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => window.open(shareLinks.linkedin, "_blank")}
        aria-label="Compartir en LinkedIn"
      >
        <Linkedin className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={handleCopyLink} aria-label="Copiar enlace">
        <LinkIcon className="h-4 w-4" />
      </Button>
      {copied && <span className="text-xs text-green-600">¡Copiado!</span>}
    </div>
  )
}
