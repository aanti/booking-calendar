export const Day = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MsPerDay = 86400000

const Month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// month: [1-12]
export const getNumberOfDays = (year, month) => {
  return new Date(year, month, 0).getDate()
}

// month: [1, 12], day: [1, 31]
export const getDayOfWeek = (year, month, day) => new Date(year, month - 1, day).getDay()

// month: [1, 12]
export const getNextMonth = ({ year, month }) => (month === 12)
  ? { year: year + 1, month: 1 }
  : { year, month: month + 1 }

// month: [1, 12]
export const getPrevMonth = ({ year, month }) => (month === 1)
  ? { year: year - 1, month: 12 }
  : { year, month: month - 1 }

// month: [1, 12]
export const getMonthName = month => Month[month - 1]

const make2Chars = num => ('0' + num).slice(-2)

// month: [1, 12], day: [1-31]
export const getDateString = (year, month, day) => `${year}/${make2Chars(month)}/${make2Chars(day)}`

export const isBefore = (date1, date2 = new Date()) => new Date(date1).getTime() < new Date(date2).getTime()

export const isAfter = (date1, date2 = new Date()) => new Date(date1).getTime() > new Date(date2).getTime()

export const stringToObject = (stringDate) => {
  const date = new Date(stringDate)
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDay() + 1
    }
}

export const objectToString = (objectDate) => {
  const { year, month, day } = objectDate
  return getDateString(year, month, day)
}

export const dateToString = date => {
  const dateOb = new Date(date)
  const year = dateOb.getFullYear()
  const month = dateOb.getMonth()
  const day = dateOb.getDate()
  return getDateString(year, month + 1, day)
}

export const dateToObject = date => {
  const dateOb = new Date(date)
  return {
    year: dateOb.getFullYear(),
    month: dateOb.getMonth() + 1,
    day: dateOb.getDate()
  }
}

export const getNextDay = (date) => {
  const stringDate = typeof date === 'object' ? objectToString(date) : date
  const timestamp = new Date(stringDate).getTime() + MsPerDay
  return typeof date === 'object' ? stringToObject(timestamp) : dateToString(timestamp)
}

export const getDayDiff = (date1, date2) => (Math.abs(new Date(date1).getTime() - new Date(date2).getTime())) / MsPerDay

export const getDaysArray = ({ start, n }) => {
  const result = [start]
  let i
  for (i = 0; i < n; i++) {
    result.push(getNextDay(result[i]))
  }
  return result
}