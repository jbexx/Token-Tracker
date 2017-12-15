export const setStore = data => {
  return {
    type: 'CRYPTODATA',
    data
  }
}

export const updateStore = data => {
  return {
    type: 'UPDATEDCRYPTO',
    data
  }
}

export const getCryptoData = () => {
  return async dispatch => {
    try {
      const response = await fetch('https://api.coinmarketcap.com/v1/ticker/')
      const data = await response.json()
      dispatch(setStore(data))
    } catch (error) { 
      console.log({ error })
    }
  }
}