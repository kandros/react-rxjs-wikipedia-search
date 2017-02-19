import React from 'react'
import {
    Hero as BulmaHero,
    HeroHead,
    Container,
    NavGroup,
    Nav,
    NavItem,
    NavToggle,
    HeroBody,
    Button,
    Title,
    Subtitle
} from 're-bulma';

const Hero = () => (
    <BulmaHero size="isMedium">
        <HeroHead>
            <Nav>
                <Container>
                    <NavGroup align="left">
                        <NavItem>
                            {/*<img src="logo.png" alt="Logo"/>*/}
                        </NavItem>
                    </NavGroup>
                    <NavToggle />
                    <NavGroup align="right" isMenu>
                        <NavItem>
                            <a href="https://github.com/kandros/react-rxjs-wikipedia-search"
                               target="_blank" style={{textDecoration: 'none'}}>
                                <Button states="isInverted" icon="fa fa-github">Github</Button>
                            </a>
                        </NavItem>
                    </NavGroup>
                </Container>
            </Nav>
        </HeroHead>
        <HeroBody style={{padding: '100px 0 40px'}}>
            <Container hasTextCentered>
                <Title style={{fontSize: 80}}>Wikipedia Search</Title>
                <Subtitle style={{
                    fontSize: 26
                }}>
                    Built with
                    <span style={{color: '#f0008f'}}> RxJs</span>
                    ,
                    <span style={{color: '#61dafb'}}> React </span>
                    and
                    <span style={{color: '#00d1b2'}}> re-bulma </span>
                </Subtitle>
            </Container>
        </HeroBody>
    </BulmaHero>
)

// #00d1b2

export default Hero;