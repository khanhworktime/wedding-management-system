export default interface ICustomer {
    name: string;
    identify_number: string;
    birthday: string;
    email?: string;
    address?: string;
    gender: string;
}

export const initCustomer: ICustomer = {
    name: '',
    identify_number: '',
    birthday: '',
    gender: 'Nam',
}