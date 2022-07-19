import {
  DOUBLE_DASH,
  DOUBLE_QUOTEMARKS,
  EFFECTIVE_DATE_TXT,
  MULTIPLE_EMPTY_LINES,
  SINGLE_QUOTEMARKS
} from './regex'

interface Rules {
  effective_date: string
}

export default function rulesToJson(rules_txt: string): Rules {
  const rules_lines = formatRules(rules_txt)
  const output: Rules = {
    effective_date: getEffectiveDate(rules_lines)
  }
  return output
}

function getEffectiveDate(rules_txt: string[]): string {
  const effective_date = rules_txt
    .filter(line => line.match(EFFECTIVE_DATE_TXT))
    .map(line => {
      line.replace(EFFECTIVE_DATE_TXT, '').replace('.', '').trim()
    })

  if (effective_date === undefined) {
    throw new TypeError('The value was promised to always be there!')
  }
  return '2020-01-01'
}

function formatRules(txt: string): string[] {
  return (
    txt
      .replace(DOUBLE_QUOTEMARKS, '"')
      .replace(SINGLE_QUOTEMARKS, "'")
      .replace(DOUBLE_DASH, '-')
      // Replaces empty lines before effective date comment
      // check https://regex101.com for more info
      .replace(MULTIPLE_EMPTY_LINES, ' $1')
      .split('\n')
  )
}
