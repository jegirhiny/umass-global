import './App.css';
import { Route, Navigate, BrowserRouter, Routes } from "react-router-dom";
import Form from './components/madlibs-form/form.component';
import Story from './components/madlibs-story/story.component';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Form />} />
        <Route exact path="/story" element={<Story />} />
        <Route path='*' element={<Navigate to={"/"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
