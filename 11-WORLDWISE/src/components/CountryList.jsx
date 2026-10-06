import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import { useCityContext } from "../contexts/CityContextProvider";

export default function CountryList() {
  const {cityData, isLoading} = useCityContext();

  if (isLoading) {
    return <Spinner />;
  }

  if (cityData.length === 0) {
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  }

  const countries = cityData.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { id: city.id, country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}
