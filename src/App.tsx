import Home from './components/Home';

import SignDetails from './components/SignDetails';
import FriendList from './components/FriendList';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Edit from './components/Edit';

function App() {

  return (

    <Router>

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/horoscopes/:id" element={<SignDetails />} />
        <Route path="/friends" element={<FriendList  />} />
        <Route path="/friends/:id" element={<FriendList  />} />
        <Route path="/register" element={<Register  />} />
        <Route path="/edit/:id" element={<Edit  />} />

      </Routes>

    </Router>

  )

}

export default App