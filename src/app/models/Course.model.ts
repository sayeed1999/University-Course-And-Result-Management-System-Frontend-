import { Department } from "./Department.model";
import { Semister } from "./Semister.model";

export class Course {
    constructor(
        public code: string,
        public name: string,
        public credit: number,
        public description: string,
        public departmentId: number,
        public semisterId: number,
        public department?: Department,
        public semister?: Semister
    ) {}
}