const baseURL='http://localhost:3001/api/'
export const apiRequest = async (url, options = {})=>
    {
        const { method = 'GET', body, headers } = options;
        const fetchOptions = {
            method,
            headers: {
              'Content-Type': 'application/json',
              ...headers,
            },
            body: body ? JSON.stringify(body) : undefined,
          };
        const response = await fetch(baseURL+url,fetchOptions)
        if(!response.ok)
            throw new Error('http response was not ok')
        return response.json();
    };