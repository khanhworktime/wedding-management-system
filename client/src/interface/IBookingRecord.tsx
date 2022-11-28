export default interface IBookingRecord {
    id: string;
    customer: {
        id?:string;
        name:string,
        phone_number: string,
        email:string
    },
    host: {
        bride: {
            name: string,
            born_date: string
        },
        groom: {
            name: string,
            born_date: string
        }
    }
}