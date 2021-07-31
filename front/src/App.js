import React from 'react'
import Nav from './component/nav/nav'
import {Switch, BrowserRouter, Route} from 'react-router-dom'
import Home from './screens/Home/home';
import Authentication from './screens/Authentication/authentication';
import userHome from './screens/UserHome/userHome';
import Book from './screens/Book/book'
import Invoice from './screens/Invoice/Invoice'
import Logout from './screens/Logout/logout'
function App() {
  return (
   <>
     <Nav/>
     <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route path='/search' component={Home} />
        <Route path='/auth' component={Authentication} />
        <Route path='/userHome' component={userHome} />
        <Route path='/book/:vehicle_id' component={Book}/>
        <Route path='/invoice' component={Invoice}/>
        <Route path='/logout' component={Logout}/>
      </Switch>
     </BrowserRouter>
   </>
  );
}

export default App;
