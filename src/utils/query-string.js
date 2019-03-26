// return object key/values as an encoded query string
// e.g. {foo: 'bar', fizz: 'buzz'} becomes 'foo=bar&fizz=buzz'
export default function buildQuery(params) {

  return Object.keys(params).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key])
  }).join('&');
  
}
