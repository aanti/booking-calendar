import * as Dates from '../dates/dates'

describe('getNumberOfDays', () => {
  it('should return correct number of days', () => {
    const nJanuary = Dates.getNumberOfDays(2018, 1)
    const nFebruary = Dates.getNumberOfDays(2018, 2)
    const nDecember = Dates.getNumberOfDays(2018, 12)
    expect(nJanuary).toBe(31)
    expect(nFebruary).toBe(28)
    expect(nDecember).toBe(31)
  })
})

describe('getDayOfWeek', () => {
  it('should return correct day of week', () => {
    const dayOfWeek = Dates.getDayOfWeek(2018, 7, 4)
    const nameOfDay = Dates.Day[dayOfWeek]
    expect(dayOfWeek).toBe(3)
    expect(nameOfDay).toBe('We')
  })
})

describe('getNextMonth', () => {
  it('should return correct month and year (normal case)', () => {
    const date = { year: 2018, month: 7 }
    const newDate = Dates.getNextMonth(date)
    expect(newDate.year).toBe(2018)
    expect(newDate.month).toBe(8)
  })
  it('should return correct month and year (edge case)', () => {
    const date = { year: 2018, month: 12 }
    const newDate = Dates.getNextMonth(date)
    expect(newDate.year).toBe(2019)
    expect(newDate.month).toBe(1)
  })
})

describe('getPrevMonth', () => {
  it('should return correct month and year (normal case)', () => {
    const date = { year: 2018, month: 7 }
    const newDate = Dates.getPrevMonth(date)
    expect(newDate.year).toBe(2018)
    expect(newDate.month).toBe(6)
  })
  it('should return correct month and year (edge case)', () => {
    const date = { year: 2018, month: 1 }
    const newDate = Dates.getPrevMonth(date)
    expect(newDate.year).toBe(2017)
    expect(newDate.month).toBe(12)
  })
})

describe('getMonthName', () => {
  it('return correct name of month', () => {
    const month = 10
    const name = Dates.getMonthName(month)
    expect(name).toBe('October')
  })
})

describe('make2Chars', () => {
  it('returns 2-character result when single digit is argument', () => {
    const result = Dates.make2Chars(3)
    expect(result).toBe('03')
  })
  it('returns 2-character result when two digit number is argument', () => {
    const result = Dates.make2Chars(23)
    expect(result).toBe('23')
  })
})

describe('getDateString', () => {
  it('return correct result in format YYYY/MM/DD', () => {
    const result = Dates.getDateString(2018, 7, 4)
    const expected = '2018/07/04'
    expect(result).toBe(expected)
  })
})

describe('isBefore', () => {
  it('returns true if first day is before the second', () => {
    const result = Dates.isBefore(new Date(2017, 7, 3), new Date(2018, 7, 3))
    const result2 = Dates.isBefore('2017/07/03', '2018/07/03')
    expect(result).toBe(true)
    expect(result2).toBe(true)
  })
  it('returns correct result when only one parameter is passed', () => {
    const result = Dates.isBefore(new Date(2017, 7, 3))
    const result2 = Dates.isBefore('2017/07/03')
    expect(result).toBe(true)
    expect(result2).toBe(true)
  })
})

describe('isAfter', () => {
  it('returns false if first day is after the second', () => {
    const result = Dates.isAfter(new Date(2017, 7, 3), new Date(2018, 7, 3))
    const result2 = Dates.isAfter('2017/07/03', '2018/07/03')
    expect(result).toBe(false)
    expect(result2).toBe(false)
  })
  it('returns correct result when only one parameter is passed', () => {
    const result = Dates.isAfter(new Date(2017, 7, 3))
    const result2 = Dates.isAfter('2017/07/03')
    expect(result).toBe(false)
    expect(result2).toBe(false)
  })
})

describe('stringToObject', () => {
  it('returns date object in shape { year, month, day }', () => {
    const result = Dates.stringToObject('2018/07/04')
    const expected = { year: 2018, month: 7, day: 4 }
    expect(result).toMatchObject(expected)
  })
})

describe('objectToString', () => {
  it('returns date object in string format YYYY/MM/DD', () => {
    const result = Dates.objectToString({ year: 2018, month: 7, day: 4 })
    const expected = '2018/07/04'
    expect(result).toBe('2018/07/04')
  })
})

describe('dateToString', () => {
  it('returns date object in string format YYYY/MM/DD', () => {
    const result = Dates.dateToString(new Date('2018/07/03'))
    const expected = '2018/07/03'
    expect(result).toBe('2018/07/03')
  })
})

describe('dateToObject', () => {
  it('returns date object in shape { year, month, day }', () => {
    const result = Dates.dateToObject(new Date('2018/07/04'))
    const expected = { year: 2018, month: 7, day: 4 }
    expect(result).toMatchObject(expected)
  })
})

describe('getNextDay', () => {
  it('returns next day when argument is string', () => {
    const result = Dates.getNextDay('2018/07/04')
    const expected = '2018/07/05'
    expect(result).toBe(expected)
  })
  it('returns next day when argument is string', () => {
    const result = Dates.getNextDay({ year: 2018, month: 7, day: 4 })
    const expected = { year: 2018, month: 7, day: 5 }
    expect(result).toMatchObject(expected)
  })
})

describe('getDayDiff', () => {
  it('return day difference', () => {
    const date1 = '2018/07/04'
    const date2 = '2018/07/09'
    const result1 = Dates.getDayDiff(date1, date2)
    const result2 = Dates.getDayDiff(date2, date1)
    const expected = 5
    expect(result1).toBe(expected)
    expect(result2).toBe(expected)
    expect(result1).toBe(result2)
  })
})

describe('getDaysArray', () => {
  it('returns correctly array of days', () => {
    const start = '2018/07/04'
    const n = 3
    const result = Dates.getDaysArray({start, n})
    const expected = ['2018/07/04', '2018/07/05', '2018/07/06', '2018/07/07']
    expect(result).toEqual(expect.arrayContaining(expected))
  })
})