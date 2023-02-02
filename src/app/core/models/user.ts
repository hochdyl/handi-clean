import { Role } from './role';

/* eslint-disable @typescript-eslint/naming-convention */
export class User {
    'id': number;
    'firstname': string;
    'lastname': string;
    'email': string;
    'phone': number;
    'address': string;
    'postal_code': number;
    'city': string;
    'country': string;
    'role_id': number;
    'role'?: Role;
}
