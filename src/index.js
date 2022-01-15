import React from "react";
import ReactDOM from "react-dom";
import { useState } from "react";

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};
  
const toCelsius = (fahrenheit) => {
  return (fahrenheit - 32) * 5 / 9;
}

const toFahrenheit = (celsius) => {
  return (celsius * 9 / 5) + 32;
}
  
const tryConvert = (temperature, convert) => {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

const BoilingVerdict = (props) => {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
              onChange={this.handleChange} />
      </fieldset>
    );
  }
}

const TemperatureInputV2 = (props) => {
  const handleChange = (e) => {
    props.onTemperatureChange(e.target.value);
  }
  const temperature = props.temperature;
  const scale = props.scale;
  return (
    <fieldset>
      <legend>Enter temperature in {scaleNames[scale]}:</legend>
      <input value={temperature}
              onChange={handleChange} />
    </fieldset>
  );
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

const CalculatorV2 = (props) => {
  const [state, setState] = useState({temperature: '', scale: 'c'});
  const handleCelsiusChange = (temperature) => {
    setState({scale: 'c', temperature});
  };
  const handleFahrenheitChange = (temperature) => {
    setState({scale: 'f', temperature});
  };
  const scale = state.scale;
  const temperature = state.temperature;
  const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
  const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

  return (
    <div>
        <TemperatureInputV2
          scale="c"
          temperature={celsius}
          onTemperatureChange={handleCelsiusChange} />
        <TemperatureInputV2
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
  );
}

ReactDOM.render(
  <CalculatorV2 />,
  document.getElementById('root')
);
