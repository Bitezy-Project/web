import { API_BASE_URL } from "@/constants/config";

type HTTP_VERBS = "POST" | "GET" | "DELETE" | "PUT";

interface ConsumeServerProps {
    path: string
    method: HTTP_VERBS
    headers?:  {[key: string]: string}
    body?: {[key: string]: any}
    bodyFormat?: "form-data" | "json"
}

export async function consumeServer({ path, method, headers, body, bodyFormat = "json" }: ConsumeServerProps): Promise<{data: any | undefined, response: Response | undefined}> {
    if (path[0] != "/") {
        throw new Error("Invalid path! [useServer]")
    }

    let formatedBody;

    if (bodyFormat == "json") {
        formatedBody = JSON.stringify(body)
    } else if (bodyFormat == "form-data") {
        formatedBody = new FormData()

        for (let k in body) {
            formatedBody.set(k, body[k])
        }
    }

    let options = {
        method,
        headers: { "Content-Type": bodyFormat == "form-data" ? "multipart/form-data" : "application/json", ...headers },
        body: formatedBody,
        credentials: "include"
    } as RequestInit

    let response;
    let data;

    try {
        response = await fetch(API_BASE_URL + path, options)
        data = await response.json()
    } catch {
        return { response, data }
    }

    return { response, data }
}