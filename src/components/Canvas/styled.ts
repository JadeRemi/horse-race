import styled, { css } from 'styled-components';
import { DEFAULTS } from '../../config/defaults';


export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-conten: center;
    background: rgb(143,143,143);
    background: linear-gradient(90deg, rgba(143,143,143,1) 0%, rgba(74,74,74,1) 50%, rgba(23,23,23,1) 100%);
    margin: 0;
    height: 100vh;
    width: 100vw; 
`;

export const Canvas = styled.canvas`
    &.phantom {
        background-color: #000;
        display: none;
    }
`;

export const Button = styled.button`
    width: 200px;
    height: 32px;
    margin: 16px auto 8px auto;
    background-color: black;
    border: none;
`;

export const ButtonText = styled.span`
    font-family: 'Ocra';
    font-size: 16px;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    color: white;
    text-shadow: 0px 0px 2px black;

`;

export const Debug = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    right: -320px;
    width: ${DEFAULTS.width / 2}px;
    height: ${DEFAULTS.height}px;
    background-color: ${DEFAULTS.debugBGColor};
`;

export const Container = styled.div`
    position: relative;
    margin: auto;
`;

export const Bar = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
`;

export const Text = styled.span`
    font-family: 'Ocra';
    font-size: 16px;
    display: block;
    width: calc(100% - 16px);
    overflow: hidden;
    white-space: nowrap;
    color: white;
    text-shadow: 0px 0px 2px black;
    :nth-child(odd) {
        text-align: right;
    }
    :nth-child(even) {
        text-align: left;
    }
`;

export const Row = styled.span`
    display: flex;
    flex-direction: row;
    gap: 16px;

    width: 100%;
    }
`;