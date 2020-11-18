export class TimeIntervalModel {
  id: number;
  interval: number;
  overTime: number;
  constructor(id?: number, interval?: number, overTime?: number) {
    this.id = id;
    this.interval = interval;
    this.overTime = overTime;
  }
}
