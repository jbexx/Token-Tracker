const filteredTokens = (state = [], action) => {
  switch (action.type) {
    case 'UPDATEDCRYPTO':
      return action.data

    default:
      return state
  }
  return state;
}

export default filteredTokens