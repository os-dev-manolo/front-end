import styled from "styled-components";

interface BackgroundProps {
    show?: boolean;
}

export const Background = styled.div<BackgroundProps>`
    background-color: rgba(255, 255, 255, 1);

    position: absolute;
    z-index: 1000;

    display: ${(props) => (props.show ? "flex" : "none")};

    height: 100vh;
    width: 100vw;

    align-items: center;
    justify-content: center;

    flex-direction: column;
`;
