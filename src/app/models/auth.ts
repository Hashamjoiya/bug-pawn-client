import { HttpHeaders } from "@angular/common/http";

export interface LoginFormData {
    email: string,
    password: string,
}

export const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/json' })

export interface AuthenticatedUserData {
    uid: string | null,
    accessToken: string | null,
    client: string | null,
}

export class AuthenticatedUser {
    public static parseHeaders(requestHeaders: HttpHeaders): AuthenticatedUserData {
        return {
            uid: requestHeaders.get('uid'),
            accessToken: requestHeaders.get('access-token'),
            client: requestHeaders.get('client')
        }
    }
}
