import API from '../helpers/axios'

const ChannelService = {
  getChannels: async () =>
    API.doRequest({
      url: '/channel/all.json',
      method: 'get',
    }),

  getChannelByID: async (id) =>
    API.doRequest({
      url: `/channel/${id}.json`,
      method: 'get',
    }),
}

export default ChannelService
