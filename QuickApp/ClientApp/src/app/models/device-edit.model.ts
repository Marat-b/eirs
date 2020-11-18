export class DeviceEditModel {
  id: number;
  cityAddress: string;
  ipAddress: string;
  isActive: boolean;
  name: string;

  constructor(id?: number,
              cityAddress?: string,
              ipAddress?: string,
              isActive?: boolean,
              name?: string
              ) {
    this.id = id;
    this.cityAddress = cityAddress;
    this.ipAddress = ipAddress;
    this.isActive = isActive;
    this.name = name;

  }
}
