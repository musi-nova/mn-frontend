export interface Playlist {
    id: number;
    playlist_name: string;
    owner_name: string;
    followers_total: number;
    playlist_id: string;
    user_id: number;
    owner_id: number;
    created_at: string;
}
export interface ArtistTopTracks {
    id: number;
    artist_name: string;
    track_name: string;
    created_at: string;
    artist_id: string;
    user_id: number;
    track_id: string;
    track_popularity: number;
}