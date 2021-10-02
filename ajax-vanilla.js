// CLASS AJAX
class Ajax {
  /**
   * @param XMLHttpRequest Objeto do XMLHttpRequest
   */
  _xhr        = null;

  /**
   * @param String Tipo da requisição (GET, POST)
   */
  _method     = null;

  /**
   * @param String Tipo da requisição (GET, POST)
   */
  _async      = null;

  /**
   * @param String Tipo da requisição (GET, POST)
   */
  _url        = null;

  /**
   * @param String Dados que serão enviados
   */
  _data       = null;
  
  /**
   * @param Function Função de callback quando a requisição for bem sucedida
   */
  _success    = null;
  
  /**
   * @param Function Função de callback quando a requisição não for bem sucedida
   */
  _error      = null;

  /**
   * @method  init()            Método responsável por inicar o ajax
   * @param   Object    data    Dados de configuração
   * @param   Boolean   async   Configura se a requisição será assíncrona ou não
   * @return  Void
   */
  init(data, async = true) {
    this._xhr   = new XMLHttpRequest();
    this._async = async;

    // CONFIGURA O MÉTODO DA REQUISIÇÃO
    this._setMethod(data.method);

    // CONFIGURA AS FUNÇÕES DE CALLBACK
    this._setCallBacks(data);

    // CONFIGURA A URL DA REQUISIÇÃO
    this._setUrl(data.url, data.data);

    // CONFIGURA O CORPO DA REQUISIÇÃO
    this._setData(data.data);

    // ENVIA A REQUISIÇÃO
    this._send();
  }

  /**
   * @method _setCallBacks()              Método responsável por setar as funções de callback
   * @param  Object           functions   Objetos com as funções de callback
   * @return Void
   */
  _setCallBacks(functions) {
    // SUCCESS
    this._success = (data) => {return data};
    if(functions.success !== undefined) this._success = functions.success;

    // ERROR
    this._error = (error) => {return error};
    if(functions.error !== undefined) this._error = functions.error;
  }

  /**
   * @method _setMethod()               Método responsável por setar o tipo de método da requisição
   * @param  String         method      Método da requisição (GET, POST)
   * @return Void
   */
  _setMethod(method) {
    this._method = method.toUpperCase();
  }

  /**
   * @method _getData()             Método responsável por formatar os dados que serão enviados
   * @param  Object       data      Dados que serão enviados
   * @return String
   */
  _getData(data) {
    let text    = '';
    let length  = Object.keys(data).length;

    for (let index in data) {
      text   += (length == 1) ? index + '=' + data[index] : index + '=' + data[index] + '&';
      length--;
    }

    return text;
  }

  /**
   * @method _setUrl()          Método responsável por setar a url da request
   * @param  String     url     Url base
   * @param  Object     data    Parâmetros da url
   * @return Void
   */
  _setUrl(url, data) {
    this._url = (this._method === 'GET') ? url + '?' + this._getData(data) : url;
  }

  /**
   * @method _setData()           Método responsável por formatar os dados do corpo da requisição
   * @param  Object       data    Objeto com os dados da requisição
   * @returns Void
   */
  _setData(data) {
    if(this._method === "GET") return;

    let text = this._getData(data);

    this._data = text;
  }

  /**
   * @method _getResponse()           Método responsável por formatar o retorno da requisição
   * @param  Boolean          type    Verifica se a requisição foi bem sucedida
   * @return Function
   */
  _getResponse(type) {
    let data = type ? this._xhr.response : this._xhr.statusText;
    return type ? this._success(data) : this._error(data);
  }

  /**
   * @method _fAsync()          Método responsável por verificar uma requisição assíncrona
   * @param  Boolean    type    Verifica se a requisição foi bem sucedida
   * @return Function
   */
  _fAsync(type) {
    this._xhr.onreadystatechange = () =>  {
      if(this._xhr.readyState === XMLHttpRequest.DONE) {
        return this._getResponse(type);
      }
    }
  }

  /**
   * @method _fSync()          Método responsável por verificar uma requisição síncrona
   * @param  Boolean    type   Verifica se a requisição foi bem sucedida
   * @return Function
   */
  _fSync(type) {
    return this._getResponse(type);
  }

  /**
   * @method _send()    Método responsável por enviar a requisição
   * @return Function 
   */
  _send() {
    this._xhr.open(this._method, this._url, this._async);

    this._xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    this._xhr.send(this._data);

    let type = this._xhr.status < 400;

    return this._async ? this._fAsync(type) : this._fSync(type);
  }
}

// INSTANCIA A CLASSE DO AJAX
const ajax = new Ajax();
