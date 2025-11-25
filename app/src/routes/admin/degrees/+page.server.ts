export const load = async ({ fetch }) => {
    const response = await fetch('/api/v1/degrees');
    const degrees = await response.json();
    return {
        degrees
    };
};