import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ChoisirTheme from '../component/niveau2/ChoisirTheme';
import BallonGame from '../component/niveau1/BallonGame';
import LoginParent from '../component/niveau1/LoginParent';
import LoginEnfant from '../component/niveau1/LoginEnfant';
import Acceuil from '../component/niveau1/Acceuil.jsx';
import SingInParent from '../component/niveau1/SingIn.jsx';

export default function Routes1() {
  return (
    <>

        <Route
          path="/LoginEnfant"
          element={<LoginEnfant />}
        />
        <Route
          path="/LoginParent"
          element={<LoginParent />}
        />
        <Route
          path="/SingInParent"
          element={<SingInParent />}
        />
        <Route
          path="/GameBallon"
          element={<BallonGame />}
        />
        <Route
          path="/Acceuil"
          element={<Acceuil />}
        />
        
        
    </>
  );
}