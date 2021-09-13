import { Grade } from "./Grade.model";

export class StudentEnrollOrPublishResultInCourse {
    constructor(
        public id: number,
        public departmentId: number,
        public courseId: number,
        public studentId: number,
        public date: Date,
        public gradeId: number,
        public grade?: Grade
    ) {}
}