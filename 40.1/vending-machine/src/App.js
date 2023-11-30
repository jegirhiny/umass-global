import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Machine from './components/machine/machine.component';
import Snack from './components/snack/snack.component';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Machine />} />
          <Route path='/popcorn' element={<Snack url={'https://cdn.britannica.com/61/118661-050-6CAD9A11/Popcorn.jpg'} />} />
          <Route path='/chips' element={<Snack url={'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Potato-Chips.jpg/1200px-Potato-Chips.jpg'} />} />
          <Route path='/cheetos' element={<Snack url={'https://media.npr.org/assets/img/2015/03/27/cheetos-crazy-4178_custom-ae405bd5e6bdc8ff1839314122c2e322c7cc223f-s1100-c50.jpg'} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
