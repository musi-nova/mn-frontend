export interface RegisterPostData {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface User extends RegisterPostData {
    id: string;
}

export interface LoginPostData {
    username: string;
    password: string;
}