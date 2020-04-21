import React from 'react';
import styled from 'styled-components';
 
const InfoListBox = styled.div`
    display:flex;
    flex-flow: column;
    padding-bottom : 2%;
    background: ${props => props.color};
`;

const InfoList = styled.div`
    border-bottom : 1px solid black;
    display:flex;
    padding: 2% 0;
`;

const Img = styled.div `
    width: 50%;
    img{
        width: 20rem;
        margin: 0 auto;
        display:flex;
    }
`;

const Text = styled.div`
    width: 50%;
    h4 {
        font-size:1.2rem;
        padding-bottom: 1.5%;
    }

    p{
        font-size: 1rem;
        padding: 0.6%;
    }
`;


const List = ({match, data}) => {
    const {category} = match.params;
    const content = data.category[category];
    return(
        <InfoListBox color="#e9e1cc">
            {content.map((value ,i) => (
                <InfoList key={i}>
                    <Img>
                        <img src={value.img} alt={value.name}></img>
                    </Img>
                    <Text>
                         <h4>식당명 : {value.name}</h4>
                         <p>종류 : {value.kinds}</p>
                         <p>가격 : {value.price}</p>
                         <p>주소 : {value.address}</p>
                    </Text>
                </InfoList>
            ))}
       </InfoListBox>     
    )
   
}
 export default List;