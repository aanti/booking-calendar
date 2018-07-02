export const Day = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

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