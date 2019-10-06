import React from 'react'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Players from './components/Players'
import Events from './components/Events'
import Registrations from './components/Registrations'
import Costs from './components/Costs'

const App = () => {

  const padding = { padding: 5 }

  return (
    <div>
      <Router>
        <div>
          <h2 id="resp-header-text">Floorball - Player and Event manager</h2>
          <div id="resp-links">
            <Link style={padding} to="/">Players</Link>
            <Link style={padding} to="/events">Events</Link>
            <Link style={padding} to="/registrations">Registrations</Link>
            <Link style={padding} to="/costs">Costs</Link>
          </div>
          <Route exact path="/" render={() => <Players />} />
          <Route path="/events" render={() => <Events />} />
          <Route path="/registrations" render={() => <Registrations />} />
          <Route path="/costs" render={() => <Costs />} />
        </div>
      </Router>
    </div>
  )
}

export default App