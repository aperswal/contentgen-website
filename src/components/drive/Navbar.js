import React from 'react';
import { Navbar, Nav, Container, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Search from './Search'; // Import the Search component

export default function NavbarComponent({ onSearch }) {
  return (
    <Navbar bg='light' expand='sm'>
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="mr-3">
          Bloom
        </Navbar.Brand>
        <div className="d-flex align-items-center" style={{ marginLeft: '1rem' }}>
          <InputGroup>
            <InputGroup.Text style={{ backgroundColor: 'lightgray', border: 'none', borderTopLeftRadius: '15px', borderBottomLeftRadius: '15px' }}>
              <FontAwesomeIcon icon={faSearch} style={{ color: 'gray' }} />
            </InputGroup.Text>
            {/* Use the Search component here */}
            <Search onSearch={onSearch} />
          </InputGroup>
        </div>
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/user">
            Profile
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
