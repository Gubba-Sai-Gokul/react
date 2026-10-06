import Spinner from "./Spinner";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "./Message";
import { useCityContext } from "../contexts/CityContextProvider";

export default function CityList() {
  const { cityData, isLoading } = useCityContext();
  console.log("cityList ", cityData);

  if (isLoading) {
    return <Spinner />;
  }

  if (cityData.length === 0) {
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  }

  return (
    <ul className={styles.cityList}>
      {cityData.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}
