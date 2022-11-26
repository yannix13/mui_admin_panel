import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom"
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Contacts from "./scenes/contacts";
import Invoices from "./scenes/invoices";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import Calendar from "./scenes/calendar";

import Layout from './scenes/global/Layout';
import Missing from "./components/Missing";
import PersistLogin from './components/PersistLogin';
import RequireAuth from './components/RequireAuth';
import Unauthorized from './components/Unauthorized';
import LoginApi from './api/LoginApi';

import Accueil from './components/Accueil';
import ExtLayout from './components/ExtLayout';

const ROLES = {
  "User": "2001",
  "Editor": "1984",
  "Admin": "5150"
}

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
          <Routes>
            <Route path='/' element={<ExtLayout/>}>   
                {/* Public Routes */}
                <Route path='/login' element={<LoginApi/>}/>

                  {/* We want to protect these routes */}
                  <Route path='/' element={<Layout/>}>
                    <Route path='/' element={<PersistLogin/>}>
                        <Route path='/' element={<RequireAuth allowedRoles={[ROLES.User]}/>}>
                          <Route path='/' element={<Dashboard/>} />
                          <Route path='/team' element={<Team/>} />
                          <Route path='/contacts' element={<Contacts/>} />
                          <Route path='/invoices' element={<Invoices/>} />
                          <Route path='/form' element={<Form/>} />
                          <Route path='/bar' element={<Bar/>} />
                          <Route path='/pie' element={<Pie/>} />
                          <Route path='/line' element={<Line/>} />
                          <Route path='/faq' element={<FAQ/>} />
                          <Route path='/geography' element={<Geography/>} />
                          <Route path='/calendar' element={<Calendar/>} /> 
                          <Route path='/unauthorized' element={<Unauthorized/>}/>
                        </Route>
                    </Route>
                  </Route>

                  {/* Catch all */}
                  <Route path='*' element={<Missing />}/>

            </Route>
          </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

// Ici on a le context "ColorModeContext" qui permet seulement de toggle 
// le mode (on passe par la fonction colorMode du customHook useMode)

// ThemeProvider agit comme un context, mais est fourni par la librairie material UI
// Il va changer en fonction de la valeur theme qu'on lui passe (qui provient aussi du customHook useMode)
