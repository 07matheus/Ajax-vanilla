// CLASS AJAX
class Ajax {
  /**
   * Objeto do XMLHttpRequest
   * @type XMLHttpRequest
   */
  _xhr        = null;
  _method     = null;
  _async      = null;
  _url        = null;
  _data       = null;
  _success    = null;
  _error      = null;

  init(data, async = true) {
    this._xhr   = new XMLHttpRequest();
    this._async = async;

    // SET REQUEST METHOD
    this._setMethod(data.method);

    // SET CALLBACK FUNCTIONS
    this._setCallBacks(data);

    // SET REQUEST URL
    this._setUrl(data.url, data.data);

    // SET BODY REQUEST
    this._setData(data.data);

    // SEND REQUEST
    this._send();
  }

  _setCallBacks(functions) {
    // SUCCESS
    this._success = (data) => {return data};
    if(functions.success !== undefined) this._success = functions.success;

    // ERROR
    this._error = (error) => {return error};
    if(functions.error !== undefined) this._error = functions.error;
  }

  _setMethod(method) {
    this._method = method.toUpperCase();
  }

  _getData(data) {
    let text    = '';
    let length  = Object.keys(data).length;

    for (let index in data) {
      text   += (length == 1) ? index + '=' + data[index] : index + '=' + data[index] + '&';
      length--;
    }

    return text;
  }

  _setUrl(url, data) {
    this._url = (this._method === 'GET') ? url + '?' + this._getData(data) : url;
  }

  _setData(data) {
    if(this._method === "GET") return;

    let text = this._getData(data);

    this._data = text;
  }

  _getResponse(type) {
    let data = type ? this._xhr.response : this._xhr.statusText;
    return type ? this._success(data) : this._error(data);
  }

  _fAsync(type) {
    this._xhr.onreadystatechange = () =>  {
      if(this._xhr.readyState === XMLHttpRequest.DONE) {
        let data = this._xhr.response;
        return this._getResponse(type);
      }
    }
  }

  _fSync(type) {
    return this._getResponse(type);
  }

  _send() {
    this._xhr.open(this._method, this._url, this._async);

    this._xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    this._xhr.send(this._data);

    let type = this._xhr.status < 400;

    return this._async ? this._fAsync(type) : this._fSync(type);
  }
}

// INSTANCE OF AJAX
var ajax = new Ajax();
