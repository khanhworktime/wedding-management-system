export default interface IBookingRecord {
    id?: string;
    customer: {
        id?:string;
        name:string,
        phone_number: string,
        email:string
    },
    host: {
        bride: {
            name: string,
            born_year: string
        },
        groom: {
            name: string,
            born_year: string
        }
    },
    lounge: string,
    wed_date: string,
    guest_amount?: string
}