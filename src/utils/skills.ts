import skills from '@/data/skills.json'

export interface Skill {
  id: number
  name: string
  level: number
  icon: string
}

const skillById = new Map<number, Skill>(skills.map((s) => [s.id, s]))

export function getSkillById(id: number): Skill | undefined {
  return skillById.get(id)
}

export function getSkillsByIds(ids: number[]): Skill[] {
  return ids
    .map((id) => getSkillById(id))
    .filter((skill): skill is Skill => skill !== undefined)
}
