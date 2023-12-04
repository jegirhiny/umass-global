import './App.css';
import { Route, Navigate, BrowserRouter, Routes } from "react-router-dom";
import DogDetails from './components/dog-details/dog-details.component';
import DogList from './components/dog-list/dog-list.component';

import whiskey from "./images/whiskey.jpg";
import duke from "./images/duke.jpg";
import perry from "./images/perry.jpg";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/dogs" element={<DogList dogs={ App.defaultProps.dogs }/>} />
        <Route exact path="/dogs/:name" element={<DogDetails dogs={ App.defaultProps.dogs } />} />
        <Route path='*' element={<Navigate to={"/dogs"} />} />
      </Routes>
    </BrowserRouter>
  );
}

App.defaultProps = {
  dogs: [
    {
      name: "Whiskey",
      age: 5,
      src: whiskey,
      facts: [
        "Whiskey loves eating popcorn.",
        "Whiskey is a terrible guard dog.",
        "Whiskey wants to cuddle with you!"
      ]
    },
    {
      name: "Duke",
      age: 3,
      src: duke,
      facts: [
        "Duke believes that ball is life.",
        "Duke likes snow.",
        "Duke enjoys pawing other dogs."
      ]
    },
    {
      name: "Perry",
      age: 4,
      src: perry,
      facts: [
        "Perry loves all humans.",
        "Perry demolishes all snacks.",
        "Perry hates the rain."
      ]
    }
  ]
}

export default App;
