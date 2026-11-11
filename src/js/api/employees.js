const API_URL = 'https://jsonplaceholder.typicode.com/users';

export async function loadEmployees(limit = 3, { signal } = {}) 
{
    const url = `${API_URL}?_limit=${limit}`;

    const res = await fetch(url, { signal });

    if (!res.ok)
        throw new Error(`Failed to load employees: ${res.status}`);

    const users = await res.json();

    return users.map(user => ({
        id: user.id,
        name: user.name,
        role: user.company?.title ?? 'Employee',
        photo: `https://picsum.photos/seed/${user.id}/400/300`,
        profile: `https://${user.website}`
    }));
}