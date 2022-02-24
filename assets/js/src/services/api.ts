export async function createShortUrl(longUrl: string) {
  const response = await fetch('/api/links', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      link: {
        url: longUrl,
      },
    }),
  });

  return response.json();
}
