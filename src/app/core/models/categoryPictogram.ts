import { CategoryGame } from './categoryGame';
import { DataGame } from './dataGame';
import { Image } from './image';
import { Pictogram } from './pictogram';

/* eslint-disable @typescript-eslint/naming-convention */
export class CategoryPictogram {
    'id'?: number;
    'name': string;
    'image_id'?: number;
    'child_id'?: number;
    'image'?: Image;
    'pictograms'?: Pictogram[];
    'image_path'?: any;
}
