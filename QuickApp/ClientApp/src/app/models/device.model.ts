export class DeviceModel {
  id: number;
  cityAddress: string;
  ipAddress: string;
  isActive: boolean;
  isMonitor: boolean;
  isOnline: boolean;
  lastUpdate: string;
  movie: string;
  name: string;
  screenshot: string;
  temperature: number;
  volume: number;

  constructor(id?: number,
              cityAddress?: string,
              ipAddress?: string,
              isActive?: boolean,
              isMonitor?: boolean,
              isOnline?: boolean,
              lastUpdate?: string,
              movie?: string,
              name?: string,
              screenshot?: string,
              temperature?: number,
              volume?: number) {
    this.id = id;
    this.cityAddress = cityAddress;
    this.ipAddress = ipAddress;
    this.isActive = isActive;
    this.isMonitor = isMonitor;
    this.isOnline = isOnline;
    this.lastUpdate = lastUpdate;
    this.movie = movie;
    this.name = name;
    this.screenshot = screenshot;
    this.temperature = temperature;
    this.volume = volume;
  }

}
