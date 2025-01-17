import MockDate from 'mockdate';

const setupTimeTravelForRNAnimated = () => {
  const frameTime = 10;
  global.withAnimatedTimeTravelEnabled = (func) => {
    MockDate.set(0);
    jest.useFakeTimers();
    func();
    MockDate.reset();
    jest.useRealTimers();
  };
  global.requestAnimationFrame = (callback) => {
    setTimeout(callback, frameTime);
  };
  global.timeTravel = (time = frameTime) => {
    const tickTravel = () => {
      const now = Date.now();
      MockDate.set(new Date(now + frameTime));
      jest.advanceTimersByTime(frameTime);
    };
    const frames = time / frameTime;
    for (let i = 0; i < frames; i++) {
      tickTravel();
    }
  };
};
setupTimeTravelForRNAnimated();
