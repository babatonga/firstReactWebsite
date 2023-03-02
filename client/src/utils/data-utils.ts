export const getData = async <T>(
    url: string,
    mail: string,
    password: string
)
    : Promise<T> => {
    const res = await fetch(url, {
        method: 'Post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ mail, password })
    });

    return await res.json();
}