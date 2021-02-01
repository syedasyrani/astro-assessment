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

export { now, halfHourBlocks }
