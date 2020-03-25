import { readFileSync } from 'fs'
import { resolve } from 'path'
import { JSDOM } from 'jsdom'
import formJson from '../formJson'

const resources = resolve(__dirname, 'resources')

describe('text type based inputs', () => {
  it('should return an object with the values of all named inputs', () => {
    const textBased = resolve(resources, 'text-based.html')
    const html = readFileSync(textBased, 'utf8')

    const { window } = new JSDOM(html)
    const form = window.document.forms[0]
    const json = formJson(form)

    expect(json).toEqual({
      name: 'Idan Loo',
      keyword: 'star it',
      contact: {
        location: 'China',
        email: 'im@siwei.lu',
      },
      info: {
        gender: 'male',
        hobbies: {
          singing: true,
          designing: true,
          sleeping: false,
        },
      },
    })
  })
})

describe('number type based inputs', () => {
  it('should parse the values to Number, then return them', () => {
    const numberBased = resolve(resources, 'number-based.html')
    const html = readFileSync(numberBased)

    const { window } = new JSDOM(html)
    const form = window.document.forms[0]
    const json = formJson(form)

    expect(json).toEqual({
      age: 23,
      speed: 50,
    })
  })
})

describe('date type based inputs', () => {
  it('should parse the values to Date, then return them', () => {
    const dateBased = resolve(resources, 'date-based.html')
    const html = readFileSync(dateBased)

    const { window } = new JSDOM(html)
    const form = window.document.forms[0]
    const json = formJson(form)

    expect(json).toEqual({
      month: new Date('2019-07'),
      date: new Date('2019-07-10'),
    })
  })
})
