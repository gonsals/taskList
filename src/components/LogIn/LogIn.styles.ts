import styled from "styled-components";

export const TestHome = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    h3 {
        color: black;
    }

    input {
        padding: 8px;
        box-sizing: border-box;
        border: none;
        border-bottom: 2px solid #646cffaa;
        background-color: transparent;
        color: black;
        min-width: 200px;
    }

    input:focus {
        background-color: rgba(100, 108, 255, 0.305);
    }

    #changeButton {
        cursor: pointer;
        margin-top: 10px;
    }
`;

interface FormProps {
    position: number;
}

export const Form = styled.form<FormProps>`
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    padding: 25px;
    border-radius: 12%;
    min-width: 220px;
    min-height: ${(props) => props.position && "313.7px"};

    button {
        margin-top: 8px;
    }
`;
