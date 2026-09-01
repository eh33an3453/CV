import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import Hero from './components/Hero'
import Education from './components/Education'
import Skills from './components/Skills'
import Projects from './components/Projects'
import ParticleBackground from './components/ParticleBackground'
import Footer from './components/Footer'

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function App() {
  const [isPrinting, setIsPrinting] = useState(false)

  const handlePrint = () => {
    setIsPrinting(true)
    setTimeout(() => {
      window.print()
      setIsPrinting(false)
    }, 300)
  }

  return (
    <>
      <ParticleBackground />
      <main className="relative z-10 mx-auto flex w-full max-w-4xl flex-col space-y-8 p-4 md:p-8 print:max-w-none print:space-y-6 print:p-0">
        <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="print:opacity-100 print:transform-none print:translate-y-0">
          <Hero />
        </motion.div>
        <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="print:opacity-100 print:transform-none print:translate-y-0">
          <Education />
        </motion.div>
        <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="print:opacity-100 print:transform-none print:translate-y-0">
          <Projects isPrinting={isPrinting} onPrint={handlePrint} />
        </motion.div>
        <motion.div variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-100px' }} className="print:opacity-100 print:transform-none print:translate-y-0">
          <Skills isPrinting={isPrinting} />
        </motion.div>
      </main>
      <Footer />
    </>
  )
}