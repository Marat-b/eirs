export class DeviceLPModel {
  id: number;
  cityAddress: string;
  name: string;

  constructor(id?: number, cityAddress?: string, name?: string) {
    this.id = id;
    this.cityAddress = cityAddress;
    this.name = name;
  }
}
