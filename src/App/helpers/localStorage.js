const LocalStorageHelper = (function () {
  var _data
  function _getData() {
    if (!_data) {
      _data = this
      return _data
    }
    return _data
  }

  function _setToken(token) {
    localStorage.setItem('token', JSON.stringify(token))
  }

  function _getToken() {
    return localStorage.getItem('token')
  }

  function _clearToken() {
    localStorage.removeItem('token')
  }

  function _setFavoriteChannels(channels) {
    localStorage.setItem('favoriteChannels', JSON.stringify(channels))
  }

  function _getFavoriteChannels() {
    return localStorage.getItem('favoriteChannels')
  }

  function _clearFavoriteChannels() {
    localStorage.removeItem('favoriteChannels')
  }

  function _clearData() {
    _clearToken()
    _clearFavoriteChannels()
  }

  return {
    getData: _getData,
    setToken: _setToken,
    getToken: _getToken,
    clearToken: _clearToken,
    setFavoriteChannels: _setFavoriteChannels,
    getFavoriteChannels: _getFavoriteChannels,
    clearFavoriteChannels: _clearFavoriteChannels,
    clearData: _clearData,
  }
})()

export default LocalStorageHelper
