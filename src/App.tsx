import './App.css'
import { useEffect, useState } from "react";

// このアプリで使用するtype
type Movie = {
  id: number,
  name: string,
  image: string,
  overview: string,
}

// APIのデータの中で定義されているtype
type MovieJson = {
  adult: boolean,
  backdrop_path: string,
  genre_ids: number[],
  id: number,
  original_language: string,
  original_name: string,
  overview: string,
  popularity: number,
  poster_path: string,
  first_air_date: string,
  name: string,
  vote_average: number,
  vote_count: number
}

function App() {
  // TypeScript
  // const [変数, 状態を管理する変数] = useState("初期値")と書くと状態を管理できるhookを使えるようになる → onclick(クリック属性)、onChange(リアルタイム変更)、onkeydown(キー入力受け付け)で使用できる
  const [keyword, setKeyword] = useState("");
  // <Movie[]>と置くことで、Movieのtype以外が参照できないようにする
  const [movieList, setMovieList] = useState<Movie[]>([]);

  // asyncで非同期処理にできる → awaitをつけずにfetchをつけるとfetchに時間がかかった場合すぐ次の処理(jsonに直す)に行ってしまうためデータが帰ってきてない状態で次に行ってしまう → つじつまが合わなくなってしまう
  // awaitを使うことでデータのレスポンスが帰ってきてから次の処理に行くようにできる
  const fetchMovieList = async() => {
    const response = await fetch(
      "https://api.themoviedb.org/3/tv/popular?language=ja&page=1",
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
          // import.meta.env.VITE_TMDB_API_KEY; ← VITEの場合だとこ2の書き方で勝手にenvに飛んで値をとってきてくれる
        },
      }
    );
    // jsonも上(await fetch)と同じ理由で時間がかかることがあるため await で待ってあげて、レスポンスが帰ってきてから次の処理に行くようにしてあげる
    const data = await response.json();
    // こう書くことで持ってきたデータをjsonとして扱うことができる
    // Jsonに直すときに、MovieとMovieJsonの型をすり合わせる
    setMovieList(data.results.map((movie: MovieJson) => ({
      id: movie.id,
      name: movie.original_name,
      image: movie.poster_path,
      overview: movie.overview,
    })));
    // APIの方で results の中にデータが格納されているため、キャッシュは results
  }
  // useEffect：画面が表示される前に実行されるもの → 空括弧を入れている理由がそれ
  // 第二引数：依存配列
  // 実はuseEffectでデータ取得はしないほうがいい → React QueryやSWRなどのライブラリを利用してデータを取得する
  useEffect(() => {
    // 処理
    fetchMovieList()
  }, []);

  return (
    // HTMLなどを書く部分
    <div>
      <div>{keyword}</div>
        {/* onChangeを使用してリアルタイム変更、setKeywordで状態を変更させる */}
        <input type='text' onChange={(e) => setKeyword(e.target.value)}/>
      <div>
        {/* mapを使うことによって動的にループで配置できる 
            filter(条件) → trueのものは表示、falseのものは非表示にできる
            filterの条件にincludesを使用することでその内容が含まれているかという条件にすることができる
            ※この場合はmovie.nameにkeywordが含まれているかという条件になる */}
        {movieList
        .filter((movie) => movie.name.includes(keyword))
        .map((movie) => (
          <div key={movie.id}>
            {/* keyをつけることによって効率的に、より整合性を持って画面の更新ができる　←　つけないといけないんだなーと思えばいい */}
            <h2>{movie.name}</h2>
            <img src={`https://media.themoviedb.org/t/p/w300_and_h450_face/${movie.image}`} />
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App