import styled from "styled-components";

// interface LayerButtonProps {
//   buttonPosition: {
//     x: string | number;
//     y: string | number;
//   };
// }
// export const ButtonBar = styled.div<LayerButtonProps>`
//   position: absolute;
//   z-index: 1;
//   display: grid;
//   justify-items: center;
//   border-radius: 10%;
//   background-color: teal;
//   left: ${(props) => props.buttonPosition.x};
//   bottom: ${(props) => props.buttonPosition.y};
//   animation: left 3s linear 1s;
// `;

export const AuthBar = styled.div`
    position: fixed;
    z-index: 1;
    display: grid;
    justify-items: center;
    border-radius: 10%;
    background-color: teal;
    right: 3vw;
    bottom: 40vw;
    animation: left 3s linear 1s;
`;
export const LayerButton = styled.div`
    border-radius: 10%;
    background-color: teal;
    margin-top: 5px;
    margin-bottom: 5px;
    animation: left 3s linear 1s;
`;

export const TooltipText = styled.div`
    color: #fff;
    text-align: center;
    line-height: 44px;
    border-radius: 3px;
    cursor: pointer;
`;
export const TooltipBox = styled.div`
    z-index: 1;
    position: absolute;
    top: calc(100% + 10px);
    visibility: hidden;
    color: transparent;
    background-color: transparent;
    padding: 5px 5px;
    border-radius: 4px;
    transition: visibility 0.5s, color 0.5s, background-color 0.5s, width 0.5s,
        padding 0.5s ease-in-out;
    &:before {
        content: "";
        width: 0;
        height: 0;
        left: 20px;
        top: -10px;
        position: absolute;
        border: 10px solid transparent;
        transform: rotate(135deg);
        transition: border 0.3s ease-in-out;
    }
`;
export const TooltipCard = styled.div`
    position: relative;
    & ${TooltipText}:hover + ${TooltipBox} {
        visibility: visible;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.7);
        &:before {
            border-color: transparent transparent rgba(0, 0, 0, 0.8)
                rgba(0, 0, 0, 0.8);
        }
    }
`;
