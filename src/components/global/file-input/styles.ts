import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const InputBlock = styled.div`
    display: flex;
    flex-direction: row;

    input[type="file"] {
        display: none;
    }
    label {
        max-width: 185px;
        min-width: 175px;
        min-height: 45px;
        max-height: 50px;
        border: 1px solid #1a8080;
        color: #1a8080;
        background: #fff;
        margin-right: 15px;
        transition: all 0.5s ease-in-out;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
            background: #1a8080;
            color: #fff;
            cursor: pointer;
        }
    }
`;
