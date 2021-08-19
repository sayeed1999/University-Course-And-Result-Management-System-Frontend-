import { Course } from "./Course.model";
import { GradeLetter } from "./GradeLetter.model";

export class StudentsCourses {
    constructor(
        public studentId: number,
        public departmentId: number, // these two combinely form the
        public courseCode: string, // CK of the Course table in SQL db.
        public date: Date,
        public grade?: string,
        public course?: Course 
    ) {}
}