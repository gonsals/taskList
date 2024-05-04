import styled from "styled-components";

export const Test = styled.div`
    background-color: cadetblue;
    border-radius: 15px;
`;

export const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;

    form {
        margin-top: 30px;
        display: flex;
        gap: 10px;
    }
`;

export const Modal = styled.div`
    display: flex;
    position: absolute;
    width: 200px;
    height: 200px;
    flex-direction: column;
    top: 40vh;
`;
