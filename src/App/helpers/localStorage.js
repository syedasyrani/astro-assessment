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
    localStorage.setItem("token", JSON.stringify(token))
  }

  function _getToken() {
    return localStorage.getItem("token")
  }

  function _clearToken() {
    localStorage.removeItem("token")
  }

  function _clearData() {
    _clearToken()
  }

  return {
    getData: _getData,
    setToken: _setToken,
    getToken: _getToken,
    clearToken: _clearToken,
    clearData: _clearData,
  }
})()

export default LocalStorageHelper
