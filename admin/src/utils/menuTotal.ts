export default function(props:any) {
    const {soup, main, salad, dessert, other} = props;
    return soup.reduce((sum: any, item: any) => sum + item?.price, 0) + salad.reduce((sum: any, item: any) => sum + item?.price, 0) + main.reduce((sum: any, item: any) => sum + item?.price, 0) + other.reduce((sum: any, item: any) => sum + item?.price, 0) + dessert.reduce((sum: any, item: any) => sum + item?.price, 0);
}