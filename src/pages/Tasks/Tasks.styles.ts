import styled from "styled-components";

export const Test = styled.div`
    background-color: #646cff;
    border-radius: 15px;
    padding: 13px;
    max-height: 200px;
    max-width: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    p {
        max-width: 330px;
        max-height: 150px;
        word-break: break-all;
        overflow-y: scroll;
    }

    ::-webkit-scrollbar {
        width: 20px;
    }

    ::-webkit-scrollbar-track {
        background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #d6dee1;
        border-radius: 20px;
        border: 6px solid transparent;
        background-clip: content-box;
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: #a8bbbf;
    }

    .actionButtons {
        display: flex;
        justify-content: space-evenly;
        gap: 12px;
    }
`;

export const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;

    form {
        margin: 30px 0;
        display: flex;
        gap: 10px;
    }

    .pure-modal .panel-title {
        padding: 12px 15px 12px 15px;
    }

    .pure-modal .panel-heading {
        background: #646cff;
    }

    .pure-modal .panel-body {
        background: #242424;
    }

    .pure-modal .panel-footer {
        padding: 12px 15px 12px 15px;
        background: #242424;
    }
`;

export const TaskContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    gap: 22px;

    textarea {
        min-width: 250px;
        min-height: 100px;
    }
`;
