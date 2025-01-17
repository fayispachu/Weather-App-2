import { useEffect, useRef, useState } from "react";
import "./App.css";
import axios from "axios";
import bgimage from "./assets/bg.jpg";
function App() {
  const [weather, setWeather] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef();

  async function fetchData(e) {
    e.preventDefault();

    if (!searchTerm) {
      console.log("search term is empty");
    }

    try {
      // setLoading(true);
      const { data } = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=5955e33afcfb4fbb8e365009251501&q=${searchTerm}`
      );
      setWeather(data);
      console.log(data);
      console.log(weather);
    } catch (error) {
      console.log("error und", error);
    }
  }

  useEffect(() => {
    if (searchTerm) {
      fetchData();
    }
  }, [searchTerm]);
  // const handleSearch = (e) => {
  //   setSearchTerm(e.target.value);
  // };
  return (
    <>
      <div className="w-screen h-screen bg-black flex justify-center items-center">
        <img src={bgimage} alt="" />{" "}
        <div className="w-72 h-64 bg-white/40 rounded-md flex flex-col  items-center absolute">
          <form onSubmit={fetchData}>
            <div className="flex flex-row items-center pt-4  ">
              {" "}
              <input
                ref={inputRef}
                value={searchTerm}
                required
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search here "
                className="w-[80%] h-10  rounded-full  text-center bg-white/40 "
              />
              <button
                className="bg-black rounded-full w-10 h-10 "
                type="submit"
                // onClick={() => setSearchTerm(inputRef.current.value)}
              >
                🔍
              </button>
            </div>
          </form>
          {weather && (
            <div className="flex flex-col justify-center items-center">
              <h1 className="font-bold text-2xl mt-5">
                {weather.location.name}
              </h1>
              <h1 className="font-bold"> {weather.current.temp_c}&deg;C</h1>
              <img src={weather.current.condition.icon} alt="" />

              <p>Cloud:{weather.current.cloud}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
