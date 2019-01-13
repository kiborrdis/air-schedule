const COUNT = 'COUNT';

export function count() {
  return {
    type: COUNT,
  };
}

const countReducer = (state = 0, { type }) => {
  if (type === COUNT) {
    return state + 1;
  }

  return state;
};

export default countReducer;
