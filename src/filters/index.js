import dayjs from 'dayjs'
export const dateformat = time => {
  return dayjs(time).format('YYYY-MM-DD')
}
