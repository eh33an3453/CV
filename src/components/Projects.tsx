import { motion, type Variants } from 'framer-motion'
import { Briefcase, Printer } from 'lucide-react'
import projectsData from '../data/projects.json'
import ProjectCard, { type Project } from './ProjectCard'

const projects = projectsData as Project[]

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

interface ProjectsProps {
  isPrinting: boolean
  onPrint: () => void
}

export default function Projects({ isPrinting, onPrint }: ProjectsProps) {
  const parseDate = (value: string | undefined): Date => {
    if (!value) return new Date(0)
    const [year, month] = value.split('-').map((n) => parseInt(n, 10))
    const safeYear = Number.isFinite(year) ? year : 0
    const safeMonth = Number.isFinite(month) ? month - 1 : 0
    return new Date(safeYear, safeMonth, 1)
  }

  const sortedProjects = [...projects].sort((a, b) => {
    const dateCmp = parseDate(a.date).getTime() - parseDate(b.date).getTime()
    if (dateCmp !== 0) return dateCmp
    return parseDate(a.endDate).getTime() - parseDate(b.endDate).getTime()
  })

  return (
    <section className="rounded-xl border border-border bg-surface p-2 shadow-lg backdrop-blur-xl sm:p-6 print:border-0 print:bg-white print:shadow-none print:p-0 print:backdrop-blur-none">
      <div className="mb-2 p-3 flex flex-row gap-6 sm:items-center justify-between">
        <h2 className="flex items-center gap-3 text-2xl font-bold text-text">
          <Briefcase className="text-primary" size={28} />
          پروژه‌ها
        </h2>

        <div className="no-print flex items-center gap-3 print:hidden">
          <button
            onClick={onPrint}
            className="btn-liquid flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white"
          >
            <Printer size={16} />
            دانلود PDF
          </button>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="flex flex-col gap-4 print:space-y-8">
        {sortedProjects.map((project) => (
          <motion.div key={project.id} variants={cardVariants} className="print:opacity-100 print:transform-none print:translate-y-0">
            <ProjectCard project={project} forceOpen={isPrinting} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
