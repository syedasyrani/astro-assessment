import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import ChannelService from '../../services/Channel'
import ChannelsListView from './ChannelsListView'
import LocalStorageHelper from '../../helpers/localStorage'

import {
  listCategories,
  channelCategories,
  channelLanguages,
  channelResolutions,
  sortOptions,
} from './dashboardData'

const ChannelsList = () => {
  const { category } = useParams()

  const [channelsData, setChannelsData] = useState([])
  const [channels, setChannels] = useState([])
  const [activeChannel, setActiveChannel] = useState(null)
  const [activeSort, setActiveSort] = useState(sortOptions[0])
  const [activeSortOrientation, setActiveSortOrientation] = useState(true)
  const [activeCategoryFilters, setActiveCategoryFilters] = useState([])
  const [activeResolutionFilters, setActiveResolutionFilters] = useState([])
  const [activeLanguageFilters, setActiveLanguageFilters] = useState([])
  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [favoriteChannels, setFavoriteChannels] = useState([])

  const [openSlider, setOpenSlider] = useState(false)

  const toggleFavoriteChannel = (id) => {
    if (favoriteChannels.find((channelID) => channelID === id)) {
      setFavoriteChannels(
        favoriteChannels.filter((channelID) => channelID !== id)
      )
    } else {
      setFavoriteChannels([...favoriteChannels, id])
    }
  }

  // fetch channels data from server
  useEffect(() => {
    const localStorageService = LocalStorageHelper.getData()
    let lsFavoriteChannels = JSON.parse(
      localStorageService.getFavoriteChannels()
    )

    const fetchChannels = async () => {
      let response = await ChannelService.getChannels()

      if (response.status === 200 && response.data.response.length > 0) {
        if (category === 'my') {
          if (lsFavoriteChannels && lsFavoriteChannels.length > 0) {
            setChannelsData(
              response.data.response.filter((channel) =>
                lsFavoriteChannels.includes(channel.id)
              )
            )
          } else {
            setChannelsData(response.data.response)
          }
        } else {
          setChannelsData(response.data.response)
        }
      }
    }

    const fetchFavoriteChannels = () => {
      if (lsFavoriteChannels && lsFavoriteChannels.length > 0) {
        setFavoriteChannels(lsFavoriteChannels)
      }
    }

    fetchChannels()
    fetchFavoriteChannels()
  }, [category])

  useEffect(() => {
    const localStorageService = LocalStorageHelper.getData()

    localStorageService.setFavoriteChannels(favoriteChannels)
  }, [favoriteChannels])

  useEffect(() => {
    const sortData = (datas) => {
      return activeSort === 'Channel No.'
        ? activeSortOrientation === true
          ? [...datas].sort(
              (a, b) => parseInt(a.stbNumber) - parseInt(b.stbNumber)
            )
          : [...datas]
              .sort((a, b) => parseInt(a.stbNumber) - parseInt(b.stbNumber))
              .reverse()
        : activeSort === 'Channel Name'
        ? activeSortOrientation === true
          ? [...datas].sort((a, b) => a.title.localeCompare(b.title))
          : [...datas].sort((a, b) => a.title.localeCompare(b.title)).reverse()
        : datas
    }

    const searchData = (datas) => {
      return [...datas].filter(
        (channel) =>
          channel.stbNumber.includes(searchText) ||
          channel.title.toLowerCase().includes(searchText)
      )
    }

    const filterDataByCategory = (datas) =>
      datas.filter((data) => activeCategoryFilters.includes(data.category))
    const filterDataByLanguage = (datas) =>
      datas.filter((data) => activeLanguageFilters.includes(data.language))
    const filterDataByResolution = (datas) =>
      datas.filter((channel) =>
        activeResolutionFilters.includes(channel.isHd ? 'HD' : 'SD')
      )

    const filterFunc = (datas) => {
      if (searchText.length > 0) {
        if (activeCategoryFilters.length > 0) {
          if (activeLanguageFilters.length > 0) {
            if (activeResolutionFilters.length > 0) {
              // all 3
              return filterDataByResolution(
                filterDataByLanguage(filterDataByCategory(searchData(datas)))
              )
            } else {
              // no resolution
              return filterDataByLanguage(
                filterDataByCategory(searchData(datas))
              )
            }
          } else {
            if (activeResolutionFilters.length > 0) {
              // no language
              return filterDataByResolution(
                filterDataByCategory(searchData(datas))
              )
            } else {
              // no language and resolution
              return filterDataByCategory(searchData(datas))
            }
          }
        } else {
          if (activeLanguageFilters.length > 0) {
            if (activeResolutionFilters.length > 0) {
              // no category
              return filterDataByResolution(
                filterDataByLanguage(searchData(datas))
              )
            } else {
              // no category and resolution
              return filterDataByLanguage(searchData(datas))
            }
          } else {
            if (activeResolutionFilters.length > 0) {
              // no category and language
              return filterDataByResolution(searchData(datas))
            } else {
              return searchData(datas)
            }
          }
        }
      } else {
        if (activeCategoryFilters.length > 0) {
          if (activeLanguageFilters.length > 0) {
            if (activeResolutionFilters.length > 0) {
              // all 3
              return filterDataByResolution(
                filterDataByLanguage(filterDataByCategory(datas))
              )
            } else {
              // no resolution
              return filterDataByLanguage(filterDataByCategory(datas))
            }
          } else {
            if (activeResolutionFilters.length > 0) {
              // no language
              return filterDataByResolution(filterDataByCategory(datas))
            } else {
              // no language and resolution
              return filterDataByCategory(datas)
            }
          }
        } else {
          if (activeLanguageFilters.length > 0) {
            if (activeResolutionFilters.length > 0) {
              // no category
              return filterDataByResolution(filterDataByLanguage(datas))
            } else {
              // no category and resolution
              return filterDataByLanguage(datas)
            }
          } else {
            if (activeResolutionFilters.length > 0) {
              // no category and language
              return filterDataByResolution(datas)
            } else {
              return datas
            }
          }
        }
      }
    }

    setChannels(sortData(filterFunc([...channelsData])))
  }, [
    channelsData,
    activeSort,
    activeSortOrientation,
    searchText,
    activeCategoryFilters,
    activeLanguageFilters,
    activeResolutionFilters,
  ])

  return (
    <ChannelsListView
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
      activeCategoryFilters={activeCategoryFilters}
      setActiveCategoryFilters={setActiveCategoryFilters}
      activeLanguageFilters={activeLanguageFilters}
      setActiveLanguageFilters={setActiveLanguageFilters}
      activeResolutionFilters={activeResolutionFilters}
      setActiveResolutionFilters={setActiveResolutionFilters}
      searchText={searchText}
      setSearchText={setSearchText}
      searchResults={searchResults}
      setSearchResults={setSearchResults}
      favoriteChannels={favoriteChannels}
      toggleFavoriteChannel={toggleFavoriteChannel}
      openSlider={openSlider}
      setOpenSlider={setOpenSlider}
    />
  )
}

export default ChannelsList
