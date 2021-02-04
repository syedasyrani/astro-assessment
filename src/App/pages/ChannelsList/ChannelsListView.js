import React from 'react'
import { useHistory, useParams } from 'react-router-dom'

const ChannelsListView = ({
  channels,
  listCategories,
  channelCategories,
  channelLanguages,
  channelResolutions,
  sortOptions,
  // activeChannel,
  // setActiveChannel,
  activeSort,
  setActiveSort,
  activeSortOrientation,
  setActiveSortOrientation,
  activeCategoryFilters,
  setActiveCategoryFilters,
  activeLanguageFilters,
  setActiveLanguageFilters,
  activeResolutionFilters,
  setActiveResolutionFilters,
  searchText,
  setSearchText,
  favoriteChannels,
  toggleFavoriteChannel,
}) => {
  const history = useHistory()
  return (
    <div className="flex flex-col w-full">
      <div className="bg-gray-700 shadow text-gray-200 mb-4">
        <div className="md:container md:mx-auto flex flex-col">
          <div className="flex flex-row py-2 px-4 content-center items-center justify-between my-2">
            {listCategories.map((list, i) => (
              <div
                key={`list-${i}`}
                className="cursor-pointer hover:text-pink-500"
                onClick={() =>
                  list === 'My Channels'
                    ? history.push(`/channels/my`)
                    : history.push(`/channels`)
                }
              >
                {list}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="md:container md:mx-auto flex flex-row">
        <div className="flex flex-col py-2 px-4 content-center w-1/5 text-white space-y-4">
          <div className="flex flex-col">
            <label className="mb-1">Search</label>
            <input
              type="text"
              className="border rounded px-2 py-1 text-gray-900"
              value={searchText}
              onChange={({ target: { value } }) => setSearchText(value)}
              placeholder="Channel No. or Name"
            />
          </div>
          <div>
            <label>Categories</label>
            <div className="flex flex-row flex-wrap mt-2">
              {channelCategories.map((category, i) => (
                <div
                  key={`category-${i}`}
                  className={`disborder mr-2 mb-2 py-1 px-2 rounded cursor-pointer hover:bg-gray-700 hover:border-gray-700 ${
                    activeCategoryFilters.includes(category) &&
                    'bg-gray-700 border-gray-700'
                  }`}
                  onClick={() =>
                    activeCategoryFilters.includes(category)
                      ? setActiveCategoryFilters(
                          [...activeCategoryFilters].filter(
                            (filter) => filter !== category
                          )
                        )
                      : setActiveCategoryFilters([
                          ...activeCategoryFilters,
                          category,
                        ])
                  }
                >
                  {category}
                </div>
              ))}
            </div>
          </div>
          <div>
            <label>Languages</label>
            <div className="flex flex-row flex-wrap mt-2">
              {channelLanguages.map((language, i) => (
                <div
                  key={`language-${i}`}
                  className={`border mr-2 mb-2 py-1 px-2 rounded cursor-pointer hover:bg-gray-700 hover:border-gray-700 ${
                    activeLanguageFilters.includes(language) &&
                    'bg-gray-700 border-gray-700'
                  }`}
                  onClick={() =>
                    activeLanguageFilters.includes(language)
                      ? setActiveLanguageFilters(
                          [...activeLanguageFilters].filter(
                            (filter) => filter !== language
                          )
                        )
                      : setActiveLanguageFilters([
                          ...activeLanguageFilters,
                          language,
                        ])
                  }
                >
                  {language}
                </div>
              ))}
            </div>
          </div>
          <div>
            <label>Resolutions</label>
            <div className="flex flex-row flex-wrap mt-2">
              {channelResolutions.map((resolution, i) => (
                <div
                  key={`resolution-${i}`}
                  className={`border mr-2 mb-2 py-1 px-2 rounded cursor-pointer hover:bg-gray-700 hover:border-gray-700 ${
                    activeResolutionFilters.includes(resolution) &&
                    'bg-gray-700 border-gray-700'
                  }`}
                  onClick={() =>
                    activeResolutionFilters.includes(resolution)
                      ? setActiveResolutionFilters(
                          [...activeResolutionFilters].filter(
                            (filter) => filter !== resolution
                          )
                        )
                      : setActiveResolutionFilters([
                          ...activeResolutionFilters,
                          resolution,
                        ])
                  }
                >
                  {resolution}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-4/5 ml-4">
          <div className="text-white mb-4">
            <label htmlFor="selectSort">Sort by: </label>
            <select
              className="bg-transparent p-2 border rounded ml-4 w-32 cursor-pointer"
              value={activeSort}
              onChange={({ target: { value } }) => setActiveSort(value)}
            >
              {sortOptions.map((option, i) => (
                <option key={`option-${i}`} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="rounded p-2 ml-4 cursor-pointer focus:outline-none"
              onClick={() => setActiveSortOrientation(!activeSortOrientation)}
            >
              {activeSortOrientation === true ? (
                <i className="fas fa-caret-down" />
              ) : (
                <i className="fas fa-caret-up" />
              )}
            </button>
          </div>
          <div className="flex flex-row flex-wrap">
            {channels.map((channel) => (
              <div
                key={channel.id}
                className="relative w-1/4 mb-8 bg-black shadow transform origin-center duration-200 ease-in-out hover:z-10 hover:scale-125 hover:shadow-lg"
              >
                <img
                  className="block m-auto cursor-pointer"
                  onClick={() => history.push(`/channel/${channel.id}`)}
                  src={
                    channel.backupImage
                      ? channel.backupImage
                      : channel.originalImage
                  }
                  alt={`${channel.stbNumber}-logo`}
                />
                <div
                  className="absolute bottom-0 right-0 text-bold text-white px-2 z-10"
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                >
                  {parseInt(channel.stbNumber) === 0
                    ? 'Astro Go Exclusive'
                    : channel.stbNumber}
                  <i
                    className={`cursor-pointer ${
                      favoriteChannels.find(
                        (channelID) => channelID === channel.id
                      )
                        ? 'fas'
                        : 'far'
                    } fa-star ml-2`}
                    onClick={() => toggleFavoriteChannel(channel.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChannelsListView
