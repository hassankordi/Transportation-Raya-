export class driver {
  constructor(
    public id: number,
    public name: string,
    public status: number,
    public cardUniID: string
  ) {}
}

export class car {
  constructor(
    public id: number,
    public balletNumber: string,
    public terminalID: string,
    public status: number = 0,
    public routID: number,
  ) {}
}
export class route {
  constructor(
    public id: number,
    public name: string,
    public longitude: string,
    public latitude: string,
  ) {}
}