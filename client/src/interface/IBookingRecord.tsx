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

export const initBookingRecord:IBookingRecord = {
    id: "123132",
    customer: {
        name: "",
        phone_number: "",
        email: "",
    },
    host: {
        bride: {
            name: "",
            born_year: ""
        },
        groom: {
            name: "",
            born_year: ""
        }
    },
    lounge: "",
    wed_date: "",
    guest_amount: ""
}