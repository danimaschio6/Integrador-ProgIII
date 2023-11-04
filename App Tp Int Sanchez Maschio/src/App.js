// mis componentes
import { Contacto } from './componentes/Contacto/Contacto';
import { Institucional } from './componentes/Institucional/Institucional';
import { Inicio} from './componentes/Inicio/Inicio';
import { Crud} from './componentes/Crud/Crud';
import { Convocatoria} from './componentes/Convocatoria/Convocatoria';
import { Convocar} from './componentes/Convocatoria/Convocar';
import { Convocados} from './componentes/Convocatoria/Convocados';
import { Login } from './componentes/Login/Login';
import { Equipo } from './componentes/Convocatoria/Equipo';
import { Dashboard } from './componentes/Dashboard/Dashboard';    

// router
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { UserProvider } from './componentes/UserContext/UserContext';
import { ProtectedRoute } from './componentes/ProtectedRoute/ProtectedRoute';

//mis compnentes
import { Header } from './componentes/Header/Header';
import { Footer } from './componentes/Footer/Footer';


function App() {
  return (
    <>
    <BrowserRouter>
      <UserProvider> 
        <Header/>      
        <Routes>
          <Route path='/' element={<Inicio/>}/>
          <Route path='/institucional' element={<Institucional/>}/>
          <Route path='/contacto' element={<Contacto/>}/>
          <Route path='/login' element={<Login/>}/>
          
          <Route path='/privado/dashboard' 
            element={
              <ProtectedRoute mustBeEntrenador={false}>
                {<Dashboard/>}
              </ProtectedRoute>
          }/>
  
          <Route path='/privado/crud' 
            element={
              <ProtectedRoute mustBeEntrenador={true}>
                {<Crud/>}
              </ProtectedRoute>
          }/>
          
          <Route path='/privado/convocatoria' 
            element={
              <ProtectedRoute mustBeEntrenador={true}>
                <Convocatoria/>
              </ProtectedRoute>
          }/>

          <Route path='/privado/convocar/:parametro' 
            element={
              <ProtectedRoute mustBeEntrenador={true}>
                <Convocar/>
              </ProtectedRoute>
          }/>

          <Route path='/privado/equipo/:idConvocatoria/:rival'
            element={
              <ProtectedRoute mustBeEntrenador={true}>
                <Equipo/>
              </ProtectedRoute>
          }/>

          <Route path='/privado/convocados/:idConvocatoria/:rival' 
            element={
              <ProtectedRoute mustBeEntrenador={true}>
                <Convocados/>
              </ProtectedRoute>
          }/>
        </Routes>

        
      </UserProvider>
      <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;

