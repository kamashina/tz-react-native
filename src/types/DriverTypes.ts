export interface IAllDrivers {
  givenName: string;
  familyName: string;
  driverId: string;
}
export interface IOneDriver {
  givenName: string;
  familyName: string;
  driverId: string;
  url: string;
  nationality: string;
  dateOfBirth: string;
}
export interface IArrAllDrivers {
  item: IAllDrivers;
}

export interface IArrDriverRaces {
  item: IDriverRaces;
}
export interface IDriverResponse {
  MRData: IDriverTable;
}
export interface IDriverTable {
  DriverTable: IDrivers;
}
export interface IDrivers {
  Drivers: IOneDriver[];
}

//RACES//

export interface IDriverRaces {
  season: string;
  date: string;
  raceName: string;
}
