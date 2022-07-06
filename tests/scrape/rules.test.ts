import * as fs from 'fs'
import {expect, describe, it} from '@jest/globals'

import {getRulesUrl, RULES_URI} from '../src/scrape/rules'

describe('getRulesUrl', () => {
  global.fetch = jest.fn(() => {})

  afterEach(() => {
    fetch.mockClear()
  })

  it('should return url given a copy of the real mtg website', async () => {
    // given a copy of the real mtg website
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        ok: true,
        text: () => Promise.resolve(fs.readFileSync('src/__tests__/rules.html', 'utf8'))
      })
    )

    // when we try to get the rules url
    const rules_uri = await getRulesUrl()

    // then, we called the right url
    expect(fetch).toHaveBeenCalledWith(RULES_URI)

    // and we got the url for the rules text file
    expect(rules_uri).toBe('https://media.wizards.com/2022/downloads/MagicCompRules%2020220610.txt')
  })

  it('returns an error when we fail to load mtg website', async () => {
    // given that Wizards is having a bad day
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        status: 500,
        ok: false
      })
    )

    // when we try to get the rules url
    try {
      await getRulesUrl()
    } catch (error) {
      expect(error.message).toBe('Could not load MTG Rules website')
    }

    // and we got the url for the rules text file
    expect(fetch).toHaveBeenCalledWith(RULES_URI)
  })

  it('returns a %20 for each space', async () => {
    // given that the text url contains several spaces
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        ok: true,
        text: () => Promise.resolve(`<a class="cta" href="https://rules   abc.txt"></a>`)
      })
    )

    // when we try to get the rules url
    const rules_uri = await getRulesUrl()

    // then, we called the right url
    expect(fetch).toHaveBeenCalledWith(RULES_URI)

    // and we got the url for the rules text file
    expect(rules_uri).toBe('https://rules%20%20%20abc.txt')
  })

  it("returns an error when there's no link to the rules", async () => {
    // given that the text url contains several spaces
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        status: 200,
        ok: true,
        text: () => Promise.resolve(`<a class="another_link" href="http://ecosia.org"></a>`)
      })
    )

    // when we try to get the rules url
    try {
      await getRulesUrl()
    } catch (error) {
      expect(error.message).toBe('There was no link to the rules')
    }

    // and we got the url for the rules text file
    expect(fetch).toHaveBeenCalledWith(RULES_URI)
  })
})
