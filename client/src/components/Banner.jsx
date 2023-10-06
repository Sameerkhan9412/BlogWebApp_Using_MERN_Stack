import { Box,Typography,styled } from "@mui/material"
const Image=styled(Box)`
    background:url(https://media.istockphoto.com/id/1440246683/photo/blog-word-on-wooden-cube-blocks-on-gray-background.webp?b=1&s=612x612&w=0&k=20&c=tdeCAw834ymaCHPgQN57CqB9Lax9Qcpuheofn-WwVB4=);
    width:100%;
    height:50vh;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    background-repeat:no-repeat;
    background-size:cover;
    background-position:center;
    
`;
const Heading=styled(Typography)`
    font-size:70px;
    line-height:1;
`;
const SubHeading=styled(Typography)`
    font-size:30px;
    background:#ffffff;
`;
 const Banner=()=>{
    return (
        <Image>
            <Heading>BLOG</Heading>
            <SubHeading>Sam Blog</SubHeading>
        </Image>
    )
}
export default Banner;