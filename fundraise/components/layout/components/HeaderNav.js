import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';

const HeaderNav = () => {
  const Router = useRouter();

  return (
    <HeaderNavWrapper>
      <Link passHref href={'/'}><HeaderNavLinks active={Router.pathname == "/" ? true : false} >
        Campaigns
      </HeaderNavLinks></Link>
      <Link passHref href={'/createcampaign'}><HeaderNavLinks active={Router.pathname == "/createcampaign" ? true : false} >
        Create Campaign
      </HeaderNavLinks></Link>
      <Link passHref href={'/dashboard'}><HeaderNavLinks active={Router.pathname == "/dashboard" ? true : false} >
        Dashboard
      </HeaderNavLinks></Link>
    </HeaderNavWrapper>
  )
}

const HeaderNavWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content:center;
  
  /* padding: 6px; */
  height: 70px;
  border-radius: 10px;
  width:50%;
  /* border: 2px solid red; */
  `

const HeaderNavLinks = styled.div`
  display: flex;
  justify-content:center; 
  align-items: center;
 
  width: 10vw;
  height:4vw;
  // height: 100%;
  font-family: 'Roboto';
  /* margin: 2vw;
  padding:0 2vw; */
  
  /* border-radius: 10px; */

  /* border: 5px solid red; */

  
  
  cursor: pointer;
  text-transform: uppercase;
  /* font-weight: bold; */
  font-size:1vw;
  
  color:white;

  border-radius:15px;

  

  &:hover {
    background: white;
    color: purple;
    transition: all 0.3s ease-in-out;

    

    
  }
`

export default HeaderNav