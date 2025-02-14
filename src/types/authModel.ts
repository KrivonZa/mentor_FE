export interface LoginRequest {
    email: string,
    password: string
}

export interface RegisterRequest1 {
    user: {
        fullname: "string",
        email: "string",
        password: "string",
        role: "STAFF",
        phoneNumber: "string",
        status: true,
        balance: 0
    },
    level: "string",
    bio: "string",
    cv: "string",
    introductionVideo: "string",
    mentorStatus: "PENDING"
}


export interface RegisterRequest {
    fullname: string,
    email: string,
    password: string,
    phoneNumber: string,
    status: boolean,
    balance: number,
    // level: string,
    bio: string,
    cv: string,
    introductionVideo: string
}