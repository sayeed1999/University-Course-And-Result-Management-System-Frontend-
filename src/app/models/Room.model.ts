import { AllocateClassroom } from "./AllocateClassroom.model";

export class Room {
    constructor(
        public id : number,
        public name: string,
        public allocateClassrooms?: AllocateClassroom[]
    ) {}
}