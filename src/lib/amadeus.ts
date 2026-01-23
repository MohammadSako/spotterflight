let accessToken: string | null = null;
let expiresAt = 0;

export async function getAmadeusAccessToken() {
  if (accessToken && Date.now() < expiresAt) {
    return accessToken;
  }

  const response = await fetch(
    `${process.env.AMADEUS_BASE_URL}/v1/security/oauth2/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: process.env.AMADEUS_API_KEY!,
        client_secret: process.env.AMADEUS_API_SECRET!,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get Amadeus access token");
  }

  const data = await response.json();

  accessToken = data.access_token;
  expiresAt = Date.now() + data.expires_in * 1000;

  return accessToken;
}
