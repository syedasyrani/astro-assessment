import moment from 'moment'

const now = moment()

const halfHourBlocks = (numOfBlocks) => {
  numOfBlocks = --numOfBlocks
  let cloneNow = moment(now)
  let arr = []

  let currentBlock =
    cloneNow.minutes() >= 30 ? cloneNow.minutes(30) : cloneNow.startOf('hour')

  arr.push(currentBlock)

  for (let i = 0; i < numOfBlocks; i++) {
    let newBlock = moment(arr[i]).add(30, 'minutes')
    arr.push(newBlock)
  }

  return arr
}

const dayBlocksFromToday = (numOfBlocks) => {
  numOfBlocks = --numOfBlocks

  let cloneNow = moment(now)
  let arr = []

  arr.push(cloneNow.startOf('day'))

  for (let i = 0; i < numOfBlocks; i++) {
    let newBlock = moment(arr[i]).add(1, 'day')
    arr.push(newBlock)
  }

  return arr
}

const convertToReadableTime = (time) => {
  let readable = moment(time)

  return readable.format('hh:mm a')
}

export { now, halfHourBlocks, dayBlocksFromToday, convertToReadableTime }
