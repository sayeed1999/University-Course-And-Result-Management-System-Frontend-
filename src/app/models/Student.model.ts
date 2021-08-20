import { Course } from "./Course.model";
import { Department } from "./Department.model";
import { StudentsCourses } from "./StudentsCourses.model";

export class Student {
    constructor (
        public id: number,
        public name: string,
        public email: string,
        public contact: number,
        public date: Date,
        public address: string,
        public departmentId: number,
        public registrationNumber: string,
        public department?: Department,
        public courses?: Course[],
        public studentsCourses?: StudentsCourses[]
    ) {}
}