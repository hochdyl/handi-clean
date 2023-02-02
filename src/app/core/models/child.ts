import { Ability } from './ability';
import { Character } from './character';

/* eslint-disable @typescript-eslint/naming-convention */
export class Child {
    'id': number;
    'firstname': string;
    'lastname': string;
    'date_of_birth': string;
    'ability'?: Ability;
    'character_id': number;
    'character': Character;
}
