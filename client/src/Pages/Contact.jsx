import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(https://cdn.pixabay.com/photo/2017/12/02/14/38/contact-us-2993000_1280.jpg);
    width: 100%;
    height: 50vh;
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


const Contact = () => {
    return (
        <Box>
            <Banner />
            <Wrapper >
                <Typography variant="h3">Getting in touch is easy!</Typography>    
                <Text variant="h5" style={{display:'flex', alignItems:'center' }}>
                    Reach out to me on
                    <Link href="" color="inherit" target="_blank">
                        <Instagram/>
                    </Link>
                    or send me an Email 
                    <Link href="mailto:sameerkhann9412@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                        <Email />
                    </Link>.
                </Text>
            </Wrapper>
        </Box>
    );
}

export default Contact;