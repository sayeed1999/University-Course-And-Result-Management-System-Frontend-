export class StudentEnrollOrPublishResultInCourse {
    constructor(
        public departmentId: number,
        public courseCode: string,
        public studentId: number,
        public date: Date,
        public grade?: string
    ) {}
}