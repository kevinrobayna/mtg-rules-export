interface Rules {
  effective_date: string
}

const EFFECTIVE_DATE_TXT = 'These rules are effective as of'

export default function rulesToJson(rules_txt: string): Rules {
  const rules_lines = formatRules(rules_txt)
  const output: Rules = {
    effective_date: getEffectiveDate(rules_lines)
  }
  return output
}

function getEffectiveDate(rules_txt: string[]): string {
  const line = rules_txt.find(it => it.includes(EFFECTIVE_DATE_TXT))
  if (line === undefined) {
    throw new TypeError('The value was promised to always be there!')
  }
  return line.replace(EFFECTIVE_DATE_TXT, '').replace('.', '').trim()
}

function formatRules(txt: string): string[] {
  return (
    txt
      .replace(/“/g, '"')
      .replace(/”/g, '"')
      .replace(/’/g, "'")
      .replace(/‘/g, "'")
      .replace(/—/g, '-')
      // Replaces empty lines before effective date comment
      // check https://regex101.com for more info
      .replace(/\n\s{4,}(\w)/g, ' $1')
      .split('\n')
  )
}
