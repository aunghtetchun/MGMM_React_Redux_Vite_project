const initialState = {
  popular_games: [],
  all_games: [],
  related_games: [],
  game: null,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_POPULAR_GAMES":
      return {
        ...state,
        popular_games: action.payload,
      };
      case "SET_ALL_GAMES":
      return {
        ...state,
        all_games: action.payload,
      };
    case "SET_GAME_DETAILS":
      return {
        ...state,
        game: action.payload,
      };
    case "SET_RELATED_GAMES":
      return {
        ...state,
        related_games: action.payload,
      };
    default:
      return state;
  }
};

export default gameReducer;
