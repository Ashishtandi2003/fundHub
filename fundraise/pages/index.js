import styled from "styled-components";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PaidIcon from "@mui/icons-material/Paid";
import EventIcon from "@mui/icons-material/Event";
import Image from "next/image";
import { ethers } from "ethers";
import { useState, useEffect } from "react";
import Link from "next/link";
import CampaignFactory from "../artifacts/contracts/Campaign.sol/CampaignFactory.json";

export default function Index({
  AllData,
  HealthData,
  EducationData,
  AnimalData,
}) {
  const [filter, setFilter] = useState(AllData);
  const [isClient, setIsClient] = useState(false); // Added state for client-side check

  // Ensure that client-side rendering is detected
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <HomeWrapper>
      {/* Filter Section */}
      <FilterWrapper>
        <FilterAltIcon style={{ fontSize: 40 }} />
        <Category onClick={() => setFilter(AllData)}>All</Category>
        <Category onClick={() => setFilter(HealthData)}>Health</Category>
        <Category onClick={() => setFilter(EducationData)}>Education</Category>
        <Category onClick={() => setFilter(AnimalData)}>Animal</Category>
      </FilterWrapper>

      {/* Cards Container */}
      <CardsWrapper>
        {/* Card */}
        {filter.map((e) => (
          <Card key={e.title}>
            <CardImg>
              <Image
                alt="Crowdfunding dapp"
                layout="fill"
                src={"https://gateway.pinata.cloud/ipfs/" + e.image}
              />
            </CardImg>
            <Title>{e.title}</Title>
            <CardData>
              <Text>
                Owner
                <AccountBoxIcon />
              </Text>
              <Text>
                {e.owner.slice(0, 6)}...{e.owner.slice(39)}
              </Text>
            </CardData>
            <CardData>
              <Text>
                Amount
                <PaidIcon />
              </Text>
              <Text>{e.amount} Matic</Text>
            </CardData>
            <CardData>
              <Text>
                <EventIcon />
              </Text>
              {/* Conditional rendering for the timestamp */}
              {isClient && (
                <Text>{new Date(e.timeStamp * 1000).toLocaleString()}</Text>
              )}
            </CardData>
            <Link passHref href={"/" + e.address}>
              <Button>Go to Campaign</Button>
            </Link>
          </Card>
        ))}
      </CardsWrapper>
    </HomeWrapper>
  );
}

export async function getStaticProps() {
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_RPC_URL
  );

  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_ADDRESS,
    CampaignFactory.abi,
    provider
  );

  const getAllCampaigns = contract.filters.campaignCreated();
  const AllCampaigns = await contract.queryFilter(getAllCampaigns);
  const AllData = AllCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress,
    };
  });

  const getHealthCampaigns = contract.filters.campaignCreated(
    null,
    null,
    null,
    null,
    null,
    null,
    "Health"
  );
  const HealthCampaigns = await contract.queryFilter(getHealthCampaigns);
  const HealthData = HealthCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress,
    };
  });

  const getEducationCampaigns = contract.filters.campaignCreated(
    null,
    null,
    null,
    null,
    null,
    null,
    "education"
  );
  const EducationCampaigns = await contract.queryFilter(getEducationCampaigns);
  const EducationData = EducationCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress,
    };
  });

  const getAnimalCampaigns = contract.filters.campaignCreated(
    null,
    null,
    null,
    null,
    null,
    null,
    "Animal"
  );
  const AnimalCampaigns = await contract.queryFilter(getAnimalCampaigns);
  const AnimalData = AnimalCampaigns.map((e) => {
    return {
      title: e.args.title,
      image: e.args.imgURI,
      owner: e.args.owner,
      timeStamp: parseInt(e.args.timestamp),
      amount: ethers.utils.formatEther(e.args.requiredAmount),
      address: e.args.campaignAddress,
    };
  });

  return {
    props: {
      AllData,
      HealthData,
      EducationData,
      AnimalData,
    },
    revalidate: 10,
  };
}

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  /* align-items: center; */
  width: 100%;

  align-items: center;
  

`;

const FilterWrapper = styled.div`
  display: flex;
  
  align-items: center;
  width: 94.5%;
  height: 70px;
  
  background:#FAFAFA;                   //All Health Education Animal vala box
  border-radius:15px;
  margin:0 2vw;
  padding: .6vw;
  /* margin-right:vw; */
  color:white;                       

  font-weight: 800;
  box-shadow: 0 2px 8px rgba(0, 0,0 , 0.15);

  
  
  
  color:#6B7280;

  

  /* border:4px solid black; */
`;

const Category = styled.div`
  padding: 6px 15px;
  /* background-color: ${(props) => props.theme.bgDiv}; */
  margin: 0px 15px;
  border-radius: 8px;
  font-family: "Poppins";
  font-weight: normal;
  cursor: pointer;

  color:#4B5563;

  background-color: #FAFAFA;
  border: 1px solid #6B7280 ;



  transition: all 0.3s ease-in-out;

&:hover{
  background:rgb(231, 226, 250); 
border-color: #8b5cf6; 
}
  `;

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  
  width: 80%;

  margin-top: 2vw;

  /* border: 5px solid black; */

  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  border-radius:15px;

  


`;

const Card = styled.div`
  width: 20%;
  margin-top: 20px;
  border-radius: 15px;
  background-color: ${(props) => props.theme.bgDiv};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 45%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const CardImg = styled.div`
  position: relative;
  height: 160px;
  width: 100%;
  background-color: #f0f0f0;
  overflow: hidden;

  img {
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    height: 140px;
  }

  @media (max-width: 480px) {
    height: 120px;
  }
`;

const Title = styled.h2`
  font-family: "Poppins";
  font-size: 18px;
  margin: 2px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 5px;
  cursor: pointer;
  font-weight: normal;
`;

const CardData = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 2px 0px;
  background-color: ${(props) => props.theme.bgSubDiv};
  padding: 5px;
  cursor: pointer;
`;

const Text = styled.p`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  font-family: "Roboto";
  font-size: 18px;
  font-weight: bold;
`;

const Button = styled.button`
  padding: 8px;
  text-align: center;
  width: 100%;
  background-color: #00b712;
  background-image: linear-gradient(180deg, #00b712 0%, #5aff15 80%);
  border: none;
  cursor: pointer;
  font-family: "Roboto";
  text-transform: uppercase;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
`;
