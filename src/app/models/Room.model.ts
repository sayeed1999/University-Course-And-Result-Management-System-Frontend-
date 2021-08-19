import { AllocateClassroom } from "./AllocateClassroom.model";

export class Room {
    constructor(
        public id : string,
        public allocateClassrooms?: AllocateClassroom[]
    ) {}
}