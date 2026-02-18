import { Dispatch, SetStateAction } from 'react';
export interface Song {
    id: number;
    position: number;
    artist: string;
    title: string;
    year: number;
    lyrics?: string;
    tokens?: string;
}
export interface WordStats {
    word: string;
    ndoc: number;
    nentry: number;
}
export interface LyricsRecord {
    lyrics: string;
}
export interface YearCount {
    year: string;
    count: number;
}
export interface LyricAction {
    type: 'click' | 'clear';
    payload?: {
        num: number;
        display: boolean;
    };
}
export interface LyricState {
    [key: number]: boolean;
}
export interface Dimensions {
    width: number;
    height: number;
}
export interface AppContextValue {
    fetchSongsByWord: (query: string) => void;
    fetchLyricsById: (id: number) => void;
    wordData: Song[];
    word: string;
    setWord: Dispatch<SetStateAction<string>>;
    songs: Song[];
    setSongs: Dispatch<SetStateAction<Song[]>>;
    lyrics: string;
    setLyrics: Dispatch<SetStateAction<string>>;
    setSongId: Dispatch<SetStateAction<number | null>>;
    fetchWordsByYear: (year: number) => void;
    year: number | string;
    setYear: Dispatch<SetStateAction<number | string>>;
    wordsByYear: WordStats[];
    setWordsByYear: Dispatch<SetStateAction<WordStats[]>>;
}
export interface SongProps {
    song: Song;
    getLyrics: (id: number) => void;
    handleDisplay: (num: number | null) => void;
    displayNum: number | null;
    songNum: number;
    lyrics: string;
    setSongId: Dispatch<SetStateAction<number | null>>;
    selectSong: (action: LyricAction) => void;
    display: boolean;
}
//# sourceMappingURL=index.d.ts.map