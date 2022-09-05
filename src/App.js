import FeedScreen from './screens/FeedScreen'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FeedScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
