import { useEffect, useState } from "react";
import { Session } from "../../types/Session";
import SessionList from "../../components/SessionList";
import useQuarySession from "../../hooks/useQuarySessions";
import useQuaryUser from "../../hooks/useQuaryUser";
import cacheService from "../../service/CacheService";
import { useNavigate } from "react-router-dom";
import SessionItem from "../../components/SessionItem";

type HomePageProps = {
  setCurrentSession: React.Dispatch<React.SetStateAction<Session>>;
};

const HomePage: React.FC<HomePageProps> = ({ setCurrentSession }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [dateSearch, setDateSearch] = useState<string>("");
  const { isLoading, error, data } = useQuarySession(dateSearch);
  const { loading, err, userData } = useQuaryUser(username);

  useEffect(() => {
    try {
      setUsername(cacheService.getLocalValue("USER").username);
    } catch (err) {
      navigate("/");
    }
  }, [navigate]);

  const [showSchedule, setShowSchedule] = useState<boolean>(false);
  const [showMyBookings, setShowMyBookings] = useState<boolean>(false);

  const toggleSchedule = () => {
    setShowSchedule(!showSchedule);
  };

  const toggleMyBookings = () => {
    setShowMyBookings(!showMyBookings);
  };

  return (
    <>
      <div className="menu">
        <button className="menu-home-btn">Home</button>
        <button className="menu-admin-btn">Admin</button>
      </div>
      <div>
        <div className="nav-btns">
          <button className={`nav-schedule-btn${showSchedule ? " active" : ""}`} onClick={toggleSchedule}>
            Schedule
          </button>
          <button
            className={`nav-bookings-btn${showMyBookings ? " active" : ""}`}
            onClick={toggleMyBookings}>
              My Bookings
          </button>
          </div>
        {showSchedule && (
          <>
            <input
              type="date"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDateSearch(e.target.value)
              }
            />
            <button onClick={() => setDateSearch("")}>Clear Filter</button>
            {(error && <p>404 could not found</p>) ||
              (isLoading && <p>loading...</p>) ||
              (data?.length === 0 && (
                <p>There is no session on {dateSearch}</p>
              )) || <SessionList sessions={data} />}
          </>
        )}
        {showMyBookings && (
          <div>My Bookings content goes here</div>
        )}
      </div>
    </>
  );
};

export default HomePage;
