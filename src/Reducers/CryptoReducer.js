const crypto = (state = [], action) => {
  switch (action.type) {
    case 'CRYPTODATA':
      return action.data

    case 'UPDATEDCRYPTO':
      return action.data

    default:
      return state
  }
  return state;
}

export default crypto