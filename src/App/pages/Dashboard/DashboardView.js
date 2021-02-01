import React from 'react'

// import { halfHourBlocks } from '../../helpers/moment'
// import placeholderImage from '../../../assets/images/150.png'

const DashboardView = ({
  channels,
  listCategories,
  channelCategories,
  channelLanguages,
  channelResolutions,
  sortOptions,
  activeChannel,
  setActiveChannel,
  activeSort,
  setActiveSort,
  activeSortOrientation,
  setActiveSortOrientation,
  activeFilters,
  setActiveFilters,
  searchText,
  setSearchText,
  searchResults,
  setSearchResults,
}) => {
  return (
    <div className="flex flex-col w-full">
      <div className="bg-gray-700 shadow text-gray-200 mb-4">
        <div className="md:container md:mx-auto flex flex-col">
          <div className="flex flex-row py-2 px-4 content-center items-center justify-between my-2">
            {listCategories.map((category, i) => (
              <div
                key={`category-${i}`}
                className="cursor-pointer hover:text-pink-500"
              >
                {category}
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
            />
          </div>
          <div>
            <label>Categories</label>
            <div className="flex flex-row flex-wrap mt-2">
              {channelCategories.map((category) => (
                <div
                  className={`border mr-2 mb-2 py-1 px-2 rounded cursor-pointer hover:bg-gray-700 hover:border-gray-700 ${
                    activeFilters.includes(category) &&
                    'bg-gray-700 border-gray-700'
                  }`}
                  onClick={() =>
                    activeFilters.includes(category)
                      ? setActiveFilters(
                          [...activeFilters].filter(
                            (filter) => filter !== category
                          )
                        )
                      : setActiveFilters([...activeFilters, category])
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
              {channelLanguages.map((language) => (
                <div
                  className={`border mr-2 mb-2 py-1 px-2 rounded cursor-pointer hover:bg-gray-700 hover:border-gray-700 ${
                    activeFilters.includes(language) &&
                    'bg-gray-700 border-gray-700'
                  }`}
                  onClick={() =>
                    activeFilters.includes(language)
                      ? setActiveFilters(
                          [...activeFilters].filter(
                            (filter) => filter !== language
                          )
                        )
                      : setActiveFilters([...activeFilters, language])
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
              {channelResolutions.map((resolution) => (
                <div
                  className={`border mr-2 mb-2 py-1 px-2 rounded cursor-pointer hover:bg-gray-700 hover:border-gray-700 ${
                    activeFilters.includes(resolution) &&
                    'bg-gray-700 border-gray-700'
                  }`}
                  onClick={() =>
                    activeFilters.includes(resolution)
                      ? setActiveFilters(
                          [...activeFilters].filter(
                            (filter) => filter !== resolution
                          )
                        )
                      : setActiveFilters([...activeFilters, resolution])
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
              {sortOptions.map((option) => (
                <option value={option}>{option}</option>
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
                className="flex flex-row w-1/5 mb-8 bg-black"
              >
                <img
                  className="m-auto hover:border-8 "
                  src={
                    channel.backupImage
                      ? channel.backupImage
                      : channel.originalImage
                  }
                  alt={`${channel.stbNumber}-logo`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardView
