import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Mail, Phone, MapPin, ExternalLink, X, Copy, Check } from 'lucide-react'
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

const iconMap: Record<string, React.ElementType<{ size: number }>> = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  Telegram: TelegramIcon,
}

const persianLabels: Record<string, string> = {
  GitHub: 'گیت‌هاب',
  LinkedIn: 'لینکدین',
  Telegram: 'تلگرام',
}

export default function Hero() {
  const [isAvatarOpen, setIsAvatarOpen] = useState(false)
  const [copiedItem, setCopiedItem] = useState<string | null>(null)

  const handleCopy = (type: string, value: string) => {
    navigator.clipboard.writeText(value)
    setCopiedItem(type)
    window.setTimeout(() => setCopiedItem(null), 2000)
  }

  return (
    <section className="relative overflow-hidden rounded-xl border border-border bg-surface p-4 shadow-lg backdrop-blur-xl sm:p-6 md:p-12 print:border-0 print:bg-white print:shadow-none print:p-0 print:backdrop-blur-none">
      <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-br from-primary-hover to-primary opacity-20 blur-3xl print:hidden" />
      <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-tl from-primary to-primary-hover opacity-15 blur-3xl print:hidden" />
      {isAvatarOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm print:hidden"
          onClick={() => setIsAvatarOpen(false)}
        >
          <button
            onClick={() => setIsAvatarOpen(false)}
            className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
          >
            <X size={24} />
          </button>
          <img
            src={basePath(personal.avatar)}
            alt={personal.name}
            className="max-w-sm w-full h-auto rounded-2xl shadow-2xl sm:max-w-md"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-center md:gap-10">
          <img
            src={basePath(personal.avatar)}
            alt={personal.name}
            onClick={() => setIsAvatarOpen(true)}
            className="h-32 w-32 cursor-pointer rounded-full border-4 border-primary object-cover shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg print:border-0 print:shadow-none"
          />

          <div className="text-center md:text-right">
            <h1 className="mb-2 text-[28px] font-bold text-text md:text-[40px]">
              {personal.name}
            </h1>
            <p className="text-xl font-medium text-primary">{personal.role}</p>
          </div>
        </div>

        <div>
          <ReactMarkdown
            components={{
              p: ({ children }) => (
                <p className="mb-4 text-justify text-base leading-relaxed last:mb-0 text-gray-200 sm:text-lg">
                  {children}
                </p>
              ),
              strong: ({ children }) => (
                <strong className="font-bold text-gray-300">{children}</strong>
              ),
              a: ({ children, href }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-orange-500 underline underline-offset-4 transition-colors hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300"
                >
                  {children}
                </a>
              ),
            }}
          >
            {personal.bio}
          </ReactMarkdown>
        </div>

        <div className="rounded-xl border border-border-soft bg-surface p-4">
          <div className="mb-4 flex w-full items-center justify-between">
            <h3 className="text-lg font-bold text-text">راه‌های ارتباطی</h3>
            <div dir="ltr">
              <img src={basePath('/images/sign.png')} alt="Signature" className="h-8 w-auto select-none object-contain pointer-events-none print:hidden" />
            </div>
          </div>

          <div>
            <div className="flex w-full items-center justify-between border-b border-border-soft py-2 text-sm !text-text print:border-0 print:bg-transparent print:p-0 print:!text-black print:backdrop-blur-none">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-white" />
                <span className="text-text-muted">ایمیل</span>
              </div>
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy('email', personal.email)}
                  aria-label="کپی ایمیل"
                  className="text-gray-400 transition-colors hover:text-primary print:hidden"
                >
                  {copiedItem === 'email' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
                <span dir="ltr" className="text-left text-text">{personal.email}</span>
              </div>
            </div>
            <div className="flex w-full items-center justify-between border-b border-border-soft py-2 text-sm !text-text print:border-0 print:bg-transparent print:p-0 print:!text-black print:backdrop-blur-none">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-white" />
                <span className="text-text-muted">شماره تلفن</span>
              </div>
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy('phone', personal.phone)}
                  aria-label="کپی شماره تلفن"
                  className="text-gray-400 transition-colors hover:text-primary print:hidden"
                >
                  {copiedItem === 'phone' ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                </button>
                <span dir="ltr" className="text-left text-text">{toPersianDigits(personal.phone)}</span>
              </div>
            </div>
            <div className="flex w-full items-center justify-between border-b border-border-soft py-2 text-sm !text-text print:border-0 print:bg-transparent print:p-0 print:!text-black print:backdrop-blur-none">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-white" />
                <span className="text-text-muted">موقعیت سکونت</span>
              </div>
              <span className="text-text">{personal.location}</span>
            </div>
          </div>

          <div className="mt-4 flex w-full flex-row items-center justify-between gap-2">
            {personal.socialLinks.map((link) => {
              const Icon = iconMap[link.platform] || ExternalLink
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-white backdrop-blur-md shadow-sm transition-colors duration-200 hover:text-orange-500 print:border-0 print:bg-transparent print:p-0 print:shadow-none print:text-black print:backdrop-blur-none"
                  aria-label={link.platform}
                >
                  <Icon size={20} />
                  <span className="hidden text-base font-medium md:inline">{persianLabels[link.platform]}</span>
                </a>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}