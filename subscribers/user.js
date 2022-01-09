const UserHandlers = {
  alpha: (event) => {
    console.log('event is being called with alpha', JSON.stringify(event));
  },
  beta: (event) => {
    console.log('event is being called with beta', JSON.stringify(event));
  }
};

export default UserHandlers;
