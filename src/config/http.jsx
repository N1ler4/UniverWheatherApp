import axios from "axios";

const http = (position) =>
  axios.get(
    `https://api.iso-maps.com/v1/weather/forecast/daily?position=${position}&lang=ru-RU&units=standard&api_key=ZTTE9VTFXz4XQuKZPk5J5rR3dwbReZ5qAhBHRtfLalnvbCMNGEO7aPYzEifJ`
  );
export default http