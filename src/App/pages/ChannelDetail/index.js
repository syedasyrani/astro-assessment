import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'

import ChannelService from '../../services/Channel'
import ChannelDetailView from './ChannelDetailView'

const ChannelDetail = () => {
  const { id } = useParams()

  const [channel, setChannel] = useState(null)
  const [activeDaySchedule, setActiveDaySchedule] = useState(
    moment().startOf('day')
  )

  useEffect(() => {
    const fetchChannel = async (channelID) => {
      try {
        let response = await ChannelService.getChannelByID(channelID)

        if (response.status === 200 && response.data.response) {
          setChannel(response.data.response)
        }
      } catch (error) {
        window.location.replace('/channels')
      }
    }

    fetchChannel(id)
  }, [id])

  return (
    <ChannelDetailView
      channel={channel}
      activeDaySchedule={activeDaySchedule}
      setActiveDaySchedule={setActiveDaySchedule}
    />
  )
}

export default ChannelDetail
