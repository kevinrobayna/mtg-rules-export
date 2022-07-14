import {describe, expect, it} from '@jest/globals'

import getRules from '../../src/scrape/rules'

describe('getRules', () => {
  it('should return url given a copy of the real mtg website', async () => {
    // when we try to get the rules url
    const rules_txt = await getRules()

    // and we got the url for the rules text file
    expect(rules_txt).toContain('Magic: The Gathering Comprehensive Rules')
  })
})
