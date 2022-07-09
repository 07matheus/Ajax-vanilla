const Ajax = (function(obData, async = true) {
  var ajax = Ajax.prototype;  

  // DEFINE PROPERTIES
  ajax.async = async;
  ajax.method;
  ajax.url;
  ajax.type;
  ajax.data;
  ajax.success = data => {return data};
  ajax.error   = error => {console.error(error)};

  ajax.init = (ob) => {
    let method  = ob.method !== undefined || ob.method !== null ? ob.method.toUpperCase(): 'GET';
    ajax.method = ['GET', 'POST'].includes(method) ? method: 'GET';

    ajax.url = ob.url !== undefined ? ob.url   : null;
    
    ajax.data = ob.data === undefined ? {}: ob.data;

    ajax.setType(ob);

    ajax.setFunctions(ob);

    ajax.send();
  }

  ajax.setFunctions = (ob) => {
    if(ob.success !== undefined) ajax.success = ob.success;
    if(ob.error !== undefined) ajax.error = ob.error;
  }

  ajax.send = () => {
    const xhr = new XMLHttpRequest();

    xhr.open(ajax.method, ajax.url, ajax.async);

    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.send(ajax.data);

    let status = xhr.status < 400;

    return ajax.async ? ajax.fAsync(status, xhr): ajax.fSync(status, xhr);
  }

  ajax.getResponse = (type, xhr) => {
    let data = type ? xhr.response: xhr.statusText;

    data = ajax.decode(data);
    
    return type ? ajax.success(data) : ajax.error(data);
  }

  ajax.fAsync = (status, xhr) => {
    xhr.onreadystatechange = () =>  {
      if(xhr.readyState === XMLHttpRequest.DONE) {
        return ajax.getResponse(status, xhr);
      }
    }
  }

  ajax.fSync = (status, xhr) => {
    return ajax.getResponse(status, xhr);
  }

  ajax.LogError = message => {
    console.error("Ajax: "+message);
  }

  ajax.setType = ob => {
    let type = "default";

    if(ob.type !== undefined) {
      ["application/json", "application/stringfy", "default"].forEach(arrayType => {
        if(arrayType == ob.type) type = arrayType;
      });
    }

    ajax.type = type;
  }

  ajax.decode = (object) => {
    let data = null;

    switch(ajax.type) {
      case "application/json":
        data = JSON.parse(object);
      break;

      case "application/stringfy":
        data = JSON.stringify(object);
      break;

      default:
        data = object;
      break;
    }

    return data;
  }

  if(obData === undefined || obData === null) {
    return ajax.LogError("Ajax: Object data, not found.");
  }

  return ajax.init(obData);
});