import { GraduationCap } from 'lucide-react'
import education from '../data/education.json'
import { toPersianDigits } from '@/utils/persian'

export default function Education() {
  return (
    <section className="rounded-xl border border-border bg-surface p-4 shadow-lg backdrop-blur-xl sm:p-6 print:border-0 print:bg-white print:shadow-none print:p-0 print:backdrop-blur-none">
      <h2 className="mb-2 p-3 flex items-center gap-3 text-2xl font-bold text-text">
        <GraduationCap className="text-primary" size={28} />
        تحصیلات
      </h2>

      <div className="relative border-r-2 border-primary pr-8">
        {education.map((edu, index) => (
          <div key={index} className="relative mb-10 last:mb-0">
            
            <div className="cursor-default rounded-xl border border-border-soft bg-surface p-5 backdrop-blur-md print:border-0 print:bg-transparent print:p-0 print:backdrop-blur-none">
              <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-bold text-text">{edu.degree} - {edu.field}</h3>
                <div dir="ltr" className="flex items-center justify-end gap-1 rounded-full bg-primary-soft px-3 py-1 text-xs font-medium text-primary-text print:bg-transparent print:p-0 print:text-black">
                  <span>{toPersianDigits(edu.startDate)}</span>
                  <span>-</span>
                  <span>{toPersianDigits(edu.endDate)}</span>
                </div>
              </div>
              
              <p className="mb-2 font-medium text-primary">{edu.university}</p>
              <p className="leading-relaxed text-text-muted">{edu.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}