const crypto = (state = [], action) => {
  console.log('in crypto reducer, showing action type', action.type);
  
  switch (action.type) {
    case 'CRYPTODATA':
      return action.data
    default:
      return state
  }
  return state;
}

export default crypto