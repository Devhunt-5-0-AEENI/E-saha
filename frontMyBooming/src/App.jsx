import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Routes2 from './routes/Route2';
import Routes1 from './routes/route1';

function App() {
  return (
    <Router>
      <Routes>
        {Routes1()}
        {Routes2()}
      </Routes>
    </Router>
  );
}

export default App;