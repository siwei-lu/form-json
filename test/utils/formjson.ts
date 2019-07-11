import formJson from '~/utils/formJson'
import { readFileSync } from 'fs'
import { resolve } from 'path'
import { JSDOM } from 'jsdom'

const resources = resolve(__dirname, '../resources')

describe('formJson()', () => {
  describe('text type based inputs', () => {
    it('should return an object with the values of all named inputs', () => {
      const textBased = resolve(resources, './text-based.html')
      const html = readFileSync(textBased, 'utf8')

      const { window } = new JSDOM(html)
      const form = window.document.forms[0]
      const json = formJson(form)

      json.name.should.eq('Idan Loo')
      json.keyword.should.eq('star it')

      json.contact.location.should.eq('China')
      json.contact.email.should.eq('im@siwei.lu')

      json.info.gender.should.eq('male')
      json.info.hobbies.should.length(2)
      json.info.hobbies.should.contain('singing')
      json.info.hobbies.should.contain('designing')
    })
  })

  describe('number type based inputs', () => {
    it('should parse the values to Number, then return them', () => {
      const numberBased = resolve(resources, './number-based.html')
      const html = readFileSync(numberBased)

      const { window } = new JSDOM(html)
      const form = window.document.forms[0]
      const json = formJson(form)

      json.age.should.eq(23)
      json.speed.should.eq(50)
    })
  })

  describe('date type based inputs', () => {
    it('should parse the values to Date, then return them', () => {
      const dateBased = resolve(resources, './date-based.html')
      const html = readFileSync(dateBased)

      const { window } = new JSDOM(html)
      const form = window.document.forms[0]
      const json = formJson(form)

      json.month.getTime().should.eq(new Date('2019-07').getTime())
      json.date.getTime().should.eq(new Date('2019-07-10').getTime())
    })
  })
})
