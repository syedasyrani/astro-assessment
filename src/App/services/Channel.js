import API from '../helpers/axios'

const ChannelService = {
  getChannels: async () =>
    API.doRequest({
      url: '/channel/all.json',
      method: 'get',
    }),

  getChannelsByID: async (id) =>
    API.doRequest({
      url: `/channel/${id}.json`,
      method: 'get',
    }),
}

export default ChannelService
