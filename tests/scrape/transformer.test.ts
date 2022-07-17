import {describe, expect, it} from '@jest/globals'
import * as fs from 'fs'
import rulesToJson from '../../src/scrape/transformer'

const COMPLETE_RULES : string = fs.readFileSync('./tests/scrape/rules.txt', 'utf8')

describe('rulesToJson', () => {
  it('should return json with rules in a computer readable format',  () => {
    // when we try to get the rules url
    const rules_txt = rulesToJson(COMPLETE_RULES)

    // and we got the url for the rules text file
    expect(rules_txt).toContain('Magic: The Gathering Comprehensive Rules')
  })
})
