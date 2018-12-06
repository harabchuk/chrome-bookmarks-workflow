function returnDataTemplate () {
  return {
    name: '',
    price: '',
    currency: ''
  }
}

function getItemPropValue(node) {
  var innerText = node.innerText;
  if (innerText) {
    return innerText.trim();
  }
  var attrContent = node.getAttribute('content');
  if (attrContent) {
    return attrContent.trim();
  }
  return '';
}

function microformat() {
  var returnData = returnDataTemplate();

  var product = document.querySelector('[itemtype*="//schema.org/Product"]')
  if (!product) {
    return returnData;
  }

  var productNameNode = product.querySelector('[itemprop="name"]')
  if (productNameNode) {
    returnData.name = getItemPropValue(productNameNode);
  }

  var priceNode = product.querySelector('[itemtype*="//schema.org/Offer"] [itemprop="price"]')
  returnData.price = getItemPropValue(priceNode)

  var currencyNode = product.querySelector('[itemtype*="//schema.org/Offer"] [itemprop="priceCurrency"]')
  returnData.currency = getItemPropValue(currencyNode)

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
  try {
    var data = microformat();
    if (data.name) {
      return data;
    }

    data = jsonld();
    if (data.name) {
      return data;
    }
  } catch (e) {
    console.log('default extractor error', e);
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