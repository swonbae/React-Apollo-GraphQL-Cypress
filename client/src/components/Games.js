import React, { Fragment, useEffect, useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import moment from "moment";

function Games() {
  const ALL_GAMES_QUERY = gql`
    query AllGamesQuery($date: String!) {
      allGames(date: $date) {
        home_team {
          full_name
          id
        }
        visitor_team {
          full_name
          id
        }
        home_team_score
        visitor_team_score
        status
        id
      }
    }
  `;

  //   const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [date, setDate] = useState(moment().format("2020-01-28"));

  useEffect(() => {
    if (!date) setDate(moment().format("YYYY-MM-DD"));
  }, [date]);

  const { loading, error, data } = useQuery(ALL_GAMES_QUERY, {
    variables: { date },
  });
  if (loading) return <p>Loading...</p>;
  if (error) console.log(error);

  return (
    <div className="flex flex-col items-center">
      <label htmlFor="date">Show games for: </label>
      <input
        className="border-2 border-gray-500 p-2"
        type="date"
        id="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        pattern="\d{4}-\d{2}-\d{2}"
      />
      {data.allGames.map((game) => (
        <div className="flex flex-col items-center" key={game.id}>
          <p className="mt-4">
            <Link to={`teams/${game.home_team.id}`}>
              {game.home_team.full_name}
            </Link>
            {game.home_team_score !== 0 && (
              <Fragment>: {game.home_team_score}</Fragment>
            )}{" "}
            vs.{" "}
            <Link to={`teams/${game.visitor_team.id}`}>
              {game.visitor_team.full_name}
            </Link>
            {game.visitor_team_score !== 0 && (
              <Fragment>: {game.home_team_score}</Fragment>
            )}
          </p>
          <p>{game.status}</p>
        </div>
      ))}
    </div>
  );
}

export default Games;
