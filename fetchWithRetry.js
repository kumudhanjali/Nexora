export async function fetchWithRetry(
    url,
    options = {},
    retries = 3,
    delay = 800
) {
    let lastError;

    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(
                    `Request failed with status ${response.status}`
                );
            }

            return await response.json();

        } catch (error) {
            lastError = error;

            if (attempt < retries) {
                await new Promise(resolve =>
                    setTimeout(resolve, delay * (attempt + 1))
                );
            }
        }
    }

    throw lastError;
}