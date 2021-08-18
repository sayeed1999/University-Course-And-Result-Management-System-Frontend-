export class EnrollStudentInCourse {
    constructor(
        public departmentId: number,
        public courseCode: string,
        public studentId: number,
        public date: Date
    ) {}
}