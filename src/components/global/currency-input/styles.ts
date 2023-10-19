import styled from "styled-components";

export const LabelContainer = styled.div`
    position: absolute;
    margin-left: 41px;
    margin-bottom: 45px;
    background-color: white;
    height: 15px;
    font-size: 15px;
    color: #234e52;
`;

export const MessageError = styled.p`
    font-size: 13px;
    color: red;

    margin-bottom: 5px;
`;

export const Container = styled.div`
    border-radius: 1.5px;
    padding: 8px;
    color: #333;
    width: 100%;
    height: 52px;
    display: flex;
    align-items: center;

    input {
        flex: 1;
        height: 100%;
        min-height: 40px;
        background: transparent;
        border: 1px solid #234e52;
        border-radius: 6px;
        color: #333;
        padding-left: 6.5px;
        outline: none;

        &::placeholder {
            color: #666;
            font-size: 15px;
        }

        &:focus-within {
            box-shadow: 0 0 3px 0px #126b67;
            border-color: white;
            outline: none;
        }
    }

    svg {
        color: #234e52;
        margin-right: 16px;
    }
`;
