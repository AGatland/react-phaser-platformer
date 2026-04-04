export interface MutationData {
    id: number;
    title: string;
    desc: string;
    frame: number;
    color: number;
}

export const MUTATIONS: MutationData[] = [
    {
        id: 0,
        title: 'Vitality',
        desc: '+20 Max HP',
        frame: 104,
        color: 0xff4444,
    },
    {
        id: 1,
        title: 'Sharp Edge',
        desc: 'Chop deals +10 dmg',
        frame: 107,
        color: 0x44ffff,
    },
    {
        id: 2,
        title: 'Impact Roll',
        desc: 'Roll deals 20 dmg',
        frame: 110,
        color: 0xffaa00,
    },
];
