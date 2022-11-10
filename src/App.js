import "./App.css";
import React from "react";
import Select from "./Components/Select";
import { nanoid } from "nanoid";
import Map from "./Components/Map";
import "leaflet/dist/leaflet.css";
import Header from "./Components/Header";
import Waiting from "./Components/Waiting";
import Error from "./Components/Error";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listItem: null,
      position: [],
      frenchCity: null,
      chooseCity: null,
      errorMap: null,
      errorInApp: null,
    };
    this.APIkey = "Enter here the API KEY";
    this.defaultValue = "--- Selectionner une ville ---";
  }

  componentDidMount() {
    this.getAllCity();
  }

  /**
   * Récupère toutes les villes disponible sur l'API jcdecaux
   */
  getAllCity = () => {
    fetch(`https://api.jcdecaux.com/vls/v3/contracts?apiKey=${this.APIkey}`)
      .then((res) => res.json())
      .then((data) => this.getAllFrenchCity(data))
      .catch((error) => console.log(error));
  };

  /**
   * Fait un tri sur la liste des villes, pour en garder uniquement les villes françaises
   *
   * @param {Array} cities // Liste de toutes les villes
   */
  getAllFrenchCity = async (cities) => {
    var arrayFR = [];
    var defaultValue = [this.defaultValue, this.defaultValue + ":::000"];
    arrayFR.push(defaultValue);
    this.setState({ chooseCity: arrayFR[0][1] });

    var count = 0;

    for (var city of cities) {
      if (city.country_code === "FR") {
        city.cities.forEach((element) => {
          var value = city.name + ":::" + count;
          arrayFR.push([element, value]);
          count++;
        });
      }
    }
    await this.setState({ frenchCity: arrayFR });
  };

  /**
   * Récupère tout les contrats d'une ville passer en paramètre
   *
   * @param {String} cityValue
   */
  getAllVeloForCity = async (cityValue) => {
    var cityName = cityValue.split(":::")[0];

    await fetch(
      `https://api.jcdecaux.com/vls/v3/stations?apiKey=${this.APIkey}&contract=${cityName}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(async (responseJson) => {
        await this.setPinsValue(responseJson);
        this.setState({ errorInApp: null });
      })
      .catch((error) => {
        console.log("erreur !");
        this.setState({
          errorInApp:
            "Erreur avec l'acquisition de la ville et de ses contrat !",
        });
      });
  };

  /**
   * Récupère la position (lng, lat) de la ville passer en paramètre
   *
   * @param {String} cityName
   */
  getPositionCity = async (cityName) => {
    await fetch(`https://api-adresse.data.gouv.fr/search/?q=${cityName}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((responseJson) => {
        this.setState({ errorMap: null, errorInApp: null });
        var position = responseJson.features[0].geometry.coordinates;
        var longitude = position[0];
        var latitude = position[1];
        this.setState({ position: [latitude, longitude] });
      })
      .catch(async (error) => {
        this.setState({
          errorMap:
            "Ville introuvable sur la map, focus sur le premier contract !",
        });
        this.positionBecomeFirstContract();
      });
  };

  /**
   * Defini la position d'une ville comme étant son premier contrat si introuvable par l'API Data.Gouv
   */
  positionBecomeFirstContract = () => {
    console.log(this.state.listItem[0]);
    if (this.state.listItem !== null) {
      this.setState({
        position: [
          this.state.listItem[0].position.latitude,
          this.state.listItem[0].position.longitude,
        ],
      });
    } else {
      this.setState({
        errorInApp: "Erreur avec l'acquisition de la ville et de ses contrat !",
      });
    }
  };

  /**
   * Update dans le composant mère et enfant l'element <Select> ainsi que les valeurs utiliser dans l'app
   *
   * @param {String} value //Valeur dans le <select>
   * @param {String} name //Texte dans le <select>
   */
  updateSelect = async (value, name) => {
    console.log(value);
    this.setState({ chooseCity: value });
    if (name !== this.defaultValue) {
      await this.getAllVeloForCity(value);
      await this.getPositionCity(name);
    }
  };

  /**
   * Met a jour la liste des contrat
   *
   * @param {Array} data
   */
  setPinsValue = async (data) => {
    this.setState({ listItem: data });
  };

  render() {
    return (
      <div className="main">
        <Header />

        {this.APIkey === "Enter here the API KEY" && (
          <div>
            <p className="red-text">
              Veuillez saisir une clé API ! (dans la propriété this.apiKey de
              App.js)
            </p>
          </div>
        )}

        {this.state.frenchCity && (
          <Select
            key={nanoid()}
            chooseCity={this.state.chooseCity}
            frenchCity={this.state.frenchCity}
            updateSelect={(e, f) => this.updateSelect(e, f)}
          />
        )}

        {this.state.errorMap &&
          this.state.errorInApp === null &&
          this.state.chooseCity !== "--- Selectionner une ville ---:::000" && (
            <div>
              <p className="red-text">{this.state.errorMap}</p>
            </div>
          )}

        {this.state.chooseCity === "--- Selectionner une ville ---:::000" &&
          this.state.errorInApp === null && <Waiting />}

        {this.state.errorInApp && <Error errorInApp={this.state.errorInApp} />}

        {this.state.chooseCity &&
          this.state.listItem &&
          this.state.position.length > 0 &&
          this.state.errorInApp === null &&
          this.state.chooseCity !== "--- Selectionner une ville ---:::000" && (
            <Map
              key={nanoid()}
              position={this.state.position}
              pins={this.state.listItem}
            />
          )}
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

export default App;
