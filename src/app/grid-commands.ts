export class command {
    constructor(
        public buttonOption: object,
        public type: string,
        public uid: string
    ) { }
}

export class rowEdit {
    constructor(
        public ID: string,
        public id: string,
        public name: string,
        public Name: string,
        public longitude: string,
        public latitude: string,
        public speed: string,
        public Speed: string,
        public cardUniID: string,

        public chassisNumber: string,
        public status: string,
        public palletNumber: string,
        public terminalID: string,
        public bassVendor: string,
      
        // public latitude: string,
        // public latitude: string,
        // public factory: string,
        // public line: string,
        // public machineFunctionality: string,
        // public machineID: string,
        // public productName: string,
        // public machineType: string,
        // public ratedSpeed: number,
        // public id: number,
        // public size: number,
        // public packSize: number,
        // public palteSize: number,
        // public technicalSKU: number,
        // public useInCalculation: boolean
    ) { }
}

