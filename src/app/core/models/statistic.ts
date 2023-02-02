import { Game } from './game';

/* eslint-disable @typescript-eslint/naming-convention */
export class Statistic {
    'id'?: number;
    'child_id'?: number;
    'game_id'?: number;
    'level': number;
    'nb_errors': number;
    'time': number;
    'created_at'?: string;
    'game'?: Game;
}
