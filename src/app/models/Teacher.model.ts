import { Department } from "./Department.model";
import { Designation } from "./Designation.model";

export class Teacher {
    constructor(
        public id: number,
        public name: string,
        public address: string,
        public email: string,
        public contact: number,
        public designationId: number,
        public departmentId: number,
        public creditToBeTaken: number,
        public remainingCredit?: number,
        public department?: Department,
        public designation?: Designation
    ) {}
}