import { Character } from './character';

/* eslint-disable @typescript-eslint/naming-convention */
export class DataGame {
    'level': number;

    'order'?: string;
    'response'?: string;
    'words'?: string[];
    'images'?: string[];
    'image'?: string;

    'word'?: string;
    'missing_letter'?: string;
    'letters'?: string[];

    'keys'?: number[];
}
