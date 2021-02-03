import React from 'react'
import moment from 'moment'

import { dayBlocksFromToday, convertToReadableTime } from '../../helpers/moment'

const ChannelDetailView = ({
  channel,
  activeDaySchedule,
  setActiveDaySchedule,
}) => {
  return (
    <div className="md:container md:mx-auto flex flex-col p-4">
      {channel ? (
        <div className="flex flex-row space-x-4">
          <div className="w-1/5">
            <div
              className="flex flex-col flex-shrink rounded shadow-md justify-center items-center border-r border-transparent p-4"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
            >
              <img src={channel.originalImage} alt="" />
              <h2 className="mt-4 font-bold text-xl">{channel.stbNumber}</h2>
              <div className="mt-4 text-gray-800">
                <p>{channel.description}</p>
              </div>
            </div>
          </div>
          <div
            className="flex flex-col rounded shadow-md border-transparent rounded shadow flex-grow text-white"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
          >
            <div className="flex flex-row justify-between bg-gray-700 rounded shadow items-center p-2">
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
                    !moment(event.datetime).isBefore(
                      moment().minutes() >= 30
                        ? moment().minutes(30)
                        : moment().startOf('hour')
                    )
                )
                .map((event) => (
                  <div
                    key={`event-${event.eventId}`}
                    className="flex flex-row text-gray-600"
                  >
                    <div
                      className={`w-32 ${
                        moment().isBetween(
                          moment(event.datetime),
                          moment(event.endDatetime)
                        ) && 'font-bold text-gray-700'
                      }`}
                    >
                      {moment().isBetween(
                        moment(event.datetime),
                        moment(event.endDatetime)
                      )
                        ? 'On Now'
                        : convertToReadableTime(event.datetime)}
                    </div>
                    <div
                      className={`${
                        moment().isBetween(
                          moment(event.datetime),
                          moment(event.endDatetime)
                        ) && 'font-bold text-gray-700'
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
