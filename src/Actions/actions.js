export const setStore = (data) => {
  return {
    type: 'CRYPTODATA',
    data
  }
}

export const getCryptoData = () => {
  return dispatch => {
    fetch('https://api.coinmarketcap.com/v1/ticker/')
    .then( response => response.json())
    .then( data => this.setStore(data))
    .catch( error => console.log(error))
  }
}