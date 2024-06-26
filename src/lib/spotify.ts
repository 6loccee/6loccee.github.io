import type { PlaybackState, AccessToken } from '@spotify/web-api-ts-sdk'
import { SpotifyApi } from '@spotify/web-api-ts-sdk'

async function getAccessToken(
  clientID: string,
  clientSecret: string,
  refreshToken: string,
): Promise<AccessToken> {
  const basic = Buffer.from(`${clientID}:${clientSecret}`).toString('base64')
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  })

  return await response.json()
}

export async function getCurrentlyPlayed(
  clientID: string,
  clientSecret: string,
  refreshToken: string,
): Promise<string | null> {
  const accessToken = await getAccessToken(clientID, clientSecret, refreshToken)

  const sdk = SpotifyApi.withAccessToken(clientID, {
    ...accessToken,
    refresh_token: refreshToken,
  })

  const playbackState =
    (await sdk.player.getCurrentlyPlayingTrack()) as PlaybackState

  if (!playbackState || !playbackState.item || !playbackState.is_playing) {
    return null
  }

  const { name, artists } = playbackState.item as Track

  const artistNames = artists.map(artist => artist.name).join(', ')
  return `${name} - ${artistNames}`
}
