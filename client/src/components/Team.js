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
      <h2 className="text-2xl">{full_name}</h2>
      <p className="mt-2">Conference: {conference}</p>
      <p>Division: {division}</p>
      <Link to="/" className="mt-8 font-bold">
        &larr;Back
      </Link>
    </div>
  );
}

export default Team;
