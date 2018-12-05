console.log('default extractor');

function returnDataTemplate () {
  return {
    name: '',
    price: '',
    currency: ''
  }
}

function microformat() {
  var returnData = returnDataTemplate();
  return returnData;
}

function jsonld() {
  var returnData = returnDataTemplate();

  var script = document.querySelector('script[type="application/ld+json"]');
  if (!script) {
    return returnData;
  }

  try {
    var data = JSON.parse(script.innerText);
    if(!data || data['@type'] !== 'Product') {
      return returnData;
    }
    returnData.name = data.name;

    if (data.offers && data.offers.length) {
      var offer = data.offers[0];
      returnData.price = offer.price;
      returnData.currency = offer.priceCurrency;
    }
  } catch (e) {}

  return returnData;
}

function parse () {
  var data = microformat();
  if (data.name) {
    return data;
  }

  data = jsonld();
  if (data.name) {
    return data;
  }

  return returnDataTemplate()
}

function send (data) {
  chrome.runtime.sendMessage({
    type: 'content_init',
    price: data.price,
    currency: data.currency,
    name: data.name
  });
}

send( parse() );