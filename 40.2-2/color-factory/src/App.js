import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ColorFactory from './components/color-factory/color-factory.components';
import ColorPicker from './components/color-picker/color-picker.components';
import ColorPreview from './components/color-preview/color-preview.components';
import { useState } from 'react';

function App() {
  const [ colors, setColors ] = useState([]);

  const fetchData = (data) => {
    setColors([...colors, data]);
  }

  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route exact path='/colors' element={<ColorFactory colors={colors}/>}></Route>
        <Route exact path='/colors/new' element={<ColorPicker fetchData={fetchData} />}></Route>
        <Route exact path='/colors/:color' element={<ColorPreview colors={colors} />} />
        <Route path='*' element={<Navigate to={'/colors'} />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
