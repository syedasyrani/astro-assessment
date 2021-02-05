import React from 'react'
import moment from 'moment'

import { dayBlocksFromToday, convertToReadableTime } from '../../helpers/moment'

const ChannelDetailView = ({
  channel,
  activeDaySchedule,
  setActiveDaySchedule,
}) => {
  return (
    <div className="container md:mx-auto flex flex-col p-4">
      {channel ? (
        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4">
          <div className="md:w-1/4">
            <div
              className="flex flex-col flex-shrink rounded shadow-md justify-center items-center border-r border-transparent p-4"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
            >
              <img src={channel.imageUrl} alt="" />
              <h2 className="mt-4 font-bold text-xl">
                {parseInt(channel.stbNumber) === 0
                  ? 'Astro Go Exclusive'
                  : `Channel ${channel.stbNumber}`}
              </h2>
              <div className="mt-4 text-gray-800">
                <p>{channel.description}</p>
              </div>
            </div>
          </div>
          <div
            className="flex flex-col rounded shadow-md border-transparent rounded shadow flex-grow text-white"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
          >
            <div className="hidden md:flex flex-row justify-between bg-gray-700 rounded shadow items-center p-2">
              {dayBlocksFromToday(7).map((day, i) => (
                <div
                  key={`day-${i}`}
                  className={`py-2 px-4 cursor-pointer hover:text-pink-500 ${
                    activeDaySchedule.format('ddd') === day.format('ddd')
                      ? 'text-pink-500'
                      : 'text-white'
                  }`}
                  onClick={() => setActiveDaySchedule(day)}
                >
                  {i === 0 ? 'Today' : day.format('D MMM')}
                </div>
              ))}
            </div>
            <div className="flex flex-row md:hidden justify-center items-center bg-gray-700 rounded shadow items-center p-4">
              <span>Select date</span>
              <select
                className="text-white w-full p-2 border border-white rounded bg-transparent"
                onChange={({ target: { value } }) =>
                  setActiveDaySchedule(value)
                }
              >
                {dayBlocksFromToday(7).map((day, i) => (
                  <option key={`day-${i}`} value={day}>
                    {i === 0 ? 'Today' : day.format('D MMM')}
                  </option>
                ))}
              </select>
            </div>
            <div className="p-4 space-y-4">
              {channel.schedule[activeDaySchedule.format('YYYY-MM-DD')]
                .map((event) => ({
                  ...event,
                  endDatetime: moment(event.datetime)
                    .add(event.duration.split(':')[0], 'hours')
                    .add(event.duration.split(':')[1], 'minutes')
                    .add(event.duration.split(':')[2], 'seconds'),
                }))
                .filter(
                  (event) =>
                    moment().isBetween(
                      moment(event.datetime),
                      moment(event.endDatetime)
                    ) || moment().isBefore(moment(event.datetime))
                )
                .map((event) => (
                  <div
                    key={`event-${event.eventId}`}
                    className="flex flex-row text-gray-600"
                  >
                    <div
                      className={`${
                        moment().isBetween(
                          moment(event.datetime),
                          moment(event.endDatetime)
                        )
                          ? 'font-bold text-gray-700'
                          : ''
                      }`}
                      style={{ width: '120px' }}
                    >
                      {moment().isBetween(
                        moment(event.datetime),
                        moment(event.endDatetime)
                      )
                        ? 'On Now'
                        : convertToReadableTime(event.datetime)}
                    </div>
                    <div
                      className={`w-full ${
                        moment().isBetween(
                          moment(event.datetime),
                          moment(event.endDatetime)
                        )
                          ? 'font-bold text-gray-700'
                          : ''
                      }`}
                    >
                      {event.title}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  )
}

export default ChannelDetailView
