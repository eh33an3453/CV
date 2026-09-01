import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import mermaid from 'mermaid'
import { ChevronDown, Calendar, Tag, Check } from 'lucide-react'
import { toPersianDigits } from '@/utils/persian'
import { getSkillsByIds } from '@/utils/skills'
import { basePath } from '@/utils/basePath'

type ProjectState = 'completed' | 'failed' | 'suspended' | 'in-progress'

const stateLabels: Record<ProjectState, string> = {
  completed: 'تکمیل شده',
  failed: 'شکست خورده',
  suspended: 'در حالت تعلیق',
  'in-progress': 'در دست اجرا',
}

const stateColors: Record<ProjectState, string> = {
  completed: 'bg-green-600',
  failed: 'bg-red-500',
  suspended: 'bg-yellow-500',
  'in-progress': 'bg-blue-500',
}

const stateDotColors: Record<ProjectState, string> = {
  completed: 'bg-green-300',
  failed: 'bg-red-300',
  suspended: 'bg-yellow-300',
  'in-progress': 'bg-blue-300',
}

export interface Project {
  id: string
  title: string
  date: string
  endDate?: string
  state?: ProjectState
  isTeamWork?: boolean
  otherSignatures?: string[]
  thumbnail: string
  skills: number[]
  contentFile: string
}

interface ProjectCardProps {
  project: Project
  forceOpen?: boolean
}

let mermaidCounter = 0

function MermaidRenderer({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const idRef = useRef<string>('')

  if (!idRef.current) {
    idRef.current = `mermaid-${++mermaidCounter}`
  }

  useEffect(() => {
    if (containerRef.current && chart) {
      mermaid.initialize({ startOnLoad: false, theme: 'neutral' })
      mermaid.render(idRef.current, chart).then(({ svg }) => {
        if (containerRef.current) {
          containerRef.current.innerHTML = svg
        }
      }).catch(() => {
        if (containerRef.current) {
          containerRef.current.textContent = 'نمودار بارگذاری نشد.'
        }
      })
    }
  }, [chart])

  return <div ref={containerRef} className="my-4 flex justify-center" />
}

export default function ProjectCard({ project, forceOpen = false }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(forceOpen)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (forceOpen) setIsOpen(true)
  }, [forceOpen])

  useEffect(() => {
    if (isOpen && !content && !loading && !error) {
      setLoading(true)
      fetch(basePath(project.contentFile))
        .then((res) => {
          if (!res.ok) throw new Error('Not found')
          return res.text()
        })
        .then((text) => {
          if (text.trim().startsWith('<!doctype') || text.trim().startsWith('<html')) {
            throw new Error('HTML fallback received')
          }
          setContent(text)
        })
        .catch(() => {
          setError(true)
          setContent('محتوا بارگذاری نشد.')
        })
        .finally(() => setLoading(false))
    }
  }, [isOpen, content, loading, error, project.contentFile])

  return (
    <div className="relative w-full rounded-lg border border-border bg-surface shadow-lg backdrop-blur-xl transition-all print:border print:border-neutral-300 print:bg-white print:shadow-none print:backdrop-blur-none">
      <div className="absolute top-4 right-4 z-10 flex flex-row items-center gap-2 print:hidden">
        {project.state && (
          <span className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold text-white shadow-md ${stateColors[project.state]}`}>
            {project.state === 'completed' ? (
              <Check size={14} className="h-3.5 w-3.5 shrink-0" strokeWidth={3} />
            ) : (
              <span className={`h-2 w-2 shrink-0 rounded-full ${stateDotColors[project.state]} ${project.state === 'in-progress' ? 'animate-pulse' : ''}`} />
            )}
            {stateLabels[project.state]}
          </span>
        )}
        {project.isTeamWork && (
          <span className="flex items-center gap-2 rounded-full bg-primary-800 px-3 py-1 text-xs font-bold text-white shadow-md">
            <span className="h-2 w-2 shrink-0 rounded-full bg-primary-200" />
            کار تیمی
          </span>
        )}
      </div>
      {project.thumbnail && (
        <div className="w-full overflow-hidden rounded-lg bg-surface">
          <img
            src={basePath(project.thumbnail)}
            alt={project.title}
            loading="lazy"
            className="h-auto w-full object-contain"
          />
        </div>
      )}

      <div className="p-5">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold text-text">{project.title}</h3>
          <span className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-surface-hover px-3 py-1.5 text-sm font-medium text-text-muted print:border-neutral-300 print:bg-transparent print:text-black">
            <div dir="ltr" className="flex items-center gap-1">
              <span>{toPersianDigits(project.date)}</span>
              <span>-</span>
              <span>{project.endDate ? toPersianDigits(project.endDate) : ''}</span>
            </div>
            <Calendar size={14} />
          </span>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {getSkillsByIds(project.skills).map((skill) => (
            <span
              key={skill.id}
              className="flex items-center gap-1 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary-text print:border print:border-neutral-300 print:bg-transparent print:text-black"
            >
              <Tag size={12} />
              {skill.name}
            </span>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="no-print btn-liquid flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium text-white print:hidden"
        >
          {isOpen ? 'بستن جزئیات' : 'مشاهده جزئیات'}
          <ChevronDown
            size={16}
            className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        <AnimatePresence initial={false}>
          {(isOpen || forceOpen) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden print:!h-auto print:!opacity-100 print:!overflow-visible print:!block"
            >
              <div className="prose prose-sm mt-5 max-w-none border-t border-border pt-5 text-text-muted print:border-0 print:p-0 print:text-black">
                {loading && <p className="text-text-faint">در حال بارگذاری...</p>}
                {!loading && (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1({ children }) {
                        return <h1 className="mt-10 mb-5 text-2xl font-extrabold leading-tight text-text sm:text-3xl print:text-gray-900">{children}</h1>
                      },
                      h2({ children }) {
                        return <h2 className="mt-8 mb-4 border-b border-border pb-2 text-xl font-bold text-text sm:text-2xl print:border-gray-200 print:text-gray-800">{children}</h2>
                      },
                      h3({ children }) {
                        return <h3 className="mt-6 mb-3 text-lg font-semibold text-text sm:text-xl print:text-gray-800">{children}</h3>
                      },
                      h4({ children }) {
                        return <h4 className="mt-4 mb-2 text-base font-medium text-text sm:text-lg print:text-gray-800">{children}</h4>
                      },
                      h5({ children }) {
                        return <h5 className="mt-4 mb-2 text-base font-medium text-text-faint print:text-gray-600">{children}</h5>
                      },
                      h6({ children }) {
                        return <h6 className="mt-4 mb-2 text-base font-medium text-text-faint print:text-gray-600">{children}</h6>
                      },
                      p({ children }) {
                        return <p className="mb-5 text-justify text-base leading-relaxed text-text-muted print:text-gray-700">{children}</p>
                      },
                      a({ href, children }) {
                        return <a href={href} className="text-primary underline underline-offset-4 transition-colors hover:text-primary-hover print:text-orange-600 print:hover:text-orange-700">{children}</a>
                      },
                      blockquote({ children }) {
                        return <blockquote className="my-6 rounded-l-lg border-r-4 border-primary bg-primary-soft px-4 py-3 italic text-text-muted print:bg-orange-50/50 print:text-gray-700">{children}</blockquote>
                      },
                      ul({ children }) {
                        return <ul className="mb-5 list-disc list-outside space-y-2 pr-5 leading-relaxed text-text-muted marker:text-text-faint print:text-gray-700 print:marker:text-gray-400">{children}</ul>
                      },
                      ol({ children }) {
                        return <ol className="mb-5 list-decimal list-outside space-y-2 pr-5 leading-relaxed text-text-muted marker:font-medium marker:text-primary print:text-gray-700 print:marker:text-orange-500">{children}</ol>
                      },
                      li({ children }) {
                        return <li className="font-normal">{children}</li>
                      },
                      code({ className, children, ...props }) {
                        const match = /language-mermaid/.exec(className || '')
                        const isInline = !className
                        if (match) {
                          return <MermaidRenderer chart={String(children).replace(/\n$/, '')} />
                        }
                        return isInline ? (
                          <code className="rounded bg-code-bg px-1.5 py-0.5 text-xs text-code-text print:bg-transparent print:text-black" {...props}>
                            {children}
                          </code>
                        ) : (
                          <pre className="overflow-x-auto rounded-lg bg-neutral-950 p-4 text-neutral-200 print:bg-neutral-100 print:text-black">
                            <code {...props}>{children}</code>
                          </pre>
                        )
                      },
                      img({ src, alt }) {
                        return (
                          <div className="w-full rounded-md mb-4 last:mb-0">
                            {src && <img src={basePath(src)} alt={alt} loading="lazy" className="h-auto w-full rounded-md object-contain" />}
                          </div>
                        )
                      },
                      table({ children }) {
                        return (
                          <div className="overflow-x-auto">
                            <table className="min-w-full border-collapse border border-border text-sm print:border-neutral-400">
                              {children}
                            </table>
                          </div>
                        )
                      },
                      th({ children }) {
                        return (
                          <th className="border border-border bg-surface-hover px-4 py-2 text-right font-bold print:border-neutral-400 print:bg-transparent">
                            {children}
                          </th>
                        )
                      },
                      td({ children }) {
                        return <td className="border border-border px-4 py-2 print:border-neutral-400">{children}</td>
                      },
                    }}
                  >
                    {content}
                  </ReactMarkdown>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-4 flex w-full flex-row items-center gap-4" dir="ltr">
          <img src={basePath('/images/sign.png')} alt="Signature" className="h-8 w-auto select-none object-contain pointer-events-none print:hidden" />
          {project.otherSignatures?.map((src, index) => (
            <img key={index} src={basePath(src)} alt={`Signature ${index + 1}`} className="h-8 w-auto select-none object-contain pointer-events-none print:hidden" />
          ))}
        </div>
      </div>
    </div>
  )
}