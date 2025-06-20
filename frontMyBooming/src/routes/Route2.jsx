import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ChoisirTheme from '../component/niveau2/ChoisirTheme';



export default function Routes2() {
  return (
    <>
      <Route
          path="/choisir"
          element={<ChoisirTheme />}
        />
    </>
  );
}