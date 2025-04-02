import styled from 'styled-components';
import HeaderLogo from './components/HeaderLogo'
import HeaderNav from './components/HeaderNav'
import HeaderRight from './components/HeaderRight'

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderLogo />
      <HeaderNav />
      <HeaderRight />
    </HeaderWrapper>
  )
};

const HeaderWrapper = styled.div`
  width: 94.5%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background:#6B46C1;
  border-radius:15px;
  margin:2vw;
  padding: .6vw;
  /* margin-right:vw; */
  color:white;                       //connect wallet

  font-weight: 800;
  a{
    text-decoration: none;
  }


  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);


`

export default Header