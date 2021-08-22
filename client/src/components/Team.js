import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";

function Team(props) {
  const TEAM_QUERY = gql`
    query TeamQuery($id: Int!) {
      team(id: $id) {
        full_name
        conference
        division
      }
    }
  `;
  let id = parseInt(props.match.params.id);
  const { loading, error, data } = useQuery(TEAM_QUERY, { variables: { id } });
  if (loading) return <p>Loading...</p>;
  if (error) console.log(error);
  const { full_name, division, conference } = data.team;

  return (
    <div className="flex flex-col items-center">
      <h2>{full_name}</h2>
      <p>Conference: {conference}</p>
      <p>Division: {division}</p>
      <Link to="/">&larr;Back</Link>
    </div>
  );
}

export default Team;
