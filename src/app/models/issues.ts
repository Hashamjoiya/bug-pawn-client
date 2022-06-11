export interface Issue {
    id: number,
    assignee_id: number | null,
    author_id: number | null,
    content: string,
    status: string,
    tags: string[],
    thumbs_up: number,
    title: string,
    url: string,
}

export interface GetIssuesResponse {
    currentPage: number,
    pageItems: number,
    totalCount: number,
    totalPages: number,
    data: Issue[]
}

export interface InfoResponse {
    opened: number,
    closed: number,
    total: number
}