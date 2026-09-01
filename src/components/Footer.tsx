import { useState } from 'react'
import { ArrowUp, Copy, Check } from 'lucide-react'
import personal from '@/data/personal.json'
import { toPersianDigits } from '@/utils/persian'
import { basePath } from '@/utils/basePath'

function GitHubIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.29 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405 1.02 0 2.04.135 3 .405 2.28-1.56 3.285-1.245 3.285-1.245.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedInIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function TelegramIcon({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0011.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  )
}

const iconMap: Record<string, React.ElementType<{ size: number; className?: string }>> = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Telegram: TelegramIcon,
}

export default function Footer() {
  const [copiedFooterItem, setCopiedFooterItem] = useState<string | null>(null)

  const handleCopy = (type: string, value: string) => {
    navigator.clipboard.writeText(value)
    setCopiedFooterItem(type)
    window.setTimeout(() => setCopiedFooterItem(null), 2000)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="p-4 no-print mt-12 border-t border-gray-800 bg-neutral-900/50 py-10 print:hidden">
      <div className="mx-auto w-full max-w-4xl px-4 md:px-8">
        <div className="hidden md:flex md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-4 text-right">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <span className="text-sm text-text-muted">ایمیل:</span>
                <button
                  type="button"
                  onClick={() => handleCopy('footer-email', personal.email)}
                  className="text-gray-400 transition-colors hover:text-primary"
                  aria-label="کپی ایمیل"
                >
                  {copiedFooterItem === 'footer-email' ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                </button>
                <span dir="ltr" className="text-sm text-text">{personal.email}</span>
              </div>
              <div className="flex items-center justify-center gap-2 md:justify-start">
                <span className="text-sm text-text-muted">تلفن:</span>
                <button
                  type="button"
                  onClick={() => handleCopy('footer-phone', personal.phone)}
                  className="text-gray-400 transition-colors hover:text-primary"
                  aria-label="کپی شماره تلفن"
                >
                  {copiedFooterItem === 'footer-phone' ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                </button>
                <span dir="ltr" className="text-sm text-text">{toPersianDigits(personal.phone)}</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 md:justify-start">
              {personal.socialLinks.map((link) => {
                const Icon = iconMap[link.platform]
                if (!Icon) return null
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-text-muted backdrop-blur-md transition-colors hover:text-orange-500"
                    aria-label={link.platform}
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>
          </div>

          <div className="flex flex-col gap-3 w-fit">
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10"
            >
              <ArrowUp size={16} />
              <span>بازگشت به بالا</span>
            </button>
            <div dir="ltr" className="w-full">
              <img src={basePath('/images/sign.png')} alt="Signature" className="h-10 md:h-12 w-full object-contain object-left select-none pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 md:hidden">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2 text-right">
              <div className="flex items-center justify-start gap-2">
                <span className="text-sm text-text-muted">ایمیل:</span>
                <button
                  type="button"
                  onClick={() => handleCopy('footer-email', personal.email)}
                  className="text-gray-400 transition-colors hover:text-primary"
                  aria-label="کپی ایمیل"
                >
                  {copiedFooterItem === 'footer-email' ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                </button>
                <span dir="ltr" className="text-sm text-text">{personal.email}</span>
              </div>
              <div className="flex items-center justify-start gap-2">
                <span className="text-sm text-text-muted">تلفن:</span>
                <button
                  type="button"
                  onClick={() => handleCopy('footer-phone', personal.phone)}
                  className="text-gray-400 transition-colors hover:text-primary"
                  aria-label="کپی شماره تلفن"
                >
                  {copiedFooterItem === 'footer-phone' ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                </button>
                <span dir="ltr" className="text-sm text-text">{toPersianDigits(personal.phone)}</span>
              </div>
            </div>
            <div className="flex items-center gap-3" dir="ltr">
              {personal.socialLinks.map((link) => {
                const Icon = iconMap[link.platform]
                if (!Icon) return null
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-text-muted backdrop-blur-md transition-colors hover:text-orange-500"
                    aria-label={link.platform}
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4" dir="ltr">
            <img src={basePath('/images/sign.png')} alt="Signature" className="h-10 w-auto object-contain object-left select-none pointer-events-none" />
            <button
              type="button"
              onClick={scrollToTop}
              className="flex h-10 items-center justify-center gap-2 px-4 text-sm text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10"
            >
              <ArrowUp size={16} />
              <span>بازگشت به بالا</span>
            </button>
          </div>
        </div>

        <div className="mt-10 w-full border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} سید احسان مصطفوی نژاد. تمامی حقوق محفوظ است.
        </div>
      </div>
    </footer>
  )
}
