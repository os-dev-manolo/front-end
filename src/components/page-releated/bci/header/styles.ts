import styled, { createGlobalStyle } from "styled-components";

export const Container = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const CityInfo = styled.div`
    display: flex;
    padding-top: 50px;
    flex-direction: column;
`;

export const LeftHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const PropertyFirstInfo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 10px;
`;

export const GlobalStyle = createGlobalStyle`
@media print {
    @page {
        margin: 1.40cm;
        padding-left: 10px;
    }
    .container {
        margin-left: auto;
        margin-right: auto;
        min-width: 350px;
        max-width: 1000px
    }
    
    h3 {
        font-size: 12pt;
        font-weight: bold;
    }
}`;
