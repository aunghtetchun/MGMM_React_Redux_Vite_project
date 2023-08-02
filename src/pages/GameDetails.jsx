import React, { useState } from "react";
import { useEffect } from "react";
import { Badge, Placeholder } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {  Link, useParams } from "react-router-dom";
import { fetchGameDetails } from "../actions/gameActions";
import {FiLayers, FiSettings, FiPackage, FiSave, FiCalendar, FiCpu, FiDownload} from "react-icons/fi";
import RelatedGames from "../components/RelatedGames";
import ShareInfo from "../components/ShareInfo";
import ImageCarousel from "../components/ImageCarousel";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { saveGame } from "../services/api";

export default function GameDetails() {
  const dispatch = useDispatch();
  const { slug } = useParams();

  const game = useSelector((state) => state.gameReducer.game);  /// state ယူတဲ့အဆင့်
  const { user, isLoggedIn,setGames,games } = useContext(AuthContext);
  const [message,setMessage] = useState(null);
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    // Fetch the game details when the component mounts  state ထည့်တဲ့အဆင့်
    dispatch(fetchGameDetails(slug));
    setMessage(null);
  }, [dispatch,slug]);

  const saveData =async() => {
    const post_id=game.id;
    const user_id=user.id;
      const response = await saveGame(post_id, user_id,user.oldToken);
      const idExists = games.some((existingGame) => existingGame.id === game.id);
      if (!idExists) {
        // If the game's ID does not exist, add the new game to the array
        setGames((prevGames) => [...prevGames, game]);
      }
      if (response.success){
        setMessage(response.success);
      }
  };
  
  if (!game) {
    return <div>Game not found.</div>;
  }

  return (
    <>
      {game && (
        <div className="d-flex mt-4 px-2 flex-wrap justify-content-center align-items-center">
          <div className="d-flex col-12 flex-wrap align-items-start justify-content-center">
            <div
              className="col-3  col-md-2 col-lg-1 px-1  pt-1 "
            >
              <img
                src={game.logo}
                alt=""
                className="w-100 my-2"
              />
            </div>
            <div className="col-12 text-center px-0">
              <h5 className=" mt-1 ps-2 ps-md-0 mb-2  font-weight-bold ">
                {game.name}
              </h5>
            </div>
          </div>
          <div className="col-12 px-0 text-center">
            {game.categories &&
              game.categories.map((category) => {
                  <div key={category.id}>
                    <Badge pill bg="warning" className="font-weight-bold my-1 mx-1">
                      {category.title}
                    </Badge>
                  </div>
              })}
          </div>
          <div className="col-12 col-md-7 mx-auto px-0 mt-2">
                <table className="table table-bordered mx-0 mb-0 px-0 w-100 table-striped">
                    <tbody>
                        <tr>
                            <td className="nowrap"> <FiCpu className="text-primary"/> &nbsp; Company</td>
                            <td>{game.developer}</td>
                        </tr>
                        <tr>
                            <td className="nowrap"> <FiCalendar className="text-primary"/> &nbsp; Updated</td>
                            <td>{game.updated}</td>
                        </tr>
                        <tr>
                            <td className="nowrap"> <FiSave className="text-primary"/>&nbsp; Size</td>
                            <td>{game.size}</td>
                        </tr>
                        <tr>
                            <td className="nowrap"> <FiLayers className="text-primary"/>&nbsp; Version</td>
                            <td>{game.version}</td>
                        </tr>
                        <tr>
                            <td className="nowrap"> <FiSettings className="text-primary"/>&nbsp; Requierment</td>
                            <td> {game.requirement}</td>
                        </tr>
                        <tr>
                            <td className="nowrap"> <FiPackage className="text-primary"/>&nbsp; Type</td>
                            <td> {game.type}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="col-12 mt-4 text-center ">
             <h4 className="col-12 font-weight-bolder  pb-0 mb-4 text-center ">Gameplay Photos</h4>                
                <ImageCarousel images={game.photos}/>
            </div>
            <div className="col-12 mt-4 text-center">
            <h4 className="col-12 font-weight-bolder pb-0 mb-4 text-center ">Gameplay Video</h4>                

              <iframe
                width="100%"
                height="200"
                src={ `https://www.youtube.com/embed/${game.video}`}
                title="YouTube Video Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe>
            </div>
            <div className="col-12  text-center details_title">
                <h4 className="col-12 font-weight-bolder mt-3 pb-0 fw-bolder text-center ">ဂိမ်းအကြောင်း</h4>                
                <div className="px-3" key="game-description" dangerouslySetInnerHTML={{ __html: game.description }}></div>
                <div className="text-center">
                    <Badge
                      pill bg="secondary" className="font-weight-bold  px-3 py-2 my-2 mx-1"
                    >
                      Uploaded by {game.username}
                    </Badge>
                 </div>
                <h4 className="col-12 font-weight-bolder mt-3 pb-0 mb-0 text-center ">Mod Features</h4>                
                <p >{game.features}</p>
                <h4 className="col-12 font-weight-bolder my-3 pb-0 fw-bolder text-center ">ဒီမှာဒေါင်းပါ</h4>                
                 <Link to={`/download/${game.slug}`} className="btn bg_main px-4 py-2"><FiDownload/>&nbsp;Download Game</Link>
                 {isLoggedIn && !message ?
                    <button onClick={saveData} className="btn btn-outline-success px-4 py-2 ms-2"><FiSave/>&nbsp;သိမ်းထားမည်</button>
                 : !message && isLoggedIn  ? <Placeholder.Button xs={4} aria-hidden="true" />: message && isLoggedIn ?<div className="alert alert-success my-2 col-12">{message}</div> :''}

                <div className="col-12 mx-auto px-0 mt-3 text-center d-flex flex-wrap">
                    <ShareInfo/>                 
                </div>
                <h4 className="col-12 font-weight-bolder my-3 pb-0 fw-bolder text-center ">ဆင်တူသောဂိမ်းများ</h4>   
                <RelatedGames id={game.category_id} />      
            </div>
        </div>
      )}
    </>
  );
}
