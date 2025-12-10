import './App.css'
import { useEffect, useState } from "react";
import MovieCard from './MovieCard';

// このアプリで使用するtype
type Movie = {
  id: string,
  original_title: string,
  image: string,
  overview: string,
  poster_path: string,
}

// APIのデータの中で定義されているtype
type MovieJson = {
  adult: boolean,
  backdrop_path: string,
  genre_ids: number[],
  id: string,
  original_language: string,
  original_title: string,
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
    // キーワード検索のためにurlを変数にする
    let url = ""
    // keywordがある場合はAPIのsearchのqueryにkeywordを渡し、ない場合はAPIの一覧表示を渡す
    // searchとpopularのAPI側の型が違う場合(今回の場合は original_title と original_name が違った)popularではうまくいくのに、searchに切り替えたらTypeErrorをはくということがあるのできちんと型を見るように
    if (keyword) {
      url = `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=ja&page=1`;
    } else {
      url = "https://api.themoviedb.org/3/movie/popular?language=ja&page=1";
    }

    // 検索と一覧表示を切り替えれるようにurlに変更　"https://api.themoviedb.org/3/tv/popular?language=ja&page=1" → url
    const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
          // import.meta.env.VITE_TMDB_API_KEY; ← VITEの場合だとこ2の書き方で勝手にenvに飛んで値をとってきてくれる
        },
      }
    );

    // jsonも上(await fetch)と同じ理由で時間がかかることがあるため await で待ってあげて、レスポンスが帰ってきてから次の処理に行くようにしてあげる
    const data = await response.json();

    // こう書くことで持ってきたデータをjsonとして扱うことができる
    // APIの方で results の中にデータが格納されているため、キャッシュは results
    // Jsonに直すときに、MovieとMovieJsonの型をすり合わせる
    setMovieList(data.results.map((movie: MovieJson) => ({
      id: movie.id,
      image: movie.poster_path,
      poster_path: movie.poster_path,
      overview: movie.overview,
    })));
  }

  // useEffect：画面が表示される前に実行されるもの → 空括弧を入れている理由がそれ
  // 第二引数：依存配列
  // 実はuseEffectでデータ取得はしないほうがいい → React QueryやSWRなどのライブラリを利用してデータを取得する
  useEffect(() => {
    // 処理
    fetchMovieList()
  }, [keyword]);

  const heroTitle = "君の名は。"
  const heroYear = 2016
  const heroOverview = "1,000年に1度のすい星来訪が、1か月後に迫る日本。山々に囲まれた田舎町に住む女子高生の三葉は、町長である父の選挙運動や、家系の神社の風習などに鬱屈（うっくつ）していた。それゆえに都会への憧れを強く持っていたが、ある日彼女は自分が都会に暮らしている少年になった夢を見る。夢では東京での生活を楽しみながらも、その不思議な感覚に困惑する三葉。一方、東京在住の男子高校生・瀧も自分が田舎町に生活する少女になった夢を見る。やがて、その奇妙な夢を通じて彼らは引き合うようになっていくが……。"
  const heroImage = "https://media.themoviedb.org/t/p/w300_and_h450_face/yLglTwyFOUZt5fNKm0PWL1PK5gm.jpg"

  return (
    <div>
      <section className="hero-section">
        {heroImage && (
          <>
            <img className="hero-section-bg" src={heroImage} alt={heroTitle} />
            <div className="hero-section-gradient" />
          </>
        )}
        <div className="hero-section-content">
          <h1 className="hero-section-title">{heroTitle}</h1>
          <div className="hero-section-badges">
            <span className="hero-section-badge">{heroYear}</span>
          </div>
          {heroOverview && (
            <p className="hero-section-overview">{heroOverview}</p>
          )}
          <div className="hero-section-actions">
            <button className="hero-section-btn hero-section-btn-primary">
              <span>▶ Play</span>
            </button>
            <button className="hero-section-btn hero-section-btn-secondary">
              <span>More Info</span>
            </button>
          </div>
        </div>
      </section>
      <section className="movie-row-section">
        <h2 className="movie-row-title">
          {keyword ? `「${keyword}」の検索結果` : "人気映画"}
        </h2>
        <div className="movie-row-scroll">
          {movieList.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </section>
      <div className="app-search-wrap">
        <input
          type="text"
          className="app-search"
          placeholder="映画タイトルで検索..."
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
    </div>
  );
}

export default App