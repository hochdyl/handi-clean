import { CategoryGame } from './categoryGame';
import { DataGame } from './dataGame';

/* eslint-disable @typescript-eslint/naming-convention */
export class Game {
    'id': number;
    'name': string;
    'data': DataGame[];
    'category_id': string;
    'category_game': CategoryGame;
    'url': string;
}
