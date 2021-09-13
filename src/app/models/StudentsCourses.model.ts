import { Course } from "./Course.model";
import { Grade } from "./Grade.model";

export class StudentsCourses {
    constructor(
        public studentId: number,
        public departmentId: number, // these two combinely form the
        public courseId: number, // CK of the Course table in SQL db.
        public date: Date,
        public gradeId?: number,
        public course?: Course,
        public grade?: Grade 
    ) {}
}