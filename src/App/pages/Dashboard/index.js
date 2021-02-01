import React, { useState, useEffect } from 'react'
import ChannelService from '../../services/Channel'
import DashboardView from './DashboardView'

import {
  listCategories,
  channelCategories,
  channelLanguages,
  channelResolutions,
  sortOptions,
} from './dashboardData'

const Dashboard = () => {
  const [channelsData, setChannelsData] = useState([])
  const [channels, setChannels] = useState([])
  const [activeChannel, setActiveChannel] = useState(null)
  const [activeSort, setActiveSort] = useState(sortOptions[0])
  const [activeSortOrientation, setActiveSortOrientation] = useState(0) // 0 is desc, 1 is asc
  const [activeFilters, setActiveFilters] = useState([])
  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState([])

  // fetch channels data from server
  useEffect(() => {
    const fetchChannels = async () => {
      let response = await ChannelService.getChannels()

      if (response.status === 200 && response.data.response.length > 0) {
        setChannelsData(response.data.response)
      }
    }

    fetchChannels()
  }, [])

  // handling sort side effect
  useEffect(() => {
    activeSort === 'Channel No.'
      ? activeSortOrientation === true
        ? setChannels(
            [...channelsData].sort(
              (a, b) => parseInt(a.stbNumber) - parseInt(b.stbNumber)
            )
          )
        : setChannels(
            [...channelsData]
              .sort((a, b) => parseInt(a.stbNumber) - parseInt(b.stbNumber))
              .reverse()
          )
      : activeSort === 'Channel Name'
      ? activeSortOrientation === true
        ? setChannels(
            [...channelsData].sort((a, b) => a.title.localeCompare(b.title))
          )
        : setChannels(
            [...channelsData]
              .sort((a, b) => a.title.localeCompare(b.title))
              .reverse()
          )
      : setChannels(channelsData)
  }, [channelsData, activeSort, activeSortOrientation])

  useEffect(() => {
    console.log(channels)
  }, [channels])

  // handling search side effect
  useEffect(() => {
    let sorted = [...channelsData]
    if (searchText.length > 0) {
      setChannels(
        [...channelsData].filter(
          (channel) =>
            channel.stbNumber.includes(searchText) ||
            channel.title.toLowerCase().includes(searchText)
        )
      )
    } else {
      setChannels(sorted)
    }
  }, [channelsData, searchText])

  // handling filters side effect
  useEffect(() => {
    if (activeFilters.length > 0) {
      console.log(
        channelsData.map((channel) => {
          let channelData = { ...channel }

          channelData.filterData = [
            channel.category,
            channel.language,
            // channel.isHd ? 'HD' : 'SD',
          ]

          return channelData
        })
        // .filter(
        //   (channel) =>

        //     // activeFilters.some((filter) =>
        //     //   channel.filterData.includes(filter)
        //     // )
        //   // {
        //   //   if (activeFilters.includes(channelResolutions)) {

        //   //   } else {
        //   //     channel.filterData.some((filter) => activeFilters.includes(filter))
        //   //   }
        //   // }
        // )
      )
    } else {
      setChannels(channelsData)
    }
  }, [channelsData, activeFilters])

  return (
    <DashboardView
      channels={channels}
      listCategories={listCategories}
      channelCategories={channelCategories}
      channelLanguages={channelLanguages}
      channelResolutions={channelResolutions}
      sortOptions={sortOptions}
      activeChannel={activeChannel}
      setActiveChannel={setActiveChannel}
      activeSort={activeSort}
      setActiveSort={setActiveSort}
      activeSortOrientation={activeSortOrientation}
      setActiveSortOrientation={setActiveSortOrientation}
      activeFilters={activeFilters}
      setActiveFilters={setActiveFilters}
      searchText={searchText}
      setSearchText={setSearchText}
      searchResults={searchResults}
      setSearchResults={setSearchResults}
    />
  )
}

export default Dashboard
