import { Department } from "./Department.model";

export class StudentRegistration {
    constructor (
        public name: string,
        public email: string,
        public contact: number,
        public date: Date,
        public address: string,
        public departmentId: number,
        public department?: Department
    ) {}
}