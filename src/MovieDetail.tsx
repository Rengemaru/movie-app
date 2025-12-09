import { useParams } from "react-router";

function MovieDetail(){
  // useParams
  const { movieId } = useParams();
  return(
    <div>
      <h1>MovieDetail</h1>
      <div>{movieId}</div>
    </div>
  )
}

export default MovieDetail;