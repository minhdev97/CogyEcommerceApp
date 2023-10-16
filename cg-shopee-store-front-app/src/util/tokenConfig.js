export const configToken = (token) => ({
    "headers": {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Cache-Control': 'no-cache'
    }
});