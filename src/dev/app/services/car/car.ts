import { HttpInterface } from '../http/http.interface';

export interface Car {
    carInfo: CarInfo,
    id: string,
    mot: Mot[],
    tax: Tax
}

export interface CarInfo extends HttpInterface {
    cO2Emission: string,
    car: CarDetails,
    colour: string,
    cylinderCapacity: string,
    firstRegistrationDate: string,
    fuelType: string,
    registrationNumber: string,
    sixMonthsTaxRate: string,
    transmission: string,
    twelveMonthTaxRate: string,
    vehicalIdentificationNumber: string,
    weight: string
    wheelPlan: string
}

export interface Mot extends HttpInterface {
    advisoryItems: any[],
    carInfoId: string,
    failedItems: any[],
    odoMeterReading: string,
    testDate: string
    testNumber: string
}

export interface Tax extends HttpInterface {
    carInfoId: string,
    expiryDate: string,
    taxStatus: string
    taxed: boolean
}

export interface CarDetails extends HttpInterface {
    make: string,
    model: string,
    yearOfManufacture: string
}
