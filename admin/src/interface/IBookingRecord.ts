
export default interface IBookingRecord {
    _id?: string;
    customerId: string,
    host: {
        bride: {
            name: string,
            birthday: string
        },
        groom: {
            name: string,
            birthday: string
        }
    },
    services?: [
        string
    ],
    loungeId: string,
    wed_date: string,
    guest_amount?: string,
    shift: string,
    create_at?: string,
    menuId?: string,
    state: 'init' | 'confirmed' | 'contract confirmed' | 'deposited' | 'paid' | 'processing' | 'finished' | 'cancel',
    contractId?: string,
    depositeId?: string
}

export const initRecord:IBookingRecord = {
    customerId: '',
    host: {
        bride: {
            name: '',
            birthday: ''
        },
        groom: {
            name: '',
            birthday: ''
        }
    },
    loungeId: '',
    wed_date: '',
    shift: 'Sáng',
    state: 'init'
}