
import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(https://cdn.pixabay.com/photo/2015/06/01/09/04/blog-793047_1280.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px bottom 0px;
    background-size: contain;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;

const About = () => {

    return (
        <Box>
            <Banner/>
            <Wrapper>
                <Typography variant="h3">Sameer Khan</Typography>
                <Text variant="h5">I'm a Software Engineer based in India. 
                    I've built websites, desktop applications and corporate software.<br />
                    If you are interested, you can view some of my favorite projects here
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/Sameerkhan9412" color="inherit" target="_blank"><GitHub style={{color:"black",fontWeight:800}} /></Link>
                    </Box>
                </Text>
                <Text variant="h5">
                    Need something built or simply want to have chat? Reach out to me on
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://www.instagram.com/its_sameer_khan9412/" color="inherit" target="_blank">
                            <Instagram style={{color:"red",fontWeight:800}} />
                        </Link>
                    </Box>  
                        or send me an Email 
                        <Link href="mailto:sameerkhann9412@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                            <Email style={{color:"black",fontWeight:800}} />
                        </Link>.
                </Text>
            </Wrapper>
        </Box>
    )
}

export default About;