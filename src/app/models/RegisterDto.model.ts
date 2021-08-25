export class RegisterDto {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public roles: string //string[]
    ) {}
}