import { CategoryGame } from './categoryGame';
import { DataGame } from './dataGame';
import { Image } from './image';

/* eslint-disable @typescript-eslint/naming-convention */
export class Pictogram {
    'id': number;
    'name': string;
    'image_id'?: number;
    'child_id'?: number;
    'image': Image;
    'category_pictogram_id': number;
}
