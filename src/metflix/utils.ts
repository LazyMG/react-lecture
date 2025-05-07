//w500 or w200
export function makeImagePath(backdrop_path: string, format?: string) {
  return `https://image.tmdb.org/t/p/${
    format ? format : "original"
  }${backdrop_path}`;
}
