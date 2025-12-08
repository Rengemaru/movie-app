import './App.css'
import { useEffect, useState } from "react";

function App() {
  // TypeScript
  const defaultMovieList = [
    {
      id: 1,
      name: "君の名は。",
      image: "https://media.themoviedb.org/t/p/w300_and_h450_face/yLglTwyFOUZt5fNKm0PWL1PK5gm.jpg",
      overview: "1,000年に1度のすい星来訪が、1か月後に迫る日本。山々に囲まれた田舎町に住む女子高生の三葉は、町長である父の選挙運動や、家系の神社の風習などに鬱屈（うっくつ）していた。それゆえに都会への憧れを強く持っていたが、ある日彼女は自分が都会に暮らしている少年になった夢を見る。夢では東京での生活を楽しみながらも、その不思議な感覚に困惑する三葉。一方、東京在住の男子高校生・瀧も自分が田舎町に生活する少女になった夢を見る。やがて、その奇妙な夢を通じて彼らは引き合うようになっていくが……。",
    },
    {
      id: 2,
      name: "ハウルの動く城",
      image: "https://media.themoviedb.org/t/p/w300_and_h450_face/v0K2e1t6ocUNnkZ9BeiFdcOT9LG.jpg",
      overview: "父親の帽子店で帽子を作って暮らしていた18歳のソフィーは、荒野の魔女の呪いで90歳の老婆の姿になってしまう。彼女はハンサムだが気弱な魔法使いハウルと出会って、彼の居城でいっしょに暮らすようになるが、その城は4本足で歩く動く城だった。",
    },
    {
      id: 3,
      name: "もののけ姫",
      image: "https://media.themoviedb.org/t/p/w300_and_h450_face/mVdz3vlmioKWZaHTGfu99zIuayZ.jpg",
      overview: "山里に住む若者アシタカは、怒りと憎しみにより“タタリ神”と化した猪神から呪いをかけられてしまう。呪いを解く術を求めて旅に出るアシタカはやがて、西方の地で“タタラ”の村にたどり着く。エボシ御前が率いるその村では、鉄を造り続けていたが、同時にそれは神々の住む森を破壊することでもあった。そして、そんなタタラ達に戦いを挑むサンの存在をアシタカは知る。人の子でありながら山犬に育てられた彼女は“もののけ姫”と呼ばれていた。",
    },
    {
      id: 4,
      name: "バックトゥザフューチャー",
      image: "https://media.themoviedb.org/t/p/w300_and_h450_face/oHaxzQXWSvIsctZfAYSW0tn54gQ.jpg",
      overview: "スティーブン・スピルバーグとロバート・ゼメキスが贈るSFアドベンチャーシリーズ第1弾。高校生のマーティは、科学者・ドクの発明したタイムマシン・デロリアンで過去にタイムスリップしてしまう。",
    }
  ]
  // const [変数, 状態を管理する変数] = useState("初期値")と書くと状態を管理できるhookを使えるようになる → onclick(クリック属性)、onChange(リアルタイム変更)、onkeydown(キー入力受け付け)で使用できる
  const [keyword, setKeyword] = useState("");
  const [movieList, setMovieList] = useState([]);
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
    setMovieList(data.results);
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
        .filter((movie) => movie.original_name.includes(keyword))
        .map((movie) => (
          <div key={movie.id}>
            {/* keyをつけることによって効率的に、より整合性を持って画面の更新ができる　←　つけないといけないんだなーと思えばいい */}
            <h2>{movie.original_name}</h2>
            <img src={`https://media.themoviedb.org/t/p/w300_and_h450_face/${movie.poster_path}`} />
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App