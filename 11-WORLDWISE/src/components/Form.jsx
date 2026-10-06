// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCityContext } from "../contexts/CityContextProvider";

function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const Navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [exist, setExist] = useState(true);
  const { createCity } = useCityContext();

  console.log(country, setCountry, convertToEmoji);
  const lat = parseFloat(searchParams.get("lat"));
  const lng = parseFloat(searchParams.get("lng"));

  useEffect(() => {
    async function fetchLocation() {
      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
      );
      const data = await res.json();
      console.log(data);
      if (!(data.city === "" && data.countryName === "")) {
        setCityName(data?.city);
        setCountry(data?.countryName);
        setEmoji(convertToEmoji(data?.countryCode));
        setExist(true);
      } else {
        setExist(false);
      }

      return;
    }
    fetchLocation();
  }, [lat, lng]);

  async function handleAddCity(e) {
    e.preventDefault();

    if (!cityName || !lat || !lng) return;

    const city = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
      id: Math.floor(100 + Math.random() * 9000)
    };

    const result = await createCity(city);

    if (result.success) {
      Navigate("/app/cities");
      setCityName("");
      setCountry("");
      setEmoji("");
      setDate("");
      setNotes("");
    }
  }

  return exist ? (
    <form className={styles.form} onSubmit={handleAddCity}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  ) : (
    <p>That doesn’t seem to be a city. Click somewhere else</p>
  );
}

export default Form;
