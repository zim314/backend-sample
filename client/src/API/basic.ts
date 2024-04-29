interface Params {
    method?: string;
    headers?: HeadersInit;
    body?: any;
    token?: string;
}

const basicFatch = async (url: string, params?: Params) => {
    try {
        const res = await fetch(url, {
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            method: 'GET',
            ...params,
        });
        return res;
    } catch (error) {
        console.log('API ERROR', error);
    }
};

export default basicFatch;
