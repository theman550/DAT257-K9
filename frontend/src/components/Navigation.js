import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const Nav = styled.nav`
  display: flex;
  font-family: Kufam;
  color: white;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(90deg, rgba(128,100,247,1) 0%, rgba(245,186,156,1) 100%);
  width: 100%;
`

const H3 = styled.h3`
  margin-left: 2rem;
`

const Ul = styled.ul`
  display: flex;
  list-style-type: none;
`

const Li = styled.li`
  margin-right: 2rem;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  
  &:hover {
    text-decoration: underline;
  }
`

const Navigation = () => {
  return (
    <Nav>
      <H3>
        <StyledLink to='/'>
          Share-a-ride
        </StyledLink>
      </H3>
      <Ul>
        <Li>
          <StyledLink to='/search'>
            Search
          </StyledLink>
        </Li>
        <Li>
          <StyledLink to='/add'>
            Add trip
          </StyledLink>
        </Li>
      </Ul>
    </Nav>
  )
}

export default Navigation