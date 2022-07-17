import {describe, expect, it} from '@jest/globals'
import * as fs from 'fs'
import rulesToJson from '../../src/scrape/transformer'

const COMPLETE_RULES: string = fs.readFileSync('./tests/scrape/rules.txt', 'utf8')

describe('rulesToJson', () => {
  it('should return effective date of rules', () => {
    expect(rulesToJson(COMPLETE_RULES).effective_date).toBe('July 8, 2022')
  })
})
