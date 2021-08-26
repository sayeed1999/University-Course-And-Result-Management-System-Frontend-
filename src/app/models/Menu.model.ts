export class Menu {
    constructor(
        public id: number,
        public name: string,
        public url: string,
        public statusId: number, //active=0, inactive=1
        public parentId?: number, //null for the root, 1,2,3... for a child
    ) {}
}