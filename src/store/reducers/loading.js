const initialData = false

const loading = (state = initialData, action) => {
  switch (action.type) {
    case "LOADING":
      return action.payload.loading
    default:
      return state;
  }
};

export default loading;