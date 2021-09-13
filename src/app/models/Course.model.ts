import { AllocateClassroom } from "./AllocateClassroom.model";
import { Department } from "./Department.model";
import { Semister } from "./Semister.model";
import { Teacher } from "./Teacher.model";

export class Course {
    constructor(
        public id: number,
        public code: string,
        public name: string,
        public credit: number,
        public description: string,
        public departmentId: number,
        public semisterId: number,
        public teacherId?: number,
        public department?: Department,
        public semister?: Semister,
        public teacher?: Teacher,
        public allocateClassrooms?: AllocateClassroom[],
    ) {}
}