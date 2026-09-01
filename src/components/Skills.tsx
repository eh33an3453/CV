import { useState, useMemo } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { Star, ChevronDown } from 'lucide-react'
import skills from '../data/skills.json'
import projectsData from '../data/projects.json'
import ProjectCard, { type Project } from './ProjectCard'
import { basePath } from '@/utils/basePath'

const projects = projectsData as Project[]

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

interface SkillsProps {
  isPrinting: boolean
}

export default function Skills({ isPrinting }: SkillsProps) {
  const [openSkills, setOpenSkills] = useState<Record<number, boolean>>({})

  const toggleSkill = (skillId: number) => {
    setOpenSkills((prev) => ({ ...prev, [skillId]: !prev[skillId] }))
  }

  const parseDate = (value: string | undefined): Date => {
    if (!value) return new Date(0)
    const [year, month] = value.split('-').map((n) => parseInt(n, 10))
    const safeYear = Number.isFinite(year) ? year : 0
    const safeMonth = Number.isFinite(month) ? month - 1 : 0
    return new Date(safeYear, safeMonth, 1)
  }

  const projectsBySkill = useMemo(() => {
    const groups: Record<number, typeof projects> = {}
    projects.forEach((project) => {
      project.skills.forEach((skillId) => {
        if (!groups[skillId]) groups[skillId] = []
        if (!groups[skillId].find((p) => p.id === project.id)) {
          groups[skillId].push(project)
        }
      })
    })
    Object.keys(groups).forEach((skillId) => {
      groups[Number(skillId)] = groups[Number(skillId)].sort(
        (a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime()
      )
    })
    return groups
  }, [])

  return (
    <section className="rounded-xl border border-border bg-surface p-2 shadow-lg backdrop-blur-xl sm:p-4 print:border-0 print:bg-white print:shadow-none print:p-0 print:backdrop-blur-none">
      <h2 className="mb-2 p-3 flex items-center gap-3 text-2xl font-bold text-primary">
        <Star className="text-primary" size={28} />
        مهارت‌ها
      </h2>

      <div className="flex flex-col gap-4">
        {skills.map((skill) => {
          const isOpen = openSkills[skill.id] || false
          const skillProjects = projectsBySkill[skill.id] || []

          return (
            <div key={skill.id} className="rounded-xl border border-border-soft bg-surface backdrop-blur-md print:border-0 print:bg-transparent print:backdrop-blur-none">
              <button
                onClick={() => toggleSkill(skill.id)}
                className="flex w-full cursor-pointer items-center justify-between rounded-lg p-4 text-right transition-colors duration-200 hover:bg-surface-hover print:hidden"
              >
                <div className="flex items-center gap-2">
                  <img src={basePath(skill.icon)} alt="" className="filter-theme h-6 w-6 object-contain" />
                  <span className="font-medium text-primary-text">{skill.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-8 text-center font-mono text-xs font-medium text-gray-300 dark:text-gray-400">{skill.level * 10}%</span>
                  <div dir="ltr" className="h-[6.67px] w-32 min-w-[70px] overflow-hidden rounded-full bg-gray-600/50">
                    <div className="h-full rounded-full bg-orange-500" style={{ width: `${skill.level * 10}%` }} />
                  </div>
                  <ChevronDown
                    size={20}
                    className={`text-primary-text transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </div>
              </button>

              <div className="hidden print:block">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <img src={basePath(skill.icon)} alt="" className="filter-theme h-6 w-6 object-contain" />
                    <span className="font-medium text-black">{skill.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-8 text-center font-mono text-xs font-medium text-gray-500">{skill.level * 10}%</span>
                    <div dir="ltr" className="h-[1px] w-28 min-w-[60px] overflow-hidden rounded-full bg-neutral-300">
                      <div className="h-full rounded-full bg-orange-500" style={{ width: `${skill.level * 10}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {(isOpen || isPrinting) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden print:!h-auto print:!opacity-100 print:!block print:!overflow-visible"
                  >
                    <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} className="flex flex-col gap-2 p-0 sm:gap-6 sm:p-4 sm:pt-6 print:p-0 print:space-y-8">
                      {skillProjects.map((project) => (
                        <motion.div key={project.id} variants={cardVariants} className="print:opacity-100 print:transform-none print:translate-y-0">
                          <ProjectCard project={project} forceOpen={isPrinting} />
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}