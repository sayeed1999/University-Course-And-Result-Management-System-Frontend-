import { AllocateClassroom } from "./AllocateClassroom.model";

export class Day {
    constructor(
        public name: string,
        public allocateClassrooms?: AllocateClassroom[]
    ) {}
}