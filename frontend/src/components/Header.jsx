import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logout } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import '../css/components/Header.css'


function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/');
  };



  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <Image src="/LeRecipe.png" alt="LeRecipe Logo" style={{width:'160px', height:'auto'}}/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link  as={Link} to="/">Home</Nav.Link>
            <Nav.Link  as={Link} to="/recipes">Recipes</Nav.Link>
            <Nav.Link  as={Link} to="/create">Create</Nav.Link>
            <Nav.Link as={Link} to="/about">About Us</Nav.Link>
            
            {userInfo ? (
              <NavDropdown title={
                <>
                  {userInfo.profile_picture && (
                    <Image
                      src={userInfo.profile_picture}
                      alt="profile"
                      roundedCircle
                      style={{ width: "30px", height: "30px", marginRight: "10px" }}
                    />
                  )}
                  {userInfo.username}
                </>
              } id="username-nav-dropdown">
                <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>       
                <Nav.Link as={Link} to="/login">Login</Nav.Link>              
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;