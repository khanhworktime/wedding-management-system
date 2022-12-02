interface IDish{
    id:string;
    description:string;
    state: "available" | "unavailable";
    name: string;
}

export const fakeDishes:Array<IDish> = [{
    id: "D01",
    description: "ABX",
    state: "available",
    name: "Mon D01"
},{
    id: "D02",
    description: "ABX",
    state: "available",
    name: "Mon D02"
},{
    id: "D03",
    description: "ABX",
    state: "available",
    name: "Mon 03"
},{
    id: "D04",
    description: "ABX",
    state: "available",
    name: "Mon 04"
},{
    id: "D05",
    description: "ABX",
    state: "available",
    name: "Mon 05"
}
]

export default  IDish;