import React from 'react'
import Nav from './component/nav/nav'
import {Switch, BrowserRouter, Route} from 'react-router-dom'
import Home from './screens/Home/home';
import Authentication from './screens/Authentication/authentication';
import userHome from './screens/UserHome/userHome';
import Book from './screens/Book/book'
import Invoice from './screens/Invoice/Invoice'
import Logout from './screens/Logout/logout'
import EditProfile from './screens/EditProfile/editProfile'
import InvoiceLists from './screens/UserInvoice/UserInvoice'
import {useDispatch} from 'react-redux'
import* as actions from './store/actions/index'
function App() {
  const dispatch = useDispatch()
  dispatch(actions.getUserDataFromToken())
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
        <Route path='/invoice/:id' component={Invoice}/>
          <Route path='/invoice' component={Invoice} />
        <Route path='/logout' component={Logout}/>
        <Route path='/edit' component={EditProfile} />
        <Route path='/invoices' component={InvoiceLists} />
      </Switch>
     </BrowserRouter>
   </>
  );
}

export default App;
