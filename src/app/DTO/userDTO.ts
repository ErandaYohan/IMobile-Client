import { AddressDTO } from "./AddressDTO";
import { ProductList } from "./ProductDTO";

export class UserDto {
    id!:string;
    fname!:string;
    lname!:string;
    mobile!:string;
    mobile2!:string;
    address!:AddressDTO;
    productionLiat!:Array<ProductList>;
    email!:string;
    userName!:string;
}