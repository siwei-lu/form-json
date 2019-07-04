import { deepGet, deepSet } from '~/utils/deep'
import { expect } from 'chai'

const data = [{
  name: 'SYSU',
  students: [{
    name: 'Idan',
    subject: 'SE'
  }, {
    name: 'Tom',
    subject: 'UI'
  }]
}, {
  name: 'HKUST',
  students: [{
    name: 'Mary',
    subject: 'CS'
  }, {
    name: 'Tony',
    subject: 'Art'
  }]
}]

describe('Common Util', () => {
  it('should return the current value of a given deep path', () => {
    const schools = data

    const idan = deepGet(schools, '0.students.0')
    idan.name.should.eq('Idan')

    const hkust = deepGet(schools, '1')
    hkust.name.should.eq('HKUST')

    const students = deepGet(hkust, 'students')
    students.push({ name: 'Joey', subject: 'HR' })
    students.should.length(3)
  })

  it('should return undefine when the given path not exists', () => {
    expect(deepGet(data, 'a.b.0.1.c')).undefined
  })

  it('should set the given value to the given deep path', () => {
    const schools = [...data]

    deepSet(schools, '0.name', '中山大学')
    schools[0].name.should.eq('中山大学')

    deepSet(schools, '0.students.1.subject', 'Big Data')
    schools[0].students[1].subject.should.eq('Big Data')

    deepSet(schools, '1.students', [])
    schools[1].students.should.empty
  })

  it('should create a set of object when setting a value to an undefined key', () => {
    const schools = [...data]

    deepSet(schools, '2.name', 'PKU')
    schools[2].name.should.eq('PKU')
  })
})
