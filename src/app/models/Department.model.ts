import { Course } from "./Course.model";
import { Teacher } from "./Teacher.model";

export class Department {
    constructor(
        public id: number,
        public code: string,
        public name: string,
        public courses?: Course[],
        public teachers?: Teacher[],
    ) {}
}