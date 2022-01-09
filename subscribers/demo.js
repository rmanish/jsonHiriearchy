const demoHandlers = {
  gama: (event) => {
    console.log('event is being called with gama', JSON.stringify(event));
  },
  rays: (event) => {
    console.log('event is being called with rays', JSON.stringify(event));
  }
};

export default demoHandlers;
