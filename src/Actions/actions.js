export const setStore = (data) => {
  return {
    type: 'CRYPTODATA',
    data
  }
}

export const getCryptoData = () => {
  return dispatch => {
    fetch('https://poloniex.com/public?command=returnTicker')
    .then( response => response.json())
    .then( data => dispatch(setStore(data)))
    .catch( error => console.log(error))
  }
}