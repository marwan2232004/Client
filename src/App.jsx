import { useEffect, useState } from "react";
import "./App.css";
import leaf1 from "./assets/_611867016.svg";
import leaf2 from "./assets/_613281272.svg";
import leaf3 from "./assets/_614644872.svg";
import leaf4 from "./assets/_678544264.svg";
import leaf5 from "./assets/_681515824.svg";
import leaf6 from "./assets/_613663552.svg";
import leaf7 from "./assets/_614047480.svg";
import leaf8 from "./assets/_614656440.svg";
import logo from "./assets/logo.png";
import SubmitButton from "./components/submitButton";

import ComparisonChart from "./components/ComparisonChart";
import ModelAccuracyChart from "./components/ModelAccuracyChart";

function App() {
  const [formData, setFormData] = useState({
    Nitrogen: "",
    Phosphorus: "",
    Potassium: "",
    Temperature: "",
    Humidity: "",
    PH: "",
    Rainfall: "",
  });
  const [predictions, setPredictions] = useState(null);

  const [accuracyData, setAccuracyData] = useState(null);

  useEffect(() => {
    const fetchAccuracyData = async () => {
      try {
        const response = await fetch("https://joyous-becky-cropsprediciton-c4cd7ffa.koyeb.app/accuracy");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);
        setAccuracyData(data);
      } catch (error) {
        console.error("Error fetching accuracy data:", error);
      }
    };

    fetchAccuracyData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert form data values to floats
    const formDataAsFloats = {
      Nitrogen: parseFloat(formData.Nitrogen),
      Phosphorus: parseFloat(formData.Phosphorus),
      Potassium: parseFloat(formData.Potassium),
      Temperature: parseFloat(formData.Temperature),
      Humidity: parseFloat(formData.Humidity),
      PH: parseFloat(formData.PH),
      Rainfall: parseFloat(formData.Rainfall),
    };

    console.log("Form data:", formDataAsFloats);
    try {
      const response = await fetch("https://joyous-becky-cropsprediciton-c4cd7ffa.koyeb.app/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataAsFloats),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      console.log(data);

      setPredictions(data);
    } catch (error) {
      console.error("Error making prediction:", error);
    }
  };

  return (
    <>
      <div className="container">
    
        <div className="form-container">
        <img className="leaves leaf1" src={leaf1} />
        <img className="leaves leaf2" src={leaf2} />
        <img className="leaves leaf3" src={leaf3} />
        <img className="leaves leaf4" src={leaf4} />
          <div>
            <img className="logo" src={logo} alt="Sample" />
          </div>
          <form className="form" onSubmit={handleSubmit}>
            {Object.keys(formData).map((key) => (
              <div key={key} className="inputGroup">
                <input
                  id={key}
                  type="text"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
                <label htmlFor={key}>{key}</label>
              </div>
            ))}
            <div className="submit-container">
              <SubmitButton />
            </div>
          </form>
        </div>

        <div className="output">
        <img className="leaves leaf5" src={leaf5} />
        <img className="leaves leaf6" src={leaf6} />
        <img className="leaves leaf7" src={leaf7} />
        <img className="leaves leaf8" src={leaf8} />
          <ModelAccuracyChart accuracyData={accuracyData} />
          <ComparisonChart data={predictions} />
        </div>
      </div>
    </>
  );
}

export default App;
