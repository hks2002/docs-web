import { t } from 'src/boot/i18n'

const createDayRange = (daysOffset) => {
  const start = new Date()
  start.setDate(start.getDate() + daysOffset)
  start.setHours(0, 0, 0, 0)

  const end = new Date(start)
  end.setHours(23, 59, 59, 999)

  return { start, end }
}

const createWeekRange = (weeksOffset) => {
  const now = new Date()
  const currentDay = now.getDay()
  const mondayOffset = currentDay === 0 ? 6 : currentDay - 1

  const start = new Date(now)
  start.setDate(start.getDate() - mondayOffset - weeksOffset * 7)
  start.setHours(0, 0, 0, 0)

  const end = new Date(start)
  end.setDate(end.getDate() + 6)
  end.setHours(23, 59, 59, 999)

  return { start, end }
}

const createMonthRange = (monthsOffset) => {
  const start = new Date()
  start.setMonth(start.getMonth() + monthsOffset)
  start.setDate(1)
  start.setHours(0, 0, 0, 0)

  const end = new Date(start)
  end.setMonth(end.getMonth() + 1)
  end.setDate(0)
  end.setHours(23, 59, 59, 999)

  return { start, end }
}

const getTimePeriods = () => {
  return {
    today: createDayRange(0),
    yesterday: createDayRange(-1),
    dayBeforeYesterday: createDayRange(-2),
    thisWeek: createWeekRange(0),
    lastWeek: createWeekRange(-1),
    last2Weeks: createWeekRange(-2),
    lastMonth: createMonthRange(-1),
  }
}

const getTimePeriod = (accessTime) => {
  const periods = getTimePeriods()
  const accessDate = new Date(accessTime)

  const isBetween = (target, start, end) => {
    return target >= start && target <= end
  }

  const periodChecks = [
    { key: 'today', label: t('S.TODAY') },
    { key: 'yesterday', label: t('S.YESTERDAY') },
    { key: 'dayBeforeYesterday', label: t('S.DAY_BEFORE_YESTERDAY') },
    { key: 'thisWeek', label: t('S.THIS_WEEK') },
    { key: 'lastWeek', label: t('S.LAST_WEEK') },
    { key: 'last2Weeks', label: t('S.LAST_2_WEEKS') },
    { key: 'lastMonth', label: t('S.LAST_MONTH') },
  ]

  for (const { key, label } of periodChecks) {
    if (isBetween(accessDate, periods[key].start, periods[key].end)) {
      return label
    }
  }

  return t('S.OLDER')
}

export { getTimePeriod, getTimePeriods }
