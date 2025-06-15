import styled from "styled-components";

export const MessageError = styled.p`
    font-size: 13px;
    color: red;

    margin-bottom: 5px;
`;

export const LabelContainer = styled.div`
    position: absolute;
    margin-left: 5px;
    margin-bottom: 45px;
    background-color: white;
    height: 15px;
    font-size: 15px;
    color: #234e52;
`;

export const LabelContainerTextArea = styled.div`
    position: absolute;
    margin-left: 5px;
    margin-bottom: 138px;
    background-color: white;
    height: 15px;
    font-size: 15px;
    color: #234e52;
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
        border: 1px solid purple;
        border-radius: 6px;
        color: #333;
        padding-left: 6.5px;
        outline: none;

        &::placeholder {
            color: #666;
            font-size: 15px;
        }

        &:focus-within {
            box-shadow: 0 0 3px 0px orangered;
            border-color: white;
            outline: none;
        }
    }

    svg {
        color: purple;
        margin-right: 16px;
    }
`;
export const ContainerTextArea = styled.div`
    border-radius: 1.5px;
    padding: 8px;
    color: #333;
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;

    textarea {
        flex: 1;
        height: 100%;
        min-height: 100%;
        background: transparent;
        border: 1px solid purple;
        border-radius: 6px;
        color: #333;
        padding-top: 6.5px;
        padding-left: 6.5px;
        outline: none;

        &::placeholder {
            color: #666;
            font-size: 15px;
        }

        &:focus-within {
            box-shadow: 0 0 3px 0px orangered;
            border-color: white;
            outline: none;
        }
    }
`;
