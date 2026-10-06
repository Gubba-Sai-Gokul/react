import { useCallback } from "react";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  // useState,
} from "react";

const CityContext = createContext();

const initialState = {
  cityData: [],
  isLoading: false,
  currentCity: {},
};

function reducer(state, action) {
  switch (action.type) {
    case "requestSent":
      return {
        ...state,
        isLoading: true,
      };
    case "setCityData":
      return {
        ...state,
        cityData: action.payload,
        isLoading: false,
      };
    case "addCity":
      return {
        ...state,
        cityData: [...state.cityData, action.payload],
      };
    case "deleteCity":
      return {
        ...state,
        cityData: state.cityData.filter((city) => city.id !== action.payload),
      };
    case "setCurrentCityData":
      return {
        ...state,
        currentCity: action.payload,
        isLoading: false,
      };
    case "error":
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}

function CityProvider({ children }) {
  // const [cityData, setCityData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cityData, isLoading, currentCity } = state;

  useEffect(() => {
    const fetchCities = async () => {
      try {
        dispatch({ type: "requestSent" });
        // setIsLoading(true);
        const response = await fetch("http://localhost:8000/cities");
        if (!response.ok) throw new Error("Failed to fetch cities");
        const data = await response.json();
        dispatch({ type: "setCityData", payload: data });
        // setCityData(data);
      } catch (error) {
        console.error(error);
        dispatch({ type: "error" });
      }
    };

    fetchCities();
  }, []);

  const getCity = useCallback(async function getCity(id) {
    try {
      dispatch({ type: "requestSent" });
      const response = await fetch(`http://localhost:8000/cities/${id}`);
      if (!response.ok) throw new Error("Failed to fetch cities");
      const data = await response.json();
      dispatch({ type: "setCurrentCityData", payload: data });
      // setCurrentCity(data);
    } catch (error) {
      console.error(error);
      dispatch({ type: "error" });
    }
  }, []);

  async function createCity(city) {
    try {
      const response = await fetch("http://localhost:8000/cities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(city),
      });

      if (!response.ok) throw new Error("Failed to create city");

      const data = await response.json();
      // setCityData((prev) => [...prev, data]);
      dispatch({ type: "addCity", payload: data });
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false };
    }
  }

  async function deleteCity(id) {
    try {
      const response = await fetch(`http://localhost:8000/cities/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        return {
          success: false,
          message: "Unable to delete",
        };
      }

      // setCityData((data) => data.filter((city) => city.id !== id));
      dispatch({ type: "deleteCity", payload: id });

      return {
        success: true,
        message: "Deleted successfully",
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Something went wrong",
      };
    }
  }

  return (
    <CityContext.Provider
      value={{
        cityData,
        isLoading,
        // setCityData,
        // setIsLoading,
        getCity,
        currentCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

function useCityContext() {
  const context = useContext(CityContext);
  if (context === null) {
    throw new Error("useCityContext must be used within a CityProvider");
  }
  return context;
}

/* eslint-disable react-refresh/only-export-components */
export { CityProvider, useCityContext };
