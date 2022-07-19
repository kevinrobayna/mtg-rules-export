import { describe, expect, it } from '@jest/globals'
import exp from 'constants'

import {
    DOUBLE_DASH,
    DOUBLE_QUOTEMARKS,
    EFFECTIVE_DATE_TXT,
    MULTIPLE_EMPTY_LINES,
    SINGLE_QUOTEMARKS
}
    from '../../src/scrape/regex'

describe('regex', () => {

    describe('DOUBLE_DASH', () => {
        it('should find it on single line', () => {
            const input = `HELLO — WORLD`

            const match_results = input.match(DOUBLE_DASH)

            expect(match_results).toBeTruthy()
            expect(match_results?.sort()).toStrictEqual(["—"].sort())
        })

        it('should find even if they are multiple on single line', () => {
            const input = `— HELLO — WORLD —`

            const match_results = input.match(DOUBLE_DASH)

            expect(match_results).toBeTruthy()
            expect(match_results?.sort()).toStrictEqual(["—", "—", "—"].sort())
        })

        it('should find it on multiple lines', () => {
            const input = `HELLO 
            — 
            WORLD`

            const match_results = input.match(DOUBLE_DASH)

            expect(match_results).toBeTruthy()
            expect(match_results?.sort()).toStrictEqual(["—"].sort())
        })

        it('should find even if they are multiple on multiple lines', () => {
            const input = `
            —
            HELLO 
            — 
            WORLD
            —`

            const match_results = input.match(DOUBLE_DASH)

            expect(match_results).toBeTruthy()
            expect(match_results?.sort()).toStrictEqual(["—", "—", "—"].sort())
        })
    })

    describe('DOUBLE_QUOTEMARKS', () => {
        it('should find it on single line', () => {
            const input = `“HELLO WORLD”`

            const match_results = input.match(DOUBLE_QUOTEMARKS)

            expect(match_results).toBeTruthy()
            expect(match_results?.sort()).toStrictEqual(["“", "”"].sort())
        })

        it('should find even if they are multiple on single line', () => {
            const input = `“HELLO WORLD” “HELLO WORLD”`

            const match_results = input.match(DOUBLE_QUOTEMARKS)

            expect(match_results).toBeTruthy()
            expect(match_results?.sort()).toStrictEqual(["“", "”", "“", "”"].sort())
        })

        it('should find it on multiple lines', () => {
            const input = `“HELLO 
            WORLD”`

            const match_results = input.match(DOUBLE_QUOTEMARKS)

            expect(match_results).toBeTruthy()
            expect(match_results?.sort()).toStrictEqual(["“", "”"].sort())
        })

        it('should find even if they are multiple on multiple lines', () => {
            const input = `
            “HELLO WORLD”
            “HELLO WORLD”`

            const match_results = input.match(DOUBLE_QUOTEMARKS)

            expect(match_results).toBeTruthy()
            expect(match_results?.sort()).toStrictEqual(["“", "”", "“", "”"].sort())
        })
    })

    describe('SINGLE_QUOTEMARKS', () => {
        it('should find it on single line', () => {
            const input = `‘HELLO WORLD’`

            const match_results = input.match(SINGLE_QUOTEMARKS)

            expect(match_results).toBeTruthy()
            expect(match_results?.sort()).toStrictEqual(["‘", "’"].sort())
        })

        it('should find even if they are multiple on single line', () => {
            const input = `‘HELLO WORLD’ ‘HELLO WORLD’`

            const match_results = input.match(SINGLE_QUOTEMARKS)

            expect(match_results).toBeTruthy()
            expect(match_results?.sort()).toStrictEqual(["‘", "’", "‘", "’"].sort())
        })

        it('should find it on multiple lines', () => {
            const input = `‘HELLO 
            WORLD’`

            const match_results = input.match(SINGLE_QUOTEMARKS)

            expect(match_results).toBeTruthy()
            expect(match_results?.sort()).toStrictEqual(["‘", "’"].sort())
        })

        it('should find even if they are multiple on multiple lines', () => {
            const input = `
            ‘HELLO WORLD’
            ‘HELLO WORLD’`

            const match_results = input.match(SINGLE_QUOTEMARKS)

            expect(match_results).toBeTruthy()
            expect(match_results?.sort()).toStrictEqual(["‘", "’", "‘", "’"].sort())
        })
    })

    describe('EFFECTIVE_DATE_TXT', () => {
        it('should find it on single line', () => {
            const input = `These rules are effective as of BLA`

            const match_results = input.match(EFFECTIVE_DATE_TXT)

            expect(match_results).toBeTruthy()
            expect(match_results?.length).toBe(1)
            expect(match_results?.[0]).toBe("These rules are effective as of")
        })

        it('should not find when it is not on the start of the line', () => {
            const input = `BLA These rules are effective as of BLA`

            const match_results = input.match(EFFECTIVE_DATE_TXT)

            expect(match_results).toBeFalsy()
        })

        it('should not find it when it is on a different line', () => {
            const input = `BLA
            These rules are effective as of BLA`

            const match_results = input.match(EFFECTIVE_DATE_TXT)

            expect(match_results).toBeFalsy()
        })
    })

    describe('MULTIPLE_EMPTY_LINES', () => {
        it('should find it on given example from rules', () => {
            const input = `Thanks to all our project team members and the many others too numerous to mention who have contributed to this product.












            These rules are effective as of July 8, 2022.`

            const match_results = input.match(MULTIPLE_EMPTY_LINES)

            expect(match_results).toBeTruthy()
            expect(match_results?.length).toBe(1)
            expect(match_results?.[0]).toBe("\n\n\n\n\n\n\n\n\n\n\n\n\n            T")
        })
    })

})
