import { SpotifyApi, type PlaybackState } from '@spotify/web-api-ts-sdk'

interface Track {
  name: string
  artists: { name: string }[]
}

export function calculateAge(dateOfBirthStr: string): number {
  const dateParts = dateOfBirthStr.split('/')
  const birthDay = Number.parseInt(dateParts[0], 10)
  const birthMonth = Number.parseInt(dateParts[1], 10)
  const birthYear = Number.parseInt(dateParts[2], 10)

  const currentDate: Date = new Date()
  const birthDate: Date = new Date(birthYear, birthMonth - 1, birthDay)

  let age: number = currentDate.getFullYear() - birthDate.getFullYear()

  const hasBirthdayPassed =
    birthDate.getMonth() < currentDate.getMonth() ||
    (birthDate.getMonth() === currentDate.getMonth() &&
      birthDate.getDate() <= currentDate.getDate())

  age = hasBirthdayPassed ? age : age - 1

  return age
}

async function getAccessToken(
  clientID: string,
  clientSecret: string,
  refreshToken: string,
) {
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
