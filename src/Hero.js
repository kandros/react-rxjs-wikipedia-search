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
                        <NavItem isActive style={{fontSize: 18}}>
                            Home
                        </NavItem>
                        <NavItem style={{fontSize: 18}}>
                            Examples
                        </NavItem>
                        <NavItem style={{fontSize: 18}}>
                            Documentation
                        </NavItem>
                        <NavItem>
                            <Button states="isInverted" icon="fa fa-github">Github</Button>
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
                }}>Built with RxJs, React and re-bulma</Subtitle>
            </Container>
        </HeroBody>
    </BulmaHero>
)

// #00d1b2

export default Hero;