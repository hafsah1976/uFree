import React from "react";
import { Link } from "react-router-dom";
import "../assets/dashboard.css";

// import GET_EVENT query
import { QUERY_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";
import { monthAndDay } from "../utils/convertDate";
import LogoutButton from "../components/LogoutButton";

const Dashboard = () => {
  const { loading, error, data } = useQuery(QUERY_ME);
  const events = data?.me.events;

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Oops! An error occurred.</p>;

  return (
    <LogoutButton>
      <section id="content_dashboard_page">
        <section id="dashboard_content">
          <div id="header_content">
            <h1 id="header_title">Dashboard</h1>
            <div id="header_buttons">
              <Link to="/events/create">
                <button className="btn_large btn_accent dashboard_btn">
                  <i
                    className="bi bi-plus-lg"
                    style={{ marginRight: "var(--padding-sm)" }}
                  ></i>
                  Create Event
                </button>
              </Link>
              <Link to="/events/join">
                <button className="btn_large btn_accent dashboard_btn">
                  <i
                    className="bi bi-door-open"
                    style={{ marginRight: "var(--padding-sm)" }}
                  ></i>
                  Join Event
                </button>
              </Link>
            </div>
          </div>
          <div id="dashboard_event_board">
            <h2 id="board_title">Events</h2>
            {events.length === 0 ? (
              <p>You have no events.</p>
            ) : (
              <div id="board_elements">
                {events.map((event) => (
                  <EventBox key={event._id} event={event} />
                ))}
              </div>
            )}
          </div>
        </section>
      </section>
    </LogoutButton>
  );
};

function EventBox({ event }) {
  return (
    <div className="event_box">
      <Link to={`/events/${event._id}`}>
        <div
          className="event_header"
          style={{
            backgroundImage: `url("${event.thumbnail}")`,
            backgroundSize: "cover",
            backgroundPosition: "50%",
          }}
        />

        <div className="event_content">
          <p className="event_content_name">{event.name}</p>
          <p className="event_content_week">
            Week of {monthAndDay(event.week)}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default Dashboard;
