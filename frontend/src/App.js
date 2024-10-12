import HomeScreen from './screens/HomeScreen';
import Header from './components/Header';
import Footer from './components/Footer';
import {BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import RecipeDetailedScreen from './screens/RecipeDetailedScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import RecipeScreen from './screens/RecipeScreen';
import CreateRecipeScreen from './screens/CreateRecipeScreen';
import AboutUs from './screens/AboutUs'; 
import UserScreen from './screens/UserScreen';
import UpdateRecipeScreen from './screens/UpdateRecipeScreen';
import Forum from './screens/Forum';
import ForumDetailed from './screens/ForumDetailed';



function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<HomeScreen />} exact />
          <Route path='/login' element={<LoginScreen />} />
          <Route path='/register' element={<RegisterScreen />} />
          <Route path='/recipes' element={<RecipeScreen />} />
          <Route path='/recipe/:id' element={<RecipeDetailedScreen />} />
          <Route path='/about' element={<AboutUs />} /> 
          <Route path='/user/:id' element={<UserScreen />} /> 
          <Route path='/forum' element={<Forum />} /> 
          <Route path='/forum/:id' element={<ForumDetailed />} /> 
          <Route path="/profile" element={<PrivateRoute><ProfileScreen /></PrivateRoute>} />
          <Route path="/update/:id" element={<PrivateRoute><UpdateRecipeScreen /></PrivateRoute>} />
          <Route path="/create" element={<PrivateRoute><CreateRecipeScreen /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
