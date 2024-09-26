import HomeScreen from './screens/HomeScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import RecipeDetailedScreen from './screens/RecipeDetailedScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';







function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<HomeScreen />} exact />
          <Route path='/login' element={<LoginScreen />}  />
          <Route path='/register' element={<RegisterScreen />}  />
          <Route path='/recipe/:id' element={<RecipeDetailedScreen />}  />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/profile" element={<PrivateRoute><ProfileScreen /></PrivateRoute>} />
        </Routes>
        
      </Router>
      
    </div>
  );
}

export default App;
