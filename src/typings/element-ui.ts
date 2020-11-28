interface Rule {
  message: string
  required?: boolean
}
export type Rules = Record<string, Rule[] | Rule>
