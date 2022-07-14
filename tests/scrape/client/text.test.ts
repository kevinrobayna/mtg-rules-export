import {describe, expect, it, jest} from '@jest/globals'
import axios from 'axios'

import getRulesText from '../../../src/scrape/client/text'

jest.mock('axios')
const mockAxios = axios as jest.Mocked<typeof axios>

const RULES_URI = 'https://media.wizards.com/2022/downloads/MagicCompRules%2020220610.txt'

describe('getRulesText', () => {
  it('should return given the content of the rules', async () => {
    // given a summary of the rules text file
    mockAxios.get.mockResolvedValue({
      status: 200,
      data: `Magic: The Gathering Comprehensive Rules

These rules are effective as of June 10, 2022.
      
Introduction
      
This document is the ultimate authority for Magic: The Gathering® competitive game play. It consists of a series of numbered rules followed by a glossary. Many of the numbered rules are divided into subrules, and each separate rule and subrule of the game has its own number. (Note that subrules skip the letters “l” and “o” due to potential confusion with the numbers “1” and “0”; subrule 704.5k is followed by 704.5m, then 704.5n, then 704.5p, for example.)
      
Changes may have been made to this document since its publication. You can download the most recent version from the Magic rules website at Magic.Wizards.com/Rules. If you have questions, you can get the answers from us at Support.Wizards.com.
      `
    })

    // when we try to get the rules
    const rules_txt = await getRulesText(RULES_URI)

    // then, we called the right url
    expect(mockAxios.get).toHaveBeenCalledWith(RULES_URI)

    // and we get the rules text
    expect(rules_txt).toContain('Magic: The Gathering Comprehensive Rules')
  })

  it('should return given the content of the rules', async () => {
    // given that wizards removed the file
    mockAxios.get.mockResolvedValue({
      status: 404,
      data: `Not found`
    })

    // when we try to get the rules
    await expect(getRulesText(RULES_URI)).rejects.toThrow('Could not load MTG Rules')

    // then, we called the right url
    expect(mockAxios.get).toHaveBeenCalledWith(RULES_URI)
  })

  it('returns an error when we fail to load the rules', async () => {
    // given that Wizards is having a bad day
    mockAxios.get.mockRejectedValue(new Error('Error'))

    // when we try to get the rules
    await expect(getRulesText(RULES_URI)).rejects.toThrow('Could not load MTG Rules')

    // and we made a request to the right url
    expect(mockAxios.get).toHaveBeenCalledWith(RULES_URI)
  })
})
