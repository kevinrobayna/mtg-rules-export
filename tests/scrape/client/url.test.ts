import {describe, expect, it, jest} from '@jest/globals'
import axios from 'axios'

import getRulesUrl, {RULES_URI} from '../../../src/scrape/client/url'

jest.mock('axios')
const mockAxios = axios as jest.Mocked<typeof axios>

describe('getRulesUrl', () => {
  it('should return url given a copy of the real mtg website', async () => {
    // given a copy of the real mtg website
    mockAxios.get.mockResolvedValue({
      status: 200,
      data: `
      <html>
        <head></head>
        <body>
          <p style="opacity: 1;"><a class="cta" href="https://media.wizards.com/2022/downloads/MagicCompRules 20220610.docx"><span class="txt">DOCX</span></a></p>
          <p style="opacity: 1;"><a class="cta" href="https://media.wizards.com/2022/downloads/MagicCompRules 20220610.pdf" target="_blank"><span class="txt">PDF</span> </a></p>
          <p style="opacity: 1;"><span class="txt"><a class="cta" href="https://media.wizards.com/2022/downloads/MagicCompRules 20220610.txt" target="_blank"><span class="txt">TXT</span></a></span></p>
        </body>
      </html>`
    })

    // when we try to get the rules url
    const rules_uri = await getRulesUrl()

    // then, we called the right url
    expect(mockAxios.get).toHaveBeenCalledWith(RULES_URI)

    // and we got the url for the rules text file
    expect(rules_uri).toBe('https://media.wizards.com/2022/downloads/MagicCompRules%2020220610.txt')
  })

  it('returns an error when we fail to load mtg website', async () => {
    // given that Wizards is having a bad day
    mockAxios.get.mockRejectedValue(new Error('Error'))

    // when we try to get the rules url
    await expect(getRulesUrl()).rejects.toThrow('Could not load MTG Rules website')

    // and we got the url for the rules text file
    expect(mockAxios.get).toHaveBeenCalledWith(RULES_URI)
  })

  it('returns a %20 for each space', async () => {
    // given that the text url contains several spaces
    mockAxios.get.mockResolvedValue({
      status: 200,
      data: `<a class="cta" href="https://rules   abc.txt"></a>`
    })

    // when we try to get the rules url
    const rules_uri = await getRulesUrl()

    // then, we called the right url
    expect(mockAxios.get).toHaveBeenCalledWith(RULES_URI)

    // and we got the url for the rules text file
    expect(rules_uri).toBe('https://rules%20%20%20abc.txt')
  })

  it('returns error if the html is blank', async () => {
    // given that the text url contains several spaces
    mockAxios.get.mockResolvedValue({
      status: 200,
      data: ''
    })

    // when we try to get the rules url
    await expect(getRulesUrl()).rejects.toThrow('There was no link to the rules')

    // and we got the url for the rules text file
    expect(mockAxios.get).toHaveBeenCalledWith(RULES_URI)
  })

  it("returns an error when there's no link to the rules", async () => {
    // given that the text url contains several spaces
    mockAxios.get.mockResolvedValue({
      status: 200,
      data: `<a class="another_link" href="http://ecosia.org"></a>`
    })

    // when we try to get the rules url
    await expect(getRulesUrl()).rejects.toThrow('There was no link to the rules')

    // and we got the url for the rules text file
    expect(mockAxios.get).toHaveBeenCalledWith(RULES_URI)
  })

  it('returns the first website when there are more than one txt urls', async () => {
    // given that the text url contains several spaces
    mockAxios.get.mockResolvedValue({
      status: 200,
      data: `
      <a class="cta" href="http://1.txt"></a>
      <a class="cta" href="http://2.txt"></a>
      `
    })

    // when we try to get the rules url
    const rules_uri = await getRulesUrl()

    // then, we called the right url
    expect(mockAxios.get).toHaveBeenCalledWith(RULES_URI)

    // and we get the first url ending in txt
    expect(rules_uri).toBe('http://1.txt')
  })
})
