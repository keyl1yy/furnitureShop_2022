class Timer{
    constructor() {
      this.timer = undefined;
    }
  
    debounce(func, ms) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
  
      this.timer = setTimeout(() => {
        func && func();
      }, ms);
    }
}

export default Timer;